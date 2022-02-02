function rosaceaOutput() {
    const primaryCodes = ["F4C3100","M153000","M153100","M153200","M153300","M153400","M153.00","M153z00","Myu6900"];
    const secondaryCodes = ["L71.1","L71.8","L71.9"];
    const birthDate = document.getElementById("birthDate").value;
    const lastE = document.getElementById("lastE").value;
    const codes = document.getElementById("codes").value;
    let i;
    let primaryText = "";
    let secondaryText = "";
    let validationBoolean = false;
    let rosaceaPrimaryBoolean = false;
    let rosaceaSecondaryBoolean = false;

    document.getElementById("primaryText").innerHTML = "";
    document.getElementById("secondaryText").innerHTML = "";
    document.getElementById("RosaceaOutputTitle").innerHTML = "";
    
    
    if (birthDate.length == 0 || lastE.length == 0 || codes.length == 0) {
        validationBoolean = true;
    }

    if (validationBoolean == true) {
        validationText += " missing !"
        document.getElementById("validation").innerHTML = validationText;

    }
    if (validationBoolean == false) {

        document.getElementById("RosaceaOutputTitle").innerHTML = "The output is :";

        for (i = 0; i < primaryCodes.length ;i++) {
            if(codes.includes(primaryCodes[i])){
                rosaceaPrimaryBoolean = true;
            }
        }

        for (i = 0; i < secondaryCodes.length ;i++) {
            if(codes.includes(secondaryCodes[i])){
                rosaceaSecondaryBoolean = true;
            }
        }
        
        if(rosaceaPrimaryBoolean == true){
            primaryText += "Rosacea Primary Identified : CASE";
        }
        if(rosaceaPrimaryBoolean == false){
            primaryText += "Rosacea Primary Identified : UNK";
        }

        if(rosaceaSecondaryBoolean == true){
            secondaryText += "Rosacea Secondary Identified : CASE";
        }
        if(rosaceaSecondaryBoolean == false){
            secondaryText += "Rosacea Secondary Identified : UNK";
        }

        document.getElementById("primaryText").innerHTML = primaryText;
        document.getElementById("secondaryText").innerHTML = secondaryText;
       
    }
    
}