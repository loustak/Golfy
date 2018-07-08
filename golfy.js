
const fs = require('fs');
const clipboardy = require('clipboardy');
const base64 = require('js-base64').Base64;

function en(c) {
    var x = "charCodeAt", b, e = {}, f = c.split(""), d = [], a = f[0], g = 256;
    for (b = 1; b < f.length; b++) c = f[b], null != e[a + c] ? a += c :(d.push(1 < a.length ? e[a] :a[x](0)), 
    e[a + c] = g, g++, a = c);
    d.push(1 < a.length ? e[a] :a[x](0));
    for (b = 0; b < d.length; b++) d[b] = String.fromCharCode(d[b]);
    return d.join("");
}

function de(b) {
    var a, e = {}, d = b.split(""), c = f = d[0], g = [ c ], h = o = 256;
    for (b = 1; b < d.length; b++) a = d[b].charCodeAt(0), a = h > a ? d[b] :e[a] ? e[a] :f + c, 
    g.push(a), c = a.charAt(0), e[o] = f + c, o++, f = a;
    return g.join("");
}

function b64EncodeUnicode(str) {
    // first we use encodeURIComponent to get percent-encoded UTF-8,
    // then we convert the percent encodings into raw bytes which
    // can be fed into btoa.
    return Buffer.from(encodeURIComponent(str).toString('base64').replace(/%([0-9A-F]{2})/g,
        function toSolidBytes(match, p1) {
            return String.fromCharCode('0x' + p1);
    }));
}

fs.readFile('index.html', 'utf-8', (err, data) => {
	if (err) throw err;

	const lib = 'function de(b){var a,e={},d=b.split(""),c=f=d[0],g=[c],h=o=256;for(b=1;b<d.length;b++)a=d[b].charCodeAt(0),a=h>a?d[b]:e[a]?e[a]:f+c,g.push(a),c=a.charAt(0),e[o]=f+c,o++,f=a;return g.join("")}';
    const head = 'data:text/html;charset=utf-8;base64,';
	const needed = '<script>' + lib + 'var a = window.location.href.substring(' + head.length + ');var b = atob(a);var c = b.substring(292);</script>'

    const encodedData = en(data);
    console.log('data base size: ' + data.length);
    console.log('encoded data size: ' + encodedData.length);

    //console.log(decodeURIComponent(de(decodeURIComponent(data))));

	var url = head + b64EncodeUnicode(needed + encodedData);
	clipboardy.writeSync(url);
	console.log('url in clipboard');
})