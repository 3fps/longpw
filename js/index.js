$(function() {        
    function calculatePw() {
        var longPhrase = $('#longPhrase').val();
        var username = $('#username').val();
        var service = $('#service').val();
        var length = parseInt($('#length').val());
        var allowSpecial = $('#allowSpecial').is(':checked');

        if (longPhrase.length != 0) 
            $('#password').val(alpha(longPhrase, username, service, length, allowSpecial));

        // flag UI elements
        if (longPhrase.length < 20) $('#longPhrase').addClass('error');
        else $('#longPhrase').removeClass('error');
        if (username.length == 0) $('#username').addClass('error');
        else $('#username').removeClass('error');
        if (service.length == 0) $('#service').addClass('error');
        else $('#service').removeClass('error');
    }

    function toogleVisibility() {
        var input = $('#longPhrase');
        var rep;
        if ($('#tooglePhrase').is(':checked'))
            rep = $('<input id="longPhrase" type="text">');
        else
            rep = $('<input id="longPhrase" type="password">');
        rep.val(input.val()).keyup(calculatePw).insertBefore(input);
        input.remove();
        input = rep;
    }
            
    $('#username').keyup(calculatePw);
    $('#service').keyup(calculatePw);
    $('#length').change(calculatePw);
    $('#allowSpecial').change(calculatePw);         
    $('#longPhrase').keyup(calculatePw);
    $('#tooglePhrase').change(toogleVisibility);
});
