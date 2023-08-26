window.onload = function() {
    $("#inputUsername").focus();
    
  };

function login() {
    $("#resultsDiv").html('');
    setTimeout(function() {
        if ($('#inputUsername').val().length > 3 && $('#inputPassword').val() == "casa4145") {
            var username = $('#inputUsername').val();
            window.location = "index.html?u=" + username;
        } else {
            $("#resultsDiv").html('<span id="_msg">Login incorrect!</span>');
        }
    }, 300); 
}  