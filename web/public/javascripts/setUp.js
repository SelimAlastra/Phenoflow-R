
document.getElementById("localSpan").style.display = "inherit"
document.getElementById("ib2bSpan").style.display = "none"
document.getElementById("fhirSpan").style.display = "none"
document.getElementById("omopSpan").style.display = "none"


// localDataSetSpan.style.display = "none";
// ib2bConnectorSpan.style.display = "inherit";

$('#typeOfRun').change(function(){
    if($(this).val() == "0"){
        document.getElementById("localSpan").style.display = "inherit"
        document.getElementById("ib2bSpan").style.display = "none"
        document.getElementById("fhirSpan").style.display = "none"
    document.getElementById("omopSpan").style.display = "none"
    }
    if($(this).val() == "1"){
        document.getElementById("localSpan").style.display = "none"
        document.getElementById("ib2bSpan").style.display = "inherit"
        document.getElementById("fhirSpan").style.display = "none"
        document.getElementById("omopSpan").style.display = "none"
    }
    if($(this).val() == "2"){
        document.getElementById("localSpan").style.display = "none"
        document.getElementById("ib2bSpan").style.display = "none"
        document.getElementById("fhirSpan").style.display = "inherit"
        document.getElementById("omopSpan").style.display = "none"
        
    }
    if($(this).val() == "3"){
        document.getElementById("localSpan").style.display = "none"
        document.getElementById("ib2bSpan").style.display = "none"
        document.getElementById("fhirSpan").style.display = "none"
        document.getElementById("omopSpan").style.display = "inherit"
    }
})