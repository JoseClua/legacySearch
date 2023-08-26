window.onload = function() {
    var buttonRun = document.getElementById("buttonRun");
    buttonRun.addEventListener('click', run);
    buttonRun.innerText = 'X';
  };



function run() {
    console.log('hi');
    var resultDiv = document.getElementById("resultsDiv");
    var searchText = document.getElementById("searchText");

    var valorNoTextBox = parseInt(searchText.value);

    resultDiv.textContent = calculaDobro(valorNoTextBox);
}

function calculaDobro(num) {
    let result = num * 2;
    return result;
}



function clearSearch() {

    var resultDiv = document.getElementById("resultsDiv");
    var searchText = document.getElementById("searchText");

    searchText.value = "";

    resultDiv.innerHTML = "";
}