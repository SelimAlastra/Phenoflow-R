// As this page was using javascript functions, they were retaken to be tested.

const chai = require("chai");
chai.use(require("chai-http"));
const server = require("../app");
const should = chai.should();
const expect = chai.expect;




function rosaceaPrototype(codeList, birthDate, lastEncouter){

    const primaryCodes = ["F4C3100","M153000","M153100","M153200","M153300","M153400","M153.00","M153z00","Myu6900"];
    const secondaryCodes = ["L71.1","L71.8","L71.9"];
    let error = false
    let rosaceaPrimaryBoolean = false;
    let rosaceaSecondaryBoolean = false;
    let i 

    if (birthDate.length == 0 || lastEncouter.length == 0 || codeList.length == 0) {
        error = true;
    }

    for (i = 0; i < primaryCodes.length ;i++) {
        if(codeList.includes(primaryCodes[i])){
            rosaceaPrimaryBoolean = true;
        }
    }

    for (i = 0; i < secondaryCodes.length ;i++) {
        if(codeList.includes(secondaryCodes[i])){
            rosaceaSecondaryBoolean = true;
        }
    }

    return {
        error: error,
        rosaceaPrimaryBoolean: rosaceaPrimaryBoolean,
        rosaceaSecondaryBoolean: rosaceaSecondaryBoolean
    }
}

function AAAPrototype(codeList, birthDate, lastEncouter){

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

    let error = false;
    let ageExculsionBoolean = true;
    let lastEBoolean = true;


    let renalAbdominalAorticAneurysm = false;
    let occlusiveAbdominalAorticAneurysm = false;
    let abdominalAorticAneurysmRuptured = false;
    let externalAbdominalAorticAneurysm = false;
    let abdominalAorticAneurysmArtery = false;
    let abdominalAorticAneurysmMentionRupture = false;

    let i;

    if (birthDate.length == 0 || lastEncouter.length == 0 || codeList.length == 0) {
        error = true;
    }

    var age_diff_ms = Date.now() - birthDate.getTime();
    var age_dt = new Date(age_diff_ms); 
    var age = Math.abs(age_dt.getUTCFullYear() - 1970);

    var lastE_diff_ms = Date.now() - lastEncouter.getTime();
    var lastE_dt = new Date(lastE_diff_ms); 
    var lastETime = Math.abs(lastE_dt.getUTCFullYear() - 1970);

    //Code to calculate time was taken from W3 Ressources
    //Link : https://www.w3resource.com/javascript-exercises/javascript-date-exercise-18.php

    if (age >= 40 && age < 90){
        ageExculsionBoolean = false;
    }

    if (lastETime <= 5){
        lastEBoolean = false;
    }
    
    for (i = 0; i < aCodes.length ;i++) {
        if(codeList.includes(aCodes[i]) && ageExculsionBoolean == false){
            renalAbdominalAorticAneurysm = true
        }
    }
    for (i = 0; i < bCodes.length ;i++) {
        if(codeList.includes(bCodes[i]) && ageExculsionBoolean == false){
            occlusiveAbdominalAorticAneurysm = true
        }
    }

    for (i = 0; i < cCodes.length ;i++) {
        if(codeList.includes(cCodes[i]) && ageExculsionBoolean == false){
            abdominalAorticAneurysmRuptured = true
        }
    }
    for (i = 0; i < dCodes.length ;i++) {
        if(codeList.includes(dCodes[i]) && ageExculsionBoolean == false){
            externalAbdominalAorticAneurysm = true
        }
    }
    for (i = 0; i < eCodes.length ;i++) {
        if(codeList.includes(eCodes[i]) && ageExculsionBoolean == false){
            abdominalAorticAneurysmArtery = true
        }
    }

    for (i = 0; i < fCodes.length ;i++) {
        if((codeList.toString().match(new RegExp(fCodes[i], "g")) || []).length >= 2 && ageExculsionBoolean == false && lastEBoolean == false){
            abdominalAorticAneurysmMentionRupture = true
        }

        return {
            error: error,
            renalAbdominalAorticAneurysm: renalAbdominalAorticAneurysm,
            occlusiveAbdominalAorticAneurysm: occlusiveAbdominalAorticAneurysm,
            abdominalAorticAneurysmRuptured: abdominalAorticAneurysmRuptured,
            externalAbdominalAorticAneurysm: externalAbdominalAorticAneurysm,
            abdominalAorticAneurysmArtery: abdominalAorticAneurysmArtery,
            abdominalAorticAneurysmMentionRupture: abdominalAorticAneurysmMentionRupture,
            ageExculsionBoolean: ageExculsionBoolean,
            lastEBoolean: lastEBoolean
        }

    } 
}



describe("prototype", () => {

    describe("rosaceaPrototype", () => {

        it("[PROT1.1] Should be able to detect rosaceaPrimary for a specific input", async() => {
            codeList = ["F4C3100","M153000"]
            birthDate = new Date(2000, 05, 27)
            lastEncouter = new Date(2020, 04, 03)

            output = rosaceaPrototype(codeList,birthDate,lastEncouter)
            
            condition = (output.error == false && output.rosaceaPrimaryBoolean == true)

            expect(condition).to.be.eq(true)
        });

        it("[PROT1.2] Should be able to detect rosaceaSecondary for a specific input", async() => {
            codeList = ["L71.1"]
            birthDate = new Date(2000, 05, 27)
            lastEncouter = new Date(2020, 04, 03)

            output = rosaceaPrototype(codeList,birthDate,lastEncouter)
            
            condition = (output.error == false && output.rosaceaSecondaryBoolean == true)

            expect(condition).to.be.eq(true)
        });

        it("[PROT1.3] Should be able to detect rosaceaPrimary and rosceaSecondary for a specific input", async() => {
            codeList = ["F4C3100","L71.1"]
            birthDate = new Date(2000, 05, 27)
            lastEncouter = new Date(2020, 04, 03)

            output = rosaceaPrototype(codeList,birthDate,lastEncouter)
            
            condition = (output.error == false && output.rosaceaPrimaryBoolean == true && output.rosaceaSecondaryBoolean == true)

            expect(condition).to.be.eq(true)
        });
    });

    describe("AAAPrototype", () => {

        it("[PROT2.1] Should be able to detect age exclusion", async() => {
            codeList = []
            birthDate = new Date(2000, 05, 27)
            lastEncouter = new Date(2020, 04, 03)

            output = AAAPrototype(codeList,birthDate,lastEncouter)

            condition = (output.ageExculsionBoolean == true)

            expect(condition).to.be.eq(true)
        });

        it("[PROT2.2] Should be able to detect last encouter exclusion", async() => {
            codeList = []
            birthDate = new Date(2000, 05, 27)
            lastEncouter = new Date(2000, 04, 03)

            output = AAAPrototype(codeList,birthDate,lastEncouter)

            condition = (output.lastEBoolean == true)

            expect(condition).to.be.eq(true)
        });


        it("[PROT2.3] Should be able to detect renalAbdominalAorticAneurysm", async() => {
            codeList = ["34800","34802"]
            birthDate = new Date(1970, 05, 27)
            lastEncouter = new Date(2000, 04, 03)

            output = AAAPrototype(codeList,birthDate,lastEncouter)

            condition = (output.renalAbdominalAorticAneurysm == true)

            expect(condition).to.be.eq(true)
        });

        it("[PROT2.4] Should be able to detect abdominalAorticAneurysmMentionRupture", async() => {
            codeList = ["34800","34802","441.4","441.4"]
            // must have 441.1 code two times
            birthDate = new Date(1970, 05, 27)
            lastEncouter = new Date(2019, 04, 03)

            output = AAAPrototype(codeList,birthDate,lastEncouter)

            condition = (output.abdominalAorticAneurysmMentionRupture == true)

            expect(condition).to.be.eq(true)
        });

        it("[PROT2.5] Should be able to detect two different outputs", async() => {
            codeList = ["34800","34802","441.4","441.4", "35081"]
            // must have 441.1 code two times
            birthDate = new Date(1970, 05, 27)
            lastEncouter = new Date(2019, 04, 03)

            output = AAAPrototype(codeList,birthDate,lastEncouter)

            condition = (output.abdominalAorticAneurysmMentionRupture == true && output.occlusiveAbdominalAorticAneurysm == true)

            expect(condition).to.be.eq(true)
        });
    
    });





});