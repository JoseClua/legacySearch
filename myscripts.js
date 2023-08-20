var isSortByPriceAsc = false;
var isSorted = false;
var data = [];
var num = 0;

window.onload = function() {
    $("#searchText").focus();
  };

function clearSearch() {   
    $("#resultsDiv").html('');
    if ($('#searchText').val().length > 0) {
        $('#searchText').val("");
    }
}

function sortProductsByPrice (isSortedSearch){

    let sortedData = [];

    data.forEach(item => {        
        
        item.stores.forEach(s => {
            var record = {productId: 0, productName: '', storeName: '', price: 0}

            record.productId = item.id;
            record.productName = item.product;
            record.storeName = s.store;
            record.price = s.price;
           
            sortedData.push(record);
        });
    });

    if (isSortedSearch) {
        var p1 = 0;
        var p2 = 0;
        sortedData = sortedData.sort(function(a,b){
            p1 = parseFloat(a.price);
            p2 = parseFloat(b.price);
            return isSortByPriceAsc? p1 - p2 : p2 - p1;
        })
    }

    return sortedData;    
  }


function sortByPrice() {

    isSortByPriceAsc = !isSortByPriceAsc;

    $("#resultsDiv").html('loading...');
        setTimeout(function(){
            $("#resultsDiv").html(buildResults(true));            
          }, 300);
}

function buildItems(isSortedSearch) {
    let USDollar = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    var lines = ['oddLine','evenLine'];
    var items = '';

    sortedData = sortProductsByPrice(isSortedSearch);

    var n = 0;

    sortedData.forEach(item => {
        
        items += '<tr class="' + lines[n%2] + '">' +
                '    <td>' + item.productId + '</td>' +
                '    <td>' + item.productName + '</td>' +
                '    <td>' + item.storeName + '</td>' +
                '    <td id="_priceCell' + n + '" style="text-align: right;">' + USDollar.format(item.price)  + '</td>' +
                '</tr>';

            n++;
    });
    return items;
}

function buildResults(isSortedSearch) {

    var results = '<table>' +
    '<tr>' +
    '    <td colspan="4">' + num + ' results:</td>' +
    '</tr>' +
    '<tr class="headerLine">' +
    '    <th style="width: 100px;text-align: left;">Product Id</th>' +
    '    <th style="width: 300px;text-align: left;">Product Name</th>' +
    '    <th style="width: 300px;text-align: left;">Store Name</th>' +
    '    <th style="width: 100px;text-align: right;"><a onclick="sortByPrice()" href="#">Price</a></th>' +
    '</tr>' +

    buildItems(isSortedSearch) +

    '</table>';
    return results;
}

function search() {
    isSortByPriceAsc = false;
    isSorted = false;
    data = [];
    num = 0;
    var str = $("#searchText").val();
    console.log("searching for " + str + "...");
    $.getJSON('products.json', function(products) {
        
        products.forEach(item => {
            if (item.product.toUpperCase().includes(str.toUpperCase()) || item.id == str) {
                data.push(item);
                item.stores.forEach(s => {    
                    num++;
                });
            }            
        });
        $("#resultsDiv").html('loading...');
        setTimeout(function(){
            if (num > 0) {
                $("#resultsDiv").html(buildResults(false));
            } else {
                $("#resultsDiv").html('No results found');
            }
            
          }, 1000);        
    });
}