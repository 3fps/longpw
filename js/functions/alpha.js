/**
 * Alpha function for computing password.
 * Requires CrytoJS's PBKDF2
 *
 * Steven Luu (@sluu99)
 *
 */

function Alpha() { }

Alpha.tabS = ['ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz', '0123456789', './,[]{};:!@#$%^&*()'];
Alpha.tabNS = Alpha.tabS.slice(0, Alpha.tabS.length-1);
Alpha.guids = [
    '512bd235-4856-452f-9174-5113e498a55a', 'f0cb3efa-73eb-4187-8784-2b0e575e805d', 'b4057a61-b347-4ee0-a51c-84d08645805d',
    '907ad8ed-381e-426b-854c-8c789324db28', 'c8cca729-adda-4a3f-8831-ed5454dfc677', '39f10d67-02ec-40ac-961c-d573bdf21841',
    'd2224133-6244-4f19-97a0-d9bd15156e0e', '43443e46-45a1-48a2-992a-21bea1bfae52', 'c282f89e-a78a-46ec-b91a-5523615ced0e',
    'e54ec17b-c033-45c3-bcf5-5c6657ff9972', '0fb34325-004e-4ade-946c-1ad56a4f557b', '408553cb-1133-4052-9932-9c4b05c964d9',
    '377688cb-1bd9-46eb-8cc5-15709d8bd86e', '6f4ed496-aed3-46f2-9707-93a15f3d4f8e', 'cf42b0b3-2b79-4b7f-abae-6c238babc841',
    '783c792e-3345-4b12-b8f4-274a58e713a8', '18360b1f-135b-46bd-95c7-d7323b232b5f', 'b9efd702-d04a-4995-bec8-2283957b8c1d',
    '30e4fe40-843f-4b26-8051-68201511ee06', 'd8c77782-5292-4831-81b3-92a713b0a9f8', 'b3c35450-2fa0-448b-a487-ccbbeb001e98'];


// salt generates the salt for the hashing function
Alpha.salt = function(str) {
    var words = CryptoJS.SHA512(str).words;
    for (i = 1; i < words.length; i++)
        words[0] ^= words[i];
    return CryptoJS.SHA512(str + Alpha.guids[Math.abs(words[0]) % Alpha.guids.length]);
}

Alpha.doCalc = function(phrase, length, allowSpecial, salt, tab, padding, pw, callback) {
    if (length == 0) {
        callback(pw);
        return;
    }

    var bins = CryptoJS.PBKDF2(phrase + padding, salt, { keySize: 512/32, iterations: 10 });
    var words = bins.words;
    for (i = 1; i < words.length; i++)
        words[0] ^= words[i];
    words[0] = Math.abs(words[0]);

    var tabIndex = words[0] % tab.length;
    pw += tab[tabIndex].charAt(words[0] % tab[tabIndex].length);

    phrase += CryptoJS.PBKDF2(pw, Alpha.salt(pw), { keySize: 512/32 });

    setTimeout(function() {
        Alpha.doCalc(phrase, length - 1, allowSpecial, salt, tab, padding, pw, callback);
    }, 1);
}

Alpha.calc = function(phrase, username, service, length, allowSpecial, callback) {
    var tab = allowSpecial? Alpha.tabS : Alpha.tabNS;
    var padding = username + service + length.toString() + allowSpecial.toString();
    var salt = Alpha.salt(phrase + padding);
    Alpha.doCalc(phrase, length, allowSpecial, salt, tab, padding, '', callback);
}
