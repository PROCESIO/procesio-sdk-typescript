import ProcesioSDK from "../lib";
import { FileDefaultValue } from "../lib/types";

const sdkInstance = new ProcesioSDK();

console.log("myLibraryInstance", sdkInstance);

const input = document.createElement("input");

input.type = "file";
input.multiple = true;

const btnRunProcess = document.createElement("button");
btnRunProcess.innerText = "RunProcess";

const btnPublishLaunch = document.createElement("button");
btnPublishLaunch.innerText = "PublishLaunchProcess";

const body = document.querySelector("body");

body.innerHTML = `<h1>ProcesioSDK</h1>`;
body.appendChild(input);
body.appendChild(btnPublishLaunch);
body.appendChild(btnRunProcess);

let fileList: FileList;
let singleFile: File;

input.onchange = function (e) {
  const files = (<HTMLInputElement>e.target).files;

  fileList = files;
  singleFile = fileList[0];
};

btnPublishLaunch.onclick = async function () {
  await sdkInstance.authenticate("cuore.nica@procesio.com", "C#ut1creier");

  const publishReq = await sdkInstance.publishProcess(
    "b3b17c47-e11f-4a94-8456-1856ca07dec1",
    {
      from: "External application",
      to: "cuore.nica@procesio.com",
      subject: "Email triggered by external application",
      body: "Some randon body",
      singleFile: { name: singleFile.name },
    }
  );

  if (!publishReq.isError && publishReq.content.flows.isValid) {
    const fileVariable = publishReq.content.flows.variables.find(
      (variable) => variable.name === "singleFile"
    );

    await sdkInstance.uploadFile(
      publishReq.content.flows.id,
      fileVariable.name,
      (fileVariable.defaultValue as FileDefaultValue).id,
      singleFile
    );

    const launch = await sdkInstance.launchProcessInstance(
      publishReq.content.flows.id
    );

    if ("instanceId" in launch.content) {
      console.log(await sdkInstance.getStatus(launch.content.instanceId));
      console.log(launch.content.instanceId);
    }
  }
};

btnRunProcess.onclick = async function () {
  await sdkInstance.authenticate("cuore.nica@procesio.com", "C#ut1creier");

  sdkInstance
    .runProcess("241c2beb-4788-4c07-a705-0cec62ac1086", {
      from: "External application",
      to: "cuore.nica@procesio.com",
      subject: "Email triggered by external application",
      body: "Some randon body",
      fileList: fileList,
    })
    .then((resp) => console.log(resp.content));
};
