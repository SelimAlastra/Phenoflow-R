function fillTable() {
    let dataCodes = document.getElementById("dataCodes").value;
    //remove white spaces from codes
    // dataCodes = dataCodes.replace(/\s/g, '');
    let codesArray = dataCodes.split(' ');

    for(let exporterButton of document.getElementsByClassName("exporterButton")) exporterButton.style.display = "none";

    let contents;
    dataTable.innerHTML = contents;

    errorMessage.innerHTML =  ""

    if (dataCodes.length == 0){
        dataTable.innerHTML = "";
        return
    }

    const maxNumberOfCodes = document.getElementById("maxNumberOfCodes").value;
    const minNumberOfCodes = document.getElementById("minNumberOfCodes").value;
    const numberOfPatients = document.getElementById("numberOfPatients").value;

    const oBirthdate =  new Date(document.getElementById("oBirthdate").value);
    const yBirthdate = new Date(document.getElementById("yBirthdate").value);

    const latestEncDate = new Date(document.getElementById("latestEncDate").value);


    const advancedParams = document.getElementById("advancedParamsSwitch").checked;

    
    const minimumDate = new Date(1920, 0, 1);

    if(advancedParams == true){
        if (oBirthdate instanceof Date && isNaN(oBirthdate)){
            dataTable.innerHTML = "";
            return
        }

        if (yBirthdate instanceof Date && isNaN(yBirthdate)){
            dataTable.innerHTML = "";
            return
        }

        if (latestEncDate instanceof Date && isNaN(latestEncDate)){
            dataTable.innerHTML = "";
            return
        }
        
        if(maxNumberOfCodes > codesArray.length){
            errorMessage.innerHTML = "The maximum number of codes is greater than the number of codes provided !"
            dataTable.innerHTML = "";
            return
        }

        if(minNumberOfCodes > maxNumberOfCodes){
            errorMessage.innerHTML = "The minimum number of codes is greater than the maximum number of codes provided !"
            dataTable.innerHTML = "";
            return
        }

        if(yBirthdate < oBirthdate){
            errorMessage.innerHTML = "The younget possible patient is older than the oldest one !"
            dataTable.innerHTML = "";
            return
        }

        if(latestEncDate < yBirthdate){
            errorMessage.innerHTML = "The latest encounter date must be greater than the youngest possible patient birthdate !"
            dataTable.innerHTML = "";
            return
        }
    }

    for(let exporterButton of document.getElementsByClassName("exporterButton")) exporterButton.style.display = "inline-block";
    
    //Taken from
    //https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
    function randomIntFromInterval(min, max) { // min and max included 
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    //Taken from
    //https://stackoverflow.com/questions/9035627/elegant-method-to-generate-array-of-random-dates-within-two-dates
    function randomDate(start, end) {
        return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    }
      
    
    //Taken from
    //https://bobbyhadz.com/blog/javascript-format-date-yyyy-mm-dd
    function padTo2Digits(num) {
        return num.toString().padStart(2, '0');
    }
    //Taken from
    //https://bobbyhadz.com/blog/javascript-format-date-yyyy-mm-dd
    function formatDate(date) {
        return [
          date.getFullYear(),
          padTo2Digits(date.getMonth() + 1),
          padTo2Digits(date.getDate()),
        ].join('-');
      }
    
    function getRandomFormatedDate(minDate){
        const d = randomDate(minDate, new Date());
        return formatDate(d)
    }

    contents = `
        <thead>
            <tr>
                <th>patient-id</th>
                <th>dob</th>
                <th>codes</th>
                <th>last-encounter</th>
            </tr>
        </thead>
        <tbody>
        `;


    for (let i = 1; i <= numberOfPatients; i++){
        randomCodes = "\""
        codeDates = []

        if(advancedParams == true){
            numberOfCodes = randomIntFromInterval(minNumberOfCodes, maxNumberOfCodes)
            birthDate = randomDate(oBirthdate, yBirthdate);
        }
        else {
            numberOfCodes = randomIntFromInterval(1, codesArray.length)
            birthDate = randomDate(minimumDate, new Date());
        }
        birthDateFormated = (formatDate(birthDate));
        //random but must be 1 or less that the number of codes in the array
        for (let i = 1; i <= numberOfCodes; i++){
            let codeDate;
            if(advancedParams == true){
                codeDate = randomDate(birthDate, latestEncDate);
            }
            else{
                codeDate = randomDate(birthDate, new Date());
            }
            codeDates.push(codeDate);
            //must be before the birthdate
            codeDateFormated = formatDate(codeDate);
            randomCode = codesArray[Math.floor(Math.random()*codesArray.length)];
            if(i == 1){
                randomCodes += "("+randomCode+","+codeDateFormated+")";
            }
            else{
                randomCodes += ","+"("+randomCode+","+codeDateFormated+")";
            }
            
        }
        randomCodes += "\""
        lastEncounterDateFormated = formatDate(new Date(Math.max.apply(null, codeDates)))
        //is the latest date that a code was assigned to a certain patient

        contents += `
            <tr>
                <td>${i}</td>
                <td>${birthDateFormated}</td>
                <td>${randomCodes}</td>
                <td>${lastEncounterDateFormated}</td>
            </tr>
        `;

    }
    contents += "</tbody>"
    dataTable.innerHTML = contents;
}