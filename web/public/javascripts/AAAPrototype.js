function AAAOutput() {

    const birthDate2 = new Date(document.getElementById("birthDate2").value);
    const lastE2 = new Date(document.getElementById("lastE2").value);
    const codes2 = document.getElementById("codes2").value;

    const aCodes = ["34800","34802","34803","34804","34805","34830","34831","34832","35091","35092"];
    const bCodes = ["35081"];
    const cCodes = ["441.3"];
    const dCodes = ["35102","35103"];
    const eCodes = ["35131","35132"];
    const fCodes  = ["441.4"];

    // For lisibility
    // a = Renal Abdominal Aortic Aneurysm
    // b = Occlusive Abdominal Aortic Aneurysm
    // c = Abdominal Aortic Aneurysm Ruptured
    // d = External Abdominal Aortic Aneurysm
    // e = Abdominal Aortic Aneurysm Artery
    // f = Abdominal Aortic Aneurysm Mention Rupture


    var age_diff_ms = Date.now() - birthDate2.getTime();
    var age_dt = new Date(age_diff_ms); 
    var age = Math.abs(age_dt.getUTCFullYear() - 1970);

    //Code to calculate age was taken from W3 Ressources
    //Link : https://www.w3resource.com/javascript-exercises/javascript-date-exercise-18.php
    //Use same logic to caculate last encounter time;

    let ageExculsionBoolean = true;

    if (age >= 40 && age < 90){
        ageExculsionBoolean = false;
    }

    var lastE_diff_ms = Date.now() - lastE2.getTime();
    var lastE_dt = new Date(lastE_diff_ms); 
    var lastETime = Math.abs(lastE_dt.getUTCFullYear() - 1970);

    let lastEBoolean = true;

    if (lastETime <= 5){
        lastEBoolean = false;
    }


    let i;

    document.getElementById("AAAOutputTitle").innerHTML = "";
    document.getElementById("aText").innerHTML = "";
    document.getElementById("bText").innerHTML = "";
    document.getElementById("cText").innerHTML = "";
    document.getElementById("dText").innerHTML = "";
    document.getElementById("eText").innerHTML = "";
    document.getElementById("fText").innerHTML = "";
    document.getElementById("ageExclusion").innerHTML = "";
    document.getElementById("lastEncounterExclusion").innerHTML = "";

    let validationBoolean = false;


    if (isNaN(birthDate2.getTime())) {
        validationBoolean = true;
    }
    if (isNaN(lastE2.getTime())) {
        validationBoolean = true;
    }
    if (codes2.length == 0) {
        validationBoolean = true;
    }

    // For lisibility
    // a = Renal Abdominal Aortic Aneurysm
    // b = Occlusive Abdominal Aortic Aneurysm
    // c = Abdominal Aortic Aneurysm Ruptured
    // d = External Abdominal Aortic Aneurysm
    // e = Abdominal Aortic Aneurysm Artery
    // f = Abdominal Aortic Aneurysm Mention Rupture

    if(validationBoolean == false){
        if (ageExculsionBoolean == true){
            document.getElementById("ageExclusion").innerHTML = "Age exclusion : True"
        }
        else {
            document.getElementById("ageExclusion").innerHTML = "Age exclusion : False"
        }

        if (lastEBoolean == true){
            document.getElementById("lastEncounterExclusion").innerHTML = "Last encounter exculsion : True"
        }
        else{
            document.getElementById("lastEncounterExclusion").innerHTML = "Last encounter exculsion : False"
        }
    }


    if (validationBoolean == false) {

        document.getElementById("AAAOutputTitle").innerHTML = "The output is :";

        for (i = 0; i < aCodes.length ;i++) {
            if(codes2.includes(aCodes[i]) && ageExculsionBoolean == false){
                document.getElementById("aText").innerHTML = "Renal Abdominal Aortic Aneurysm : CASE";
                break
            }
            else
            {
                document.getElementById("aText").innerHTML = "Renal Abdominal Aortic Aneurysm : UNK";
            }
        }

        for (i = 0; i < bCodes.length ;i++) {
            if(codes2.includes(bCodes[i]) && ageExculsionBoolean == false){
                document.getElementById("bText").innerHTML = "Occlusive Abdominal Aortic Aneurysm : CASE";
                break
            }
            else
            {
                document.getElementById("bText").innerHTML = "Occlusive Abdominal Aortic Aneurysm : UNK";
            }
        }
        for (i = 0; i < cCodes.length ;i++) {
            if(codes2.includes(cCodes[i]) && ageExculsionBoolean == false){
                document.getElementById("cText").innerHTML = "Abdominal Aortic Aneurysm Ruptured : CASE";
                break
            }
            else
            {
                document.getElementById("cText").innerHTML = "Abdominal Aortic Aneurysm Ruptured : UNK";
            }
        }
        for (i = 0; i < dCodes.length ;i++) {
            if(codes2.includes(dCodes[i]) && ageExculsionBoolean == false){
                document.getElementById("dText").innerHTML = "External Abdominal Aortic Aneurysm : CASE";
                break
            }
            else
            {
                document.getElementById("dText").innerHTML = "External Abdominal Aortic Aneurysm : UNK";
            }
        }
        for (i = 0; i < eCodes.length ;i++) {
            if(codes2.includes(eCodes[i]) && ageExculsionBoolean == false){
                document.getElementById("eText").innerHTML = "Abdominal Aortic Aneurysm Artery : CASE";
                break
            }
            else
            {
                document.getElementById("eText").innerHTML = "Abdominal Aortic Aneurysm Artery : UNK";
            }
        }
        for (i = 0; i < fCodes.length ;i++) {
            if((codes2.match(new RegExp(fCodes[i], "g")) || []).length >= 2 && ageExculsionBoolean == false && lastEBoolean == false)
            // The code to check if a specific string is present twice in another string is taken from :
            // https://stackoverflow.com/questions/881085/count-the-number-of-occurrences-of-a-character-in-a-string-in-javascript?rq=1

            {
                document.getElementById("fText").innerHTML = "Abdominal Aortic Aneurysm Mention Rupture : CASE";
                break
            }
            else
            {
                document.getElementById("fText").innerHTML = "Abdominal Aortic Aneurysm Mention Rupture : UNK";
            }
        }
    }

}