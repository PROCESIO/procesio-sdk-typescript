import ProcesioSDK from "../lib";

const myLibraryInstance = new ProcesioSDK();

console.log("myLibraryInstance", myLibraryInstance);

const input = document.createElement("input");

input.type = "file";
input.multiple = true;

const btn = document.createElement("button");
btn.innerText = "Trigger flow";

const body = document.querySelector("body");

body.innerHTML = `<h1>Hello World!</h1>`;
body.appendChild(input);
body.appendChild(btn);

let fileList: FileList;
let singleFile: File;

input.onchange = function (e) {
  const files = (<HTMLInputElement>e.target).files;

  fileList = files;
  singleFile = fileList[0];
};

btn.onclick = async function () {
  await myLibraryInstance.authorize("cuore.nica@procesio.com", "C#ut1creier");
  // const run = await myLibraryInstance.run(
  //   "241c2beb-4788-4c07-a705-0cec62ac1086",
  //   {
  //     from: "External application",
  //     to: "cuore.nica@procesio.com",
  //     subject: "Email triggered by external application",
  //     body: "Some randon body",
  //   }
  // );
  // console.log(run.content);
  //   return;
  // const publish = await myLibraryInstance.publish(
  //   "241c2beb-4788-4c07-a705-0cec62ac1086",
  //   {
  //     from: "External application",
  //     to: "cuore.nica@procesio.com",
  //     subject: "Email triggered by external application",
  //     body: "Some randon body",
  //     // singleFile: singleFile,
  //     // fileList: fileList,
  //   }
  // );

  // console.log(publish.content.flows.id);
  // if (!publish.isError && publish.content.flows.isValid) {
  //   const launch = await myLibraryInstance.launch(publish.content.flows.id);
  //   console.log(launch.content.instanceId);
  // }

  // myLibraryInstance.u

  myLibraryInstance
    .executeProcess("241c2beb-4788-4c07-a705-0cec62ac1086", {
      from: "External application",
      to: "cuore.nica@procesio.com",
      subject: "Email triggered by external application",
      body: "Some randon body",
      singleFile: singleFile,
      fileList: fileList,
    })
    .then((resp) => console.log(resp.content));
};
