

function sendPostRequest(endpoint, body, callback, contentType='application/json') {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/phenoflow/" + endpoint, true);
    if (contentType) xhr.setRequestHeader('Content-Type', contentType);
    const idToken = localStorage.getItem("id_token");
    if (idToken) xhr.setRequestHeader("Authorization", "Bearer " + idToken);
    xhr.onreadystatechange = function() {
      if(xhr.readyState === XMLHttpRequest.DONE) {
        var status = xhr.status;
        if (status === 0 || (status >= 200 && status < 400)) {
          callback(xhr.response);
        } else {
          console.log(xhr.statusText);
          callback(null);
        }
      }
    };
    xhr.send(body);
  }
  

function getCSVs() {
    return [
        {"filename":"listA_system.csv",
        "content": [
        {"ICD-10 code": "123", "description": "TermA TermB"},
        {"ICD-10 code": "234", "description": "TermA TermC"},
        {"ICD-10 code": "345", "description": "TermD TermE"}
        ]},
        {"filename":"listB_system.csv",
        "content": [
        {"SNOMED code": "456", "description": "TermF TermG"},
        {"SNOMED code": "567", "description": "TermF TermH"},
        {"SNOMED code": "678", "description": "TermI TermJ"}
        ]},
        {"filename":"listC_system.csv",
        "content": [
        {"SNOMED code": "456", "description": "TermK TermL"},
        {"SNOMED code": "567", "description": "TermK TermL"},
        {"SNOMED code": "678", "description": "TermK TermL"}
        ]},
        {"filename":"listD_system.csv",
        "content": [
        {"SNOMED code": "456", "description": "TermM TermN"},
        {"SNOMED code": "567", "description": "TermM TermN"},
        {"SNOMED code": "678", "description": "TermM TermN"}
        ]}
    ]
}

function createImportedCodeListPhenotype(csvs,name,userName,about,callback=function(response){}){
    sendPostRequest("importer/importCodelists", JSON.stringify({"csvs": getCSVs(), "name":"test", "about":"test", "userName":"test"}), callback);
    var data = new FormData();
    data.append("implementation", file);
}


function getImportedCodeListData(){
    let phenotypeName = document.getElementById("phenotypeName").value;
    let phenotypeDescription = document.getElementById("phenotypeDescription").value;
    let phenotypeUsername = "martinchapman";
    let CSVs = document.getElementById("codeLists").files[0];
    console.log(phenotypeName)
    console.log(phenotypeDescription)
    console.log(phenotypeUsername)
    console.log(CSVs)
    createImportedCodeListPhenotype(CSVs,phenotypeName,phenotypeUsername,phenotypeDescription)
}