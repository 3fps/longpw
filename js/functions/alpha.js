/**
 * Alpha function for computing password
 *
 * Steven Luu (@sluu99)
 *
 */
function alpha(phrase, username, service, length, allowSpecial) {
    
    var tabS = ['ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz', '0123456789', './,[]{};:!@#$%^&*()'];
    var tabNS = tabS.slice(0,tabS.length-1);
    var tab = allowSpecial? tabS : tabNS;

    var shaPad = username + service + length.toString() + allowSpecial.toString();  
    var pass = phrase;  
    var tabIndex;
    var pw = '';


    while (pw.length < length) {

        var sha = SHA256(pass + shaPad);
        
        sha[0] ^= sha[1] ^ sha[2] ^ sha[3] ^ sha[4] ^ sha[5] ^ sha[6] ^ sha[7];
        sha[0] = Math.abs(sha[0]);

        tabIndex = sha[0] % tab.length;
        pw += tab[tabIndex].charAt(sha[0] % tab[tabIndex].length);
        
        pass += binb2hex(SHA256(pw));
    }
    
    return pw;
}
