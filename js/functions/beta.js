/**
 * Beta function for computing password.
 * Requires CrytoJS's SHA512
 *
 * Steven Luu (@sluu99)
 *
 */

function Beta() { }

Beta.tabS = ['ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz', '0123456789', './,[]{};:!@#$%^&*()'];
Beta.tabNS = Beta.tabS.slice(0, Beta.tabS.length-1);

Beta.doCalc = function(phrase, length, allowSpecial, tab, padding, pw, callback) {
    if (length == 0) {
        callback(pw);
        return;
    }

    var sha = CryptoJS.SHA512(phrase + padding);
    var words = sha.words;
    for (i = 1; i < words.length; i++)
        words[0] ^= words[i];
    words[0] = Math.abs(words[0]);

    var tabIndex = words[0] % tab.length;
    pw += tab[tabIndex].charAt(words[0] % tab[tabIndex].length);

    phrase += CryptoJS.enc.Hex.stringify(CryptoJS.SHA512(pw));

    setTimeout(function() {
        Beta.doCalc(phrase, length - 1, allowSpecial, tab, padding, pw, callback);
    }, 1);
}

Beta.calc = function(phrase, username, service, length, allowSpecial, callback) {
    var tab = allowSpecial? Beta.tabS : Beta.tabNS;
    var padding = username + service + length.toString() + allowSpecial.toString();
    Beta.doCalc(phrase, length, allowSpecial, tab, padding, '', callback);
}
