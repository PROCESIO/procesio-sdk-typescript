import {
  AuthResponse,
  FileDefaultValue,
  FileName,
  FileWrapper,
  FlowInstance,
  GUID,
} from "./types";
import { request, RequestMethods } from "./utils/request";

export class ProcesioSDK {
  private token?: string;

  /**
   * @description
   * Authenticates the library with the provided credentials provided in the constructor
   *
   * @remarks
   * You should await for the response of this method before proceeding with other
   * methods from this library, as them are dependent on the response provided by
   * the authentication.
   *
   * @usageNotes
   *
   *  ### Authenticate and log the obtained token
   *
   *  ```typescript
   * const sdkInstance = new ProcesioSDK();
   *
   * const token = await sdkInstance.authorize('username', 'password');
   *
   * console.log(JSON.stringify(token)); // {"access_token":"<hashed_token>", "expires_in":2592000, "refresh_expires_in":2592000, "refresh_token":"<hashed_token>", "token_type":"bearer", "session_state":"5beb683c-3ed7-4f7a-be79-c2d3eb5f4e43", "scope":"email profile", "error":null, "error_description":null}
   *
   * ```
   * @returns A Promise which returns an object containing all the necessary informations for
   * authentication, like token or refresh token.
   */
  async authorize(username: string, password: string) {
    const credentials = {
      username,
      password,
      realm: "procesio01",
      client_id: "procesio-ui",
    };

    const form: string[] = [];

    for (const property in credentials) {
      const encodedKey = encodeURIComponent(property);
      const encodedValue = encodeURIComponent(credentials[property]);
      form.push(encodedKey + "=" + encodedValue);
    }

    const formJoin = form.join("&");

    const headers = new Headers();

    headers.set("Content-type", "application/x-www-form-urlencoded");

    const resp = await fetch(
      "https://api.procesio.app:4532/api/authentication",
      {
        method: "POST",
        body: formJoin,
        headers,
      }
    );

    const authResponse: AuthResponse = await resp.json();

    this.token = authResponse.access_token;

    return authResponse;
  }

  /**
   * @description
   * Calls an endpoint through which you can publish a process with the required
   * inputs in order to run that process.
   *
   * @remarks
   * Running a process from the PROCESIO platform is done in 3 different steps.
   * `PUBLISH` (generates an instance of a process), `uploadFile` (required ony for instances
   * that have file inputs) and `launch` (executes the previously generated instance)
   *
   * @usageNotes
   *
   *  ### Publish a process which sends an email and log the instance id.
   *
   *  ```typescript
   * const sdkInstance = new ProcesioSDK();
   *
   * await sdkInstance.authorize('username', 'password');
   *
   * const publishReq = await sdkInstance.publish('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx', {to: "someemail@domain.com", subject: "Process launched via SDK"})
   *
   * console.log(publishReq.content.flows.id); // "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx"
   *
   * ```
   * @param processId - The id of the process. Can be obtained from the PROCESIO platform.
   *
   * @param payload
   * Object which contains all the inputs needed to run a process from the PROCESIO platform.
   * The key of map is the variable name set in the process from the PROCESIO platform.
   * The value of the map is the value of said variable. If a variable is of type file, it's
   * value should be an object with the key name and the value the name of the file
   *
   * @param workspace - The workspace associated with the process. Optional.
   *
   * @returns A Promise which returns the instance of the process.
   */
  publish(
    processId: GUID,
    payload: Record<string, unknown | FileName | FileName[]>,
    workspace?: string
  ) {
    if (!this.token) {
      throw Error("Authorization information missing.");
    }

    return request<Record<"flows", FlowInstance>>({
      url: `Projects/${processId}/instances/publish`,
      bearerToken: this.token,
      workspace,
      body: payload,
      method: RequestMethods.POST,
    });
  }

  /**
   * @description
   * Calls an endpoint through which you can launch an instance of a process.
   *
   * @remarks
   * Running a process from the PROCESIO platform is done in 3 different steps.
   * `publish` (generates an instance of a process), `uploadFile` (required ony for instances
   * that have file inputs) and `LAUNCH` (executes the previously generated instance)
   *
   * @usageNotes
   *
   *  ### Launch an instance of a process which sends an email and log the instance id.
   *
   *  ```typescript
   * const sdkInstance = new ProcesioSDK();
   *
   * await sdkInstance.authorize('username', 'password');
   *
   * const publishReq = await sdkInstance.publish('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx', {to: "someemail@domain.com", subject: "Process launched via SDK"})
   *
   * if (!publishReq.isError && publishReq.content.flows.isValid) {
   *   const launchReq = await sdkInstance.launch(publish.content.flows.id);
   *
   *   console.log(launchReq.content?.instanceId); // "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx"
   *}
   * ```
   * @param instanceId - The id of the instance. Can be obtained by `publish`ing a process.
   *
   * @param workspace - The workspace associated with the instance. Optional.
   *
   * @returns A Promise which returns an object with they key instanceId.
   */
  launch(instanceId: GUID, workspace?: string) {
    if (!this.token) {
      throw Error("Authorization information missing.");
    }

    return request<{ instanceId: GUID }>({
      url: `Projects/instances/${instanceId}/launch`,
      bearerToken: this.token,
      workspace,
      body: { connectionId: "" },
    });
  }

  /**
   * @description
   * Calls an endpoint through which you can upload a file associated to an input.
   *
   * @remarks
   * Running a process from the PROCESIO platform is done in 3 different steps.
   * `publish` (generates an instance of a process), `UPLOADFILE` (required ony for instances
   * that have file inputs) and `launch` (executes the previously generated instance)
   *
   * @usageNotes
   *
   *  ### Execute a process which sends an email with attachments and log the instance id.
   *
   *  ```typescript
   * const sdkInstance = new ProcesioSDK();
   *
   * await sdkInstance.authorize('username', 'password');
   *
   * document
   *   .getElementById("file")
   *   .addEventListener("change", handleFileSelect, false);
   *
   * function handleFileSelect(evt) {
   *   const files = evt.target.files; // FileList object
   *   const file = files[0];
   * 
   *   const publishReq = await sdkInstance.publish('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx', {to: "someemail@domain.com", subject: "Process launched via SDK", attachments: {name: file.name}})
   *
   *   if (!publishReq.isError && publishReq.content.flows.isValid) {
   *     const fileVariable = publishReq.content.flows.variables.find((variable) => variable.name === "attachments");
   * 
   *     await sdkInstance.uploadFile(publishReq.content.flows.id, fileVariable.name, fileVariable.defaultValue.id, file)
   * 
   *     const launchReq = await sdkInstance.launch(publishReq.content.flows.id);
   *
   *     console.log(launchReq.content?.instanceId); // "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx"
   *   }
   * }
   *
   
   * ```
   * @param instanceId - The id of the instance. Can be obtained by `publish`ing a process.
   * @param variableName - The name of the input variable. 
   * @param fileId - The id of the file. Can be obtained on the `publish` response in the in the `variable` property.
   * @param file
   *
   * @param workspace - The workspace associated with the instance. Optional.
   *
   * @returns A Response Promise which returns the id of the file.
   */
  async uploadFile(
    instanceId: GUID,
    variableName: string,
    fileId: GUID,
    file: File,
    workspace = ""
  ) {
    if (!this.token) {
      throw Error("Authorization information missing.");
    }

    const headers = new Headers();

    headers.set("Accept", "application/json");

    headers.set("Authorization", `Bearer ${this.token}`);

    headers.set("realm", "procesio01");

    headers.set("flowInstanceId", instanceId);

    headers.set("variableName", variableName);

    headers.set("fileId", fileId);

    headers.set("workspace", workspace);

    const formData = new FormData();

    formData.append("package", file);

    headers.delete("Content-Type");
    delete headers["Content-Type"];

    const resp = await fetch(
      `https://api.procesio.app:4321/api/file/upload/flow`,
      {
        method: "POST",
        headers,
        body: formData,
      }
    );

    return resp.json();
  }

  /**
   * @description
   * Calls an endpoint through which you can run a process with the required inputs.
   *
   * @remarks
   * The called endpoint only work for processes than don't have file inputs.
   * The called endpoint uses the endpoints called in `publish` and `launch`.
   *
   * @usageNotes
   *
   *  ### Runs a process which sends an email and log the instance id.
   *
   *  ```typescript
   * const sdkInstance = new ProcesioSDK();
   *
   * await sdkInstance.authorize('username', 'password');
   *
   * const runReq = await sdkInstance.run('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx', {to: "someemail@domain.com", subject: "Process launched via SDK"})
   *
   * console.log(runReq.content?.instanceId?.id); // "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx"
   *
   * ```
   * @param processId - The id of the process. Can be obtained from the PROCESIO platform.
   *
   * @param payload
   * Object which contains all the inputs needed to run a process from the PROCESIO platform.
   * The key of map is the variable name set in the process from the PROCESIO platform.
   * The value of the map is the value of said input variable.
   *
   * @param workspace - The workspace associated with the process. Optional.
   *
   * @returns A Promise which returns an object with they key instanceId.
   */
  run(processId: GUID, payload: Record<string, unknown>, workspace?: string) {
    if (!this.token) {
      throw Error("Authorization information missing.");
    }

    return request<{ instanceId: GUID }>({
      url: `Projects/${processId}/run`,
      bearerToken: this.token,
      workspace,
      body: { payload },
    });
  }

  /**
   * @description
   * Run a process with the required inputs.
   *
   * @usageNotes
   *
   *  ### Runs a process which sends an email and log the instance id.
   *
   *  ```typescript
   * const sdkInstance = new ProcesioSDK();
   *
   * await sdkInstance.authorize('username', 'password');
   *
   * const runReq = await sdkInstance.runProcess('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx', {to: "someemail@domain.com", subject: "Process launched via SDK"})
   *
   * console.log(runReq.content?.instanceId?.id); // "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx"
   *
   * ```
   * @param processId - The id of the process. Can be obtained from the PROCESIO platform.
   *
   * @param payload
   * Object which contains all the inputs needed to run a process from the PROCESIO platform.
   * The key of map is the variable name set in the process from the PROCESIO platform.
   * The value of the map is the value of said input variable.
   *
   * @param workspace - The workspace associated with the process. Optional.
   *
   * @returns A Promise which returns an object with they key instanceId.
   */
  async runProcess(
    processId: GUID,
    payload: Record<string, unknown | File | FileList>,
    workspace?: string
  ) {
    let hasFiles = false;

    const files: Record<string, FileWrapper | FileWrapper[]> = {};

    const parsedPayload = Object.entries(payload).reduce(
      (acc: Record<string, unknown | FileName | FileName[]>, [key, value]) => {
        if (value instanceof File) {
          hasFiles = true;

          acc[key] = { name: value.name };

          files[key] = { package: value };
        } else if (value instanceof FileList) {
          hasFiles = true;

          const fileArray = Array.from(value);

          acc[key] = fileArray.map((file) => ({ name: file.name }));

          files[key] = fileArray.map((file) => ({ package: file }));
        } else {
          acc[key] = value;
        }
        return acc;
      },
      {}
    );

    if (hasFiles) {
      const publishReq = await this.publish(
        processId,
        parsedPayload,
        workspace
      );

      if (!publishReq.isError && publishReq.content.flows.isValid) {
        const instance = publishReq.content.flows;

        for (const variableName in files) {
          if (Object.prototype.hasOwnProperty.call(files, variableName)) {
            const fileWrapper = files[variableName];

            const defaultValue = instance.variables.find(
              (variable) => variable.name === variableName
            )?.defaultValue;

            if (defaultValue) {
              if (Array.isArray(fileWrapper)) {
                fileWrapper.forEach((wrapper, index) => {
                  wrapper.fileId = (defaultValue as FileDefaultValue[])[
                    index
                  ].id;
                });
              } else {
                fileWrapper.fileId = (defaultValue as FileDefaultValue).id;
              }
            }
          }
        }

        const promises: Array<Response> = [];

        for (const variableName in files) {
          if (Object.prototype.hasOwnProperty.call(files, variableName)) {
            const element = files[variableName];

            if (Array.isArray(element)) {
              for (let index = 0; index < element.length; index++) {
                promises.push(
                  await this.uploadFile(
                    instance.id,
                    variableName,
                    element[index].fileId,
                    element[index].package
                  )
                );
              }
            } else {
              promises.push(
                await this.uploadFile(
                  instance.id,
                  variableName,
                  element.fileId,
                  element.package
                )
              );
            }
          }
        }

        return Promise.all(promises).then(() => {
          return this.launch(instance.id, workspace);
        });
      }
    } else {
      return this.run(processId, payload, workspace);
    }
  }
}
