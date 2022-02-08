function fillTable() {
    let dataCodes = document.getElementById("dataCodes").value;
    //remove white spaces from codes
    // dataCodes = dataCodes.replace(/\s/g, '');
    let codesArray = dataCodes.split(' ');

    if (dataCodes.length == 0){
        return
    }

    const numberOfPatients = document.getElementById("numberOfPatients").value;
    const minimumDate = new Date(1920, 0, 1);
    
    //Taken from
    //https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
    function randomIntFromInterval(min, max) { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min)
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

    let contents = `
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
        birthDate = randomDate(minimumDate, new Date());
        birthDateFormated = (formatDate(birthDate));
        numberOfCodes = randomIntFromInterval(1, codesArray.length)
        //random but must be 1 or less that the number of codes in the array
        for (let i = 1; i <= numberOfCodes; i++){
            let codeDate;
            console.log(birthDate)
            codeDate = randomDate(birthDate, new Date());
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