 <div align="center">
 <img align="center" src="https://procesio-email-hosting.fra1.digitaloceanspaces.com/logo-procesio.png" />
  <h2>Procesio SDK typescript</h2>
  <blockquote>Minimal library for running Procesio processes</blockquote>

<strong>For a C# alternative, check out [procesio-sdk-dotnet](https://github.com/PROCESIO/procesio-sdk-dotnet).</strong>

</div>

## 📦 Installation & Usage

You can use procesio-sdk-typescript as a `<script>` tag from a CDN, or install it from npm.

### npm

```
npm install --save @procesio/procesio-sdk-typescript
```

```
import ProcesioSDK from '@procesio/procesio-sdk-typescript';
const sdkInstance = new ProcesioSDK();
...
```

### self-host/cdn

```
<script src="build/index.js"></script>

const ProcesioSDK = window.ProcesioSDK.default;
const sdkInstance = new ProcesioSDK();
...

```

### Example

```
// Execute a process which sends an email with attachments and log the instance id.
 const sdkInstance = new ProcesioSDK();

 await sdkInstance.authorize('username', 'password');

 document
   .getElementById("file")
   .addEventListener("change", handleFileSelect, false);

 function handleFileSelect(evt) {
   const files = evt.target.files; // FileList object
   const file = files[0];

   /**
    * Running a process from PROCESIO is done in 3 different steps.
    *
    * The first step requires you to publish that process with all the
    * needed inputs, defined when you created said process. This call will
    * return an object from which you require 2 infos: instanceID (flows.id)
    * and the variable list (flows.variables). Instance id is needed for both
    * uploading a file and for launching the process. Variable list is
    * needed for uploading the files.
    *
    * The second step, upload file, is optional and only needed for processes that
    * have file inputs. To run this step you need the instanceID, the uploaded file,
    * and to obtain from the variable list, the variable which contains the file.
    * You will need the variable name and it's default value.
    *
    * The third steps launches the flow. This step should be run only after
    * the files have been uploaded.
    *
    * The example below is made for a process with only one file. If you have more
    * than one, you have to upload all the files before launching the flow.
    */

   // Step 1 - Publish the process with the required inputs
   const publishReq = await sdkInstance.publish('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx', {to: "someemail@domain.com", subject: "Process launched via SDK", attachments: {name: file.name}})

   if (!publishReq.isError && publishReq.content.flows.isValid) {
     // Obtain the file input variable
     const fileVariable = publishReq.content.flows.variables.find((variable) => variable.name === "attachments");

     // Step 2 - Upload the file associated to the the input variable
     await sdkInstance.uploadFile(publishReq.content.flows.id, fileVariable.name, fileVariable.defaultValue.id, file)

     // Step 3 - Launch the process
     const launchReq = await sdkInstance.launch(publishReq.content.flows.id);

     console.log(launchReq.content?.instanceId); // "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx"
   }
 }
```

-OR-

```
// Execute a process which sends an email with attachments and log the instance id.
 const sdkInstance = new ProcesioSDK();

 await sdkInstance.authorize('username', 'password');

 document
   .getElementById("file")
   .addEventListener("change", handleFileSelect, false);

 function handleFileSelect(evt) {
   const files = evt.target.files; // FileList object
   const file = files[0];

   // This method is an implementation that uses the methods used in the example above
   const runReq = await sdkInstance.runProcess('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx', {to: "someemail@domain.com", subject: "Process launched via SDK", attachments: files})

    console.log(runReq.content?.instanceId?.id); // "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx"

 }
```

## 📖 Documentation

Check out the [procesio-sdk-typescript documentation](https://some-url) site.

### To run demo on your own computer

- Clone this repository
- `npm install`
- `npm start`
- Visit [http://localhost:9000/](http://localhost:9000/)
