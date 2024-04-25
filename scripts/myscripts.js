var isSortByPriceAsc = false;
var isSorted = false;
var data = [];
var num = 0;
var username = "";

window.onload = function() {

    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get('u');
    console.log(username);

    $("#loginName").html('<span id="_msg">' + username + '</span>');

    $("#searchText").focus();
  };

$(document).on('keypress',function(e) {
    if(e.which == 13) {
        search();
    }
});

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
                '    <td id="_idCell' + n + '">' + item.productId + '</td>' +
                '    <td id="_prodCell' + n + '">' + item.productName + '</td>' +
                '    <td id="_storeCell' + n + '"><a href="#">' + item.storeName + '</a></td>' +
                '    <td id="_priceCell' + n + '" style="text-align: right;">' + USDollar.format(item.price)  + '</td>' +
                '    <td id="_orderCell' + n + '" style="text-align: right;"><a href="#">order</a></td>' +
                '</tr>';

            n++;
    });
    return items;
}

function buildResults(isSortedSearch) {

    var results = '<table id="_resultsTable">' +
    '<tr>' +
    '    <td colspan="4"><span id="_resultsCount">' + num + ' ' + ((num == 1) ? ' result' : ' results') + '</span></td>' +
    '</tr>' +
    '<tr class="headerLine">' +
    '    <th style="width: 140px;text-align: center;">Product Id</th>' +
    '    <th style="width: 400px;text-align: center;">Product Name</th>' +
    '    <th style="width: 400px;text-align: center;">Store</th>' +
    '    <th style="width: 150px;text-align: center;"><a id="sortLink" onclick="sortByPrice()" href="#">Price</a></th>' +
    '    <th style="width: 120px;text-align: center;">&nbsp;</th>' +
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
    $.getJSON('scripts/products.json', function(products) {
        
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
                $("#resultsDiv").html('<p id="_noResults">No results found</p>');
            }
            
          }, 1000);        
    });
}