var calcTimer;
var longPhraseInput;
var usernameInput;
var serviceInput;
var lengthInput;
var allowSpecialInput;
var tooglePhraseInput;
var passwordInput;
var loaderImg;

function showPw(pw) {
    passwordInput.val(pw);
    loaderImg.css('visibility', 'hidden');
}

function calculatePw() {
    var longPhrase = longPhraseInput.val();
    var username = usernameInput.val();
    var service = serviceInput.val();
    var length = parseInt(lengthInput.val());
    var allowSpecial = allowSpecialInput.is(':checked');

    if (longPhrase.length != 0) {
        loaderImg.css('visibility', 'visible');
        Alpha.calc(longPhrase, username, service, length, allowSpecial, showPw);
    } else showPw('');

    // flag UI elements
    if (longPhrase.length < 20) longPhraseInput.addClass('error');
    else longPhraseInput.removeClass('error');
    if (username.length == 0) usernameInput.addClass('error');
    else usernameInput.removeClass('error');
    if (service.length == 0) serviceInput.addClass('error');
    else serviceInput.removeClass('error');
}

function scheduleCalc() {
    clearTimeout(calcTimer);
    calcTimer = setTimeout(calculatePw, 200);
}

function toogleVisibility() {
    var input = longPhraseInput;
    var rep;
    if (tooglePhraseInput.is(':checked'))
        rep = $('<input id="longPhrase" type="text">');
    else
        rep = $('<input id="longPhrase" type="password">');
    rep.val(input.val()).keyup(scheduleCalc).insertBefore(input);
    input.remove();
    longPhraseInput = rep;
}

$(function() {
    longPhraseInput = $('#longPhrase');
    tooglePhraseInput = $('#tooglePhrase');
    usernameInput = $('#username');
    serviceInput = $('#service');
    lengthInput = $('#length');
    allowSpecialInput = $('#allowSpecial');
    passwordInput = $('#password');
    loaderImg = $('#loaderGif');

    longPhraseInput.keyup(scheduleCalc);
    tooglePhraseInput.change(toogleVisibility);
    usernameInput.keyup(scheduleCalc);
    serviceInput.keyup(scheduleCalc);
    lengthInput.change(scheduleCalc);
    allowSpecialInput.change(scheduleCalc);

    longPhraseInput.focus();
});
