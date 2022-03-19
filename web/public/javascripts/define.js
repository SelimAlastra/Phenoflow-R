
function processInputOutputImplementation(create, stepNode, stepId) {
  let inputDoc = stepNode.getElementsByClassName("inputDoc")[0].value;
  let outputDoc = stepNode.getElementsByClassName("outputDoc")[0].value;
  let outputExtension = stepNode.getElementsByClassName("outputExtension")[0].value;
  if (inputDoc) input(stepId, inputDoc);
  if (outputDoc && outputExtension) output(stepId, outputDoc, outputExtension);
  for (let implementationNode of stepNode.getElementsByClassName("implementation")) {
    let implementationFile = implementationNode.getElementsByClassName("implementationFile")[0].files[0];
    let implementationLanguage = implementationNode.getElementsByClassName("implementationLanguage")[0].value
    if (implementationFile && implementationLanguage) implementation(stepId, implementationLanguage, implementationFile);
  }
}

function processStep(create, stepNode, position, workflowId) {
  let stepName = stepNode.getElementsByClassName("name")[0].value
  let stepDoc = stepNode.getElementsByClassName("doc")[0].value
  let stepType;
  for (let potentialStepType of stepNode.getElementsByClassName("type")) {
    if (potentialStepType.checked) stepType = potentialStepType.value;
  }
  if (!stepName || !stepDoc || !stepType) return;
  let stepId;
  step(workflowId, position, stepName, stepDoc, stepType, function(stepUpdateResponse){
    if (stepUpdateResponse && (stepId=JSON.parse(stepUpdateResponse).id)) {
      processInputOutputImplementation(false, stepNode, stepId);
    }
  });
}

function createOrUpdateWorkflow() {
  let workflowId;
  if (window.location.pathname.split("/")[4]) workflowId = window.location.pathname.split("/")[4];
  let workflowName = document.getElementsByClassName("workflowName")[0].value;
  let workflowAuthor = "martinchapman";
  let workflowAbout = document.getElementsByClassName("workflowAbout")[0].value;
  let stepNodes = document.getElementById("steps").childNodes;
  if (!workflowName || !workflowAuthor || !workflowAbout) return;
  if (!workflowId) {
    createWorkflow(workflowName, workflowAuthor, workflowAbout, function(workflowCreateResponse) {
      if (workflowCreateResponse && (workflowId=JSON.parse(workflowCreateResponse).id)) {
        history.pushState({page: 1}, "", "/phenoflow/phenotype/define/" + workflowId);
        let position = 1;
        for (let stepNode of stepNodes) {
          processStep(true, stepNode, position, workflowId);
          position++;
        }
      }
    });
  } else {
    for(let deletedStep of deletedSteps) deleteStep(workflowId, deletedStep);
    updateWorkflow(workflowId, workflowName, workflowAuthor, workflowAbout, function(workflowUpdatedResponse) {
      if (workflowUpdatedResponse) {
        let position = 1;
        for(let stepNode of stepNodes) {
          processStep(false, stepNode, position, workflowId);
          position++;
        }
      }
    });
  }
}

var inputSteps = 1;

function addStep() {
  //to find the number of steps
  let stepNodes = document.getElementById("steps").childNodes;
  inputSteps = stepNodes.length;

  let original = document.getElementById("step1");
  let clone = original.cloneNode(true);
  clone.id = "step" + ++inputSteps;
  clone.getElementsByClassName("name")[0].value = "";
  clone.getElementsByClassName("doc")[0].value = "";
  for (let type of clone.getElementsByClassName("type")) type.removeAttribute("checked")
  clone.getElementsByClassName("inputDoc")[0].value = "";
  clone.getElementsByClassName("outputDoc")[0].value = "";
  clone.getElementsByClassName("outputExtension")[0].value = "";
  clone.getElementsByClassName("implementationLanguage")[0].value = "-";
  clone.getElementsByClassName("implementationFileExisting")[0].style.display = "none";
  clone.getElementsByClassName("stepRemove")[0].style.display = "inline";

  // console.log(clone.getElementsByClassName("")
  for(let type of clone.getElementsByClassName("type")) {
    type.id = "step" + inputSteps + type.value;
    type.name = "step" + inputSteps + "type";
  }

  //Change onclick of the addImplementation input as it was not changed
  clone.getElementsByClassName("addImplementation")[0].setAttribute("onClick", "addImplementation('step" + inputSteps +"'); return false;");

  for(let typeLabel of clone.getElementsByTagName("label")) {
    // console.log(typeLabel.className.split(" ").pop())
    // Fix class name 
    typeLabel.htmlFor = "step" + inputSteps + typeLabel.className.split(" ").pop()}
  original.parentNode.appendChild(clone);
}

var deletedSteps = [];
function logDeletedStep(step) {
  step = step.parentNode.parentNode.parentNode;
  let position = 1;
  for(let potentialStep of document.getElementById("steps").childNodes) {
    if(potentialStep == step) break;
    position++;
  }
  deletedSteps.push(position);
  step.remove();
  inputSteps--;
}

function addImplementation(stepInputId) {
  let original = document.getElementById(stepInputId).getElementsByClassName("implementation")[0];
  let clone = original.cloneNode(true);
  clone.getElementsByClassName("implementationLanguage")[0].value="-";
  clone.getElementsByClassName("implementationFile")[0].value="";
  let implementationFileExisting = clone.getElementsByClassName("implementationFileExisting")?clone.getElementsByClassName("implementationFileExisting")[0]:null;
  if (implementationFileExisting ) implementationFileExisting.remove();
  original.parentNode.appendChild(clone);
}


function defineValidation(){
  document.getElementById("validationMessage").innerHTML = "";
  // reset validation message
  let phenotypeName = document.getElementsByClassName("workflowName")[0].value;
  let phenotyeDescription = document.getElementsByClassName("workflowAbout")[0].value;
  let stepNodes = document.getElementById("steps").childNodes;
  let counter = 0;
  for (let step of stepNodes){
    counter++;
    let inputDescription = step.getElementsByClassName("inputDoc")[0].value;
    let outputDescription = step.getElementsByClassName("outputDoc")[0].value;
    let outputExtension = step.getElementsByClassName("outputExtension")[0].value;
    let stepName = step.getElementsByClassName("name")[0].value;
    let stepDescription = step.getElementsByClassName("doc")[0].value;
    let stepType;
    for (let potentialStepType of step.getElementsByClassName("type")) {
      if (potentialStepType.checked) stepType = potentialStepType.value;
    }
    // console.log(stepType)

    // if (outputExtension != "csv")
    // { 
    //   document.getElementById("validationMessage").innerHTML = "Please enter a correct output extension for step number " + counter;
    // }
    // if (outputExtension.length == 0)
    // { 
    //   document.getElementById("validationMessage").innerHTML = "Please enter the step number " + counter + " output extension";
    // }
    // if (outputDescription.length == 0)
    // { 
    //   document.getElementById("validationMessage").innerHTML = "Please enter the step number " + counter + " output description";
    // }
    // if (inputDescription.length == 0)
    // { 
    //   document.getElementById("validationMessage").innerHTML = "Please enter the step number " + counter + " input description";
    // }
    let implementationCounter = 0;
    for (let implementationNode of step.getElementsByClassName("implementation")) {
      implementationCounter++
      let implementationFile = implementationNode.getElementsByClassName("implementationFile")[0].files[0];
      let implementationLanguage = implementationNode.getElementsByClassName("implementationLanguage")[0].value
      if(!implementationFile){document.getElementById("validationMessage").innerHTML = "The implementation file number "+ implementationCounter + " for step number " + counter;}
      // console.log(implementationFile)
      // console.log(implementationLanguage)
    }
  }


  // if (phenotyeDescription.length == 0){
  //   document.getElementById("validationMessage").innerHTML = "Please enter a phenotype description";
  // }
  // if (phenotypeName.length == 0){
  //   document.getElementById("validationMessage").innerHTML = "Please enter a phenotype name";
  // }

}