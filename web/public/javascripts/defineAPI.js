// function sendPostRequest(endpoint, body, callback, contentType='application/json') {
//   var xhr = new XMLHttpRequest();
//   xhr.open("POST", "/phenoflow/" + endpoint, true);
//   if (contentType) xhr.setRequestHeader('Content-Type', contentType);
//   const idToken = localStorage.getItem("id_token");
//   if (idToken) xhr.setRequestHeader("Authorization", "Bearer " + idToken);
//   xhr.onreadystatechange = function() {
//     if(xhr.readyState === XMLHttpRequest.DONE) {
//       var status = xhr.status;
//       if (status === 0 || (status >= 200 && status < 400)) {
//         callback(xhr.response);
//       } else {
//         console.log(xhr.statusText);
//         callback(null);
//       }
//     }
//   };
//   xhr.send(body);
// }

// function createImportedCodeListPhenotype(csvs,name,about,userName,callback=function(response){}){
//     return sendPostRequest("importer/importCodelists", JSON.stringify({"csvs": csvs, "name": name, "about": about, "userName": userName}), callback);
// }


// function getImportedCodeListData(){
//   const csvs = [
//     {"filename":"listA_system.csv",
//     "content": [
//     {"ICD-10 code": "123", "description": "TermA TermB"},
//     {"ICD-10 code": "234", "description": "TermA TermC"},
//     {"ICD-10 code": "345", "description": "TermD TermE"}
//     ]},
//     {"filename":"listB_system.csv",
//     "content": [
//     {"SNOMED code": "456", "description": "TermF TermG"},
//     {"SNOMED code": "567", "description": "TermF TermH"},
//     {"SNOMED code": "678", "description": "TermI TermJ"}
//     ]},
//     {"filename":"listC_system.csv",
//     "content": [
//     {"SNOMED code": "456", "description": "TermK TermL"},
//     {"SNOMED code": "567", "description": "TermK TermL"},
//     {"SNOMED code": "678", "description": "TermK TermL"}
//     ]},
//     {"filename":"listD_system.csv",
//     "content": [
//     {"SNOMED code": "456", "description": "TermM TermN"},
//     {"SNOMED code": "567", "description": "TermM TermN"},
//     {"SNOMED code": "678", "description": "TermM TermN"}
//     ]}
// ]
//     createImportedCodeListPhenotype(csvs,"Imported code list","Imported code list", "martinchapman")
// }

function getIdToken(){
  // console.log(localStorage.getItem("id_token"))
  document.getElementById("idTokenString").innerHTML = localStorage.getItem("id_token")
  for(let exporterButton of document.getElementsByClassName("idContainer")) exporterButton.style.display = "inline-block";
}


function sendIdToken(){
  // console.log(localStorage.getItem("id_token"))
  return localStorage.getItem("id_token")
}

function getUserName(){
  return localStorage.getItem("user")
}


$('#codeListSubmit').on('click',function(){

  username = getUserName()
  //get user

  document.getElementById("importCodeListValidation").innerHTML = ""
  document.getElementById("importCodeListValidationSuccess").innerHTML = ""
  var form = $('#codelistForm')[0]; // You need to use standard javascript object here
  var formData = new FormData(form);
  formData.append('userName', username)

  if (formData.get("name").length == 0){
    document.getElementById("importCodeListValidation").innerHTML = "Please enter a name for your definition !"
    return
  }
  if (formData.get("about").length == 0){
    document.getElementById("importCodeListValidation").innerHTML = "Please enter a description for your definition !"
    return
  }

  if (formData.get("csvs").size == 0){
    document.getElementById("importCodeListValidation").innerHTML = "Please upload your codelist ZIP file !"
    return
  }
  else{
    if(formData.get("csvs").name.split('.').pop() != "zip"){
      document.getElementById("importCodeListValidation").innerHTML = "Your file does not have the correct extension !"
      return
    }
  }

  $.ajax({
        url: "/phenoflow/importer/importCodelists",
        type: 'POST',
        data: formData,
        contentType: false, // NEEDED, DON'T OMIT THIS (requires jQuery 1.6+)
        processData: false, // NEEDED, DON'T OMIT THIS
        headers: {
                  "Authorization": "Bearer " + sendIdToken()
               },
        async: false,
        success: function(data, textStatus, xhr) {
          if(xhr.status == "500"){
            document.getElementById("importCodeListValidation").innerHTML = "Sorry, an error happened !"
          }
        },
        complete: function(xhr, textStatus) {
          if(xhr.status == "500"){
            document.getElementById("importCodeListValidation").innerHTML = "Sorry, an error happened !"
          }
          else {
            document.getElementById("importCodeListValidationSuccess").innerHTML = "Your phenotype definition was added"
          }
        } 
        })
});


$('#keyWordsSubmit').on('click',function(){

  username = getUserName()
  //get user

  document.getElementById("keyWordsValidation").innerHTML = ""
  document.getElementById("importCodeListValidationSuccess").innerHTML = ""
  var form = $('#keyWordsForm')[0]; // You need to use standard javascript object here
  var formData = new FormData(form);
  formData.append('userName', username)

  if (formData.get("name").length == 0){
    document.getElementById("keyWordsValidation").innerHTML = "Please enter a name for your definition !"
    return
  }
  if (formData.get("about").length == 0){
    document.getElementById("keyWordsValidation").innerHTML = "Please enter a description for your definition !"
    return
  }

  if (formData.get("keywords").size == 0){
    document.getElementById("keyWordsValidation").innerHTML = "Please upload the keywords CSV!"
    return
  }
  else{
    if(formData.get("keywords").name.split('.').pop() != "csv"){
      document.getElementById("keyWordsValidation").innerHTML = "Your file does not have the correct extension !"
      return
    }
  }

  $.ajax({
        url: "/phenoflow/importer/importKeywordList",
        type: 'POST',
        data: formData,
        contentType: false, // NEEDED, DON'T OMIT THIS (requires jQuery 1.6+)
        processData: false, // NEEDED, DON'T OMIT THIS
        headers: {
                  "Authorization": "Bearer " + sendIdToken()
               },
        async: false,
        success: function(data, textStatus, xhr) {
          if(xhr.status == "500"){
            document.getElementById("keyWordsValidation").innerHTML = "Sorry, an error happened !"
          }
        },
        complete: function(xhr, textStatus) {
          if(xhr.status == "500"){
            document.getElementById("keyWordsValidation").innerHTML = "Sorry, an error happened !"
          }
          else {
            document.getElementById("keyWordsValidationSuccess").innerHTML = "Your phenotype definition was added"
          }
        } 
        })
});


$('#stepListSubmit').on('click',function(){

  username = getUserName()
  //get user

  document.getElementById("stepListValidation").innerHTML = ""
  document.getElementById("stepListValidationSuccess").innerHTML = ""
  var form = $('#stepListForm')[0]; // You need to use standard javascript object here
  var formData = new FormData(form);
  formData.append('userName', username)

  if (formData.get("name").length == 0){
    document.getElementById("stepListValidation").innerHTML = "Please enter a name for your definition !"
    return
  }
  if (formData.get("about").length == 0){
    document.getElementById("stepListValidation").innerHTML = "Please enter a description for your definition !"
    return
  }

  if (formData.get("csvs").size == 0){
    document.getElementById("stepListValidation").innerHTML = "Please upload the collections of CSVs!"
    return
  }
  else{
    if(formData.get("csvs").name.split('.').pop() != "zip"){
      document.getElementById("stepListValidation").innerHTML = "The CSVs does not have the correct extension !"
      return
    }
  }
  if (formData.get("steplist").size == 0){
    document.getElementById("stepListValidation").innerHTML = "Please upload the list of steps!"
    return
  }
  else{
    if(formData.get("steplist").name.split('.').pop() != "csv"){
      document.getElementById("stepListValidation").innerHTML = "The list of steps does not have the correct extension !!"
      return
    }
  }

  $.ajax({
        url: "/phenoflow/importer/importSteplist",
        type: 'POST',
        data: formData,
        contentType: false, // NEEDED, DON'T OMIT THIS (requires jQuery 1.6+)
        processData: false, // NEEDED, DON'T OMIT THIS
        headers: {
                  "Authorization": "Bearer " + sendIdToken()
               },
        async: false,
        success: function(data, textStatus, xhr) {
          if(xhr.status == "500"){
            document.getElementById("stepListValidation").innerHTML = "Sorry, an error happened !"
          }
        },
        complete: function(xhr, textStatus) {
          if(xhr.status == "500"){
            document.getElementById("stepListValidation").innerHTML = "Sorry, an error happened !"
          }
          else {
            document.getElementById("stepListValidationSuccess").innerHTML = "Your phenotype definition was added"
          }
        } 
        })
});
