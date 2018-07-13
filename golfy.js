
const fs = require('fs');
const atob = require('atob');
const btoa = require('btoa');
const clipboardy = require('clipboardy');
const base64 = require('js-base64').Base64;
const lzstring = require('./lzw');


fs.readFile('index.html', 'utf-8', (err, data) => {
	if (err) throw err;

    // Head of the URI
    const head = 'data:text/html;charset=utf-8;base64,';
    // Content of the URI
    const hidePage = '<script>var h=document.getElementsByTagName("html")[0];h.style.display="none";'
    const injectDecompressLib = 'var o={},f=String.fromCharCode,m=Math.pow;function g(p,x){if(!o[p]){o[p]={};for(var e=0;e<p.length;e++)o[p][p.charAt(e)]=e}return o[p][x]}function d(p){var x=p.length,e=function(a){return g("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",p.charAt(a))},r=[],t=4,v=4,w=3,c="",y=[],n,a,h=e(0),b=32,u=1;for(n=0;3>n;n+=1)r[n]=n;c=0;var k=m(2,2);for(a=1;a!=k;){var l=h&b;b>>=1;0==b&&(b=32,h=e(u++));c|=(0<l?1:0)*a;a<<=1}switch(c){case 0:c=0;k=m(2,8);for(a=1;a!=k;)l=h&b,b>>=1,0==b&&(b=32,h=e(u++)),c|=(0<l?1:0)*a,a<<=1;var q=f(c);break;case 1:c=0;k=m(2,16);for(a=1;a!=k;)l=h&b,b>>=1,0==b&&(b=32,h=e(u++)),c|=(0<l?1:0)*a,a<<=1;q=f(c);break;case 2:return""}n=r[3]=q;for(y.push(q);;){if(u>x)return"";c=0;k=m(2,w);for(a=1;a!=k;)l=h&b,b>>=1,0==b&&(b=32,h=e(u++)),c|=(0<l?1:0)*a,a<<=1;switch(q=c){case 0:c=0;k=m(2,8);for(a=1;a!=k;)l=h&b,b>>=1,0==b&&(b=32,h=e(u++)),c|=(0<l?1:0)*a,a<<=1;r[v++]=f(c);q=v-1;t--;break;case 1:c=0;k=m(2,16);for(a=1;a!=k;)l=h&b,b>>=1,0==b&&(b=32,h=e(u++)),c|=(0<l?1:0)*a,a<<=1;r[v++]=f(c);q=v-1;t--;break;case 2:return y.join("")}0==t&&(t=m(2,w),w++);if(r[q])c=r[q];else if(q===v)c=n+n.charAt(0);else return null;y.push(c);r[v++]=n+c.charAt(0);t--;n=c;0==t&&(t=m(2,w),w++)}};';
    const decodeURI = 'var a = window.location.href.substring(' + head.length + ');var b = atob(a);var c = b.substring(b.length-';
    const injectData = '<script>h.innerHTML=d(c);h.style.display="block"</script>';
    const endIndexContent = injectData.length;
    const decodeURIEnd = ',b.length-' + endIndexContent + ');</script>';
    // Encode data to be as small as possible
    const encodedData = lzstring.compressToBase64(data);
    const startIndexContent = endIndexContent + encodedData.length;

    const content = hidePage + injectDecompressLib + decodeURI + startIndexContent + decodeURIEnd + encodedData + injectData;

	var uri = head + btoa(content);
	clipboardy.writeSync(uri);
    console.log('data base size: ' + btoa(data).length);
    console.log('data compressed size: ' + btoa(encodedData).length);
	console.log('url in clipboard');
})