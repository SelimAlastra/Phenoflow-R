function fillTable() {
    let dataCodes = document.getElementById("dataCodes").value;
    //remove white spaces from codes
    dataCodes = dataCodes.replace(/\s/g, '');
    let codesArray = dataCodes.split(',');

    const numberOfPatients = document.getElementById("numberOfPatients").value;
    const minimumDate = new Date(1922, 0, 1);

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

    let randomCode;
    let birthDate;
    let lastEncouter;
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
        randomCode =  codesArray[Math.floor(Math.random()*codesArray.length)];
        birthDate = randomDate(minimumDate, new Date());
        birthDateFormated = getRandomFormatedDate(birthDate);
        lastEncouterFormated = getRandomFormatedDate(randomDate(birthDate, new Date()));
        //last encouter date should be after the birth date.
        contents += `
            <tr>
                <td>${i}</td>
                <td>${birthDateFormated} </td>
                <td>${randomCode}</td>
                <td>${lastEncouterFormated}</td>
            </tr>
        `;

    }
    contents += "</tbody>"
    dataTable.innerHTML = contents;
}