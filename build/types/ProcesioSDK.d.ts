import { ProcesioToken, ConstructorOptions, FileName, ProcessInstance, GUID } from "./types";
export declare class ProcesioSDK {
    token?: string;
    private baseUrl;
    private portAuth;
    private portEndpoints;
    /**
     *
     */
    constructor(options?: ConstructorOptions);
    /**
     * @description
     * Authenticates the library and returns a token
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
     * const token = await sdkInstance.authenticate('username', 'password');
     *
     * console.log(JSON.stringify(token)); // {"access_token":"<hashed_token>", "expires_in":2592000, "refresh_expires_in":2592000, "refresh_token":"<hashed_token>", "token_type":"bearer", "session_state":"5beb683c-3ed7-4f7a-be79-c2d3eb5f4e43", "scope":"email profile", "error":null, "error_description":null}
     *
     * ```
     * @param username - The username associated with the account.
     *
     * @param password - The password associated with the account.
     *
     * @returns A Promise which returns an object containing all the necessary informations for
     * authentication, like token or refresh token.
     */
    authenticate(username: string, password: string, authenticationRealm?: string, authenticationClientId?: string): Promise<ProcesioToken>;
    /**
     * @description
     * Calls an endpoint through which you can publish a process with the required
     * inputs in order to run that process.
     *
     * @remarks
     * Running a process from the PROCESIO platform is done in 3 different steps.
     * `publishProcess` (generates an instance of a process),
     * `uploadFile` (required ony for instances that have file inputs) and
     * `launchProcessInstance` (executes the previously generated instance)
     *
     * @usageNotes
     *
     *  ### Publish a process which sends an email and log the instance id.
     *
     *  ```typescript
     * const sdkInstance = new ProcesioSDK();
     *
     * await sdkInstance.authenticate('username', 'password');
     *
     * const publishReq = await sdkInstance.publishProcess('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx', {to: "someemail@domain.com", subject: "Process launched via SDK"})
     *
     * console.log(publishReq.content.flows.id); // "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx"
     *
     * ```
     * @param processId - The id of the process. Can be obtained from the PROCESIO platform.
     *
     * @param inputValues
     * Object which contains all the inputs needed to run a process from the PROCESIO platform.
     * The key of map is the variable name set in the process from the PROCESIO platform.
     * The value of the map is the value of said variable. If a variable is of type file, it's
     * value should be an object with the key name and the value the name of the file
     *
     * @param workspace - The workspace associated with the process. Optional.
     *
     * @returns A Promise which returns the instance of the process.
     */
    publishProcess(processId: GUID, inputValues: Record<string, unknown | FileName | FileName[]>, workspace?: string): Promise<import("./utils/request").RestResponse<Record<"flows", ProcessInstance>>>;
    /**
     * @description
     * Calls an endpoint through which you can launch an instance of a process.
     *
     * @remarks
     * Running a process from the PROCESIO platform is done in 3 different steps.
     * `publishProcess` (generates an instance of a process),
     * `uploadFile` (required ony for instances that have file inputs) and
     * `launchProcessInstance` (executes the previously generated instance)
     *
     * @usageNotes
     *
     *  ### Launch an instance of a process which sends an email and log the instance id.
     *
     *  ```typescript
     * const sdkInstance = new ProcesioSDK();
     *
     * await sdkInstance.authenticate('username', 'password');
     *
     * const publishReq = await sdkInstance.publishProcess('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx', {to: "someemail@domain.com", subject: "Process launched via SDK"})
     *
     * if (!publishReq.isError && publishReq.content.flows.isValid) {
     *   const launchReq = await sdkInstance.launchProcessInstance(publish.content.flows.id);
     *
     *   console.log(launchReq.content?.instanceId); // "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx"
     *}
     * ```
     * @param instanceId - The id of the instance. Can be obtained by `publish`ing a process.
     *
     * @param workspace - The workspace associated with the instance. Optional.
     *
     * @param isSynchronous - If true Promise will return result only after the process
     * finishes executing, otherwise after the process starts executing.
     *
     * @returns A Promise which returns an object with they key instanceId.
     */
    launchProcessInstance(instanceId: GUID, isSynchronous?: boolean, workspace?: string): Promise<import("./utils/request").RestResponse<ProcessInstance | {
        instanceId: GUID;
    }>>;
    /**
     * @description
     * Calls an endpoint through which you can upload a file associated to an input.
     *
     * @remarks
     * Running a process from the PROCESIO platform is done in 3 different steps.
     * `publishProcess` (generates an instance of a process),
     * `uploadFile` (required ony for instances that have file inputs) and
     * `launchProcessInstance` (executes the previously generated instance)
     *
     * @usageNotes
     *
     *  ### Execute a process which sends an email with attachments and log the instance id.
     *
     *  ```typescript
     * const sdkInstance = new ProcesioSDK();
     *
     * await sdkInstance.authenticate('username', 'password');
     *
     * document
     *   .getElementById("file")
     *   .addEventListener("change", handleFileSelect, false);
     *
     * function handleFileSelect(evt) {
     *   const files = evt.target.files; // FileList object
     *   const file = files[0];
     *
     *   const publishReq = await sdkInstance.publishProcess('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx', {to: "someemail@domain.com", subject: "Process launched via SDK", attachments: {name: file.name}})
     *
     *   if (!publishReq.isError && publishReq.content.flows.isValid) {
     *     const fileVariable = publishReq.content.flows.variables.find((variable) => variable.name === "attachments");
     *
     *     await sdkInstance.uploadFile(publishReq.content.flows.id, fileVariable.name, fileVariable.defaultValue.id, file)
     *
     *     const launchReq = await sdkInstance.launchProcessInstance(publishReq.content.flows.id);
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
    uploadFile(instanceId: GUID, variableName: string, fileId: GUID, file: File, workspace?: string): Promise<any>;
    /**
     * @description
     * Calls an endpoint through which you can run a process with the required inputs.
     *
     * @remarks
     * This method only works for processes than don't have file inputs.
     *
     * @usageNotes
     *
     *  ### Runs a process which sends an email and log the instance id.
     *
     *  ```typescript
     * const sdkInstance = new ProcesioSDK();
     *
     * await sdkInstance.authenticate('username', 'password');
     *
     * const runReq = await sdkInstance.run('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx', {to: "someemail@domain.com", subject: "Process launched via SDK"})
     *
     * console.log(runReq.content?.instanceId?.id); // "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx"
     *
     * ```
     * @param processId - The id of the process. Can be obtained from the PROCESIO platform.
     *
     * @param inputValues
     * Object which contains all the inputs needed to run a process from the PROCESIO platform.
     * The key of map is the variable name set in the process from the PROCESIO platform.
     * The value of the map is the value of said input variable.
     *
     * @param workspace - The workspace associated with the process. Optional.
     *
     * @param isSynchronous - If true Promise will return result only after the process
     * finishes executing, otherwise after the process starts executing.
     *
     * @returns A Promise which returns an object with they key instanceId.
     */
    run(processId: GUID, inputValues: Record<string, unknown>, isSynchronous?: boolean, workspace?: string): Promise<import("./utils/request").RestResponse<ProcessInstance | {
        instanceId: GUID;
    }>>;
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
     * await sdkInstance.authenticate('username', 'password');
     *
     * const runReq = await sdkInstance.runProcess('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx', {to: "someemail@domain.com", subject: "Process launched via SDK"})
     *
     * console.log(runReq.content?.instanceId?.id); // "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx"
     *
     * ```
     * @param processId - The id of the process. Can be obtained from the PROCESIO platform.
     *
     * @param inputValues
     * Object which contains all the inputs needed to run a process from the PROCESIO platform.
     * The key of map is the variable name set in the process from the PROCESIO platform.
     * The value of the map is the value of said input variable.
     *
     * @param workspace - The workspace associated with the process. Optional.
     *
     * @returns A Promise which returns an object with they key instanceId.
     */
    runProcess(processId: GUID, inputValues: Record<string, unknown | File | FileList>, isSynchronous?: boolean, workspace?: string): Promise<import("./utils/request").RestResponse<ProcessInstance | {
        instanceId: string;
    }>>;
    getStatus(instanceId: GUID, workspace?: string): Promise<import("./utils/request").RestResponse<Record<"instance", ProcessInstance>>>;
}
