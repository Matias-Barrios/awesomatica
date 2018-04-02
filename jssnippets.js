var token = new Buffer("matias" + ':' + "1234").toString('base64');
console.log(token);
var buf = new Buffer(token, 'base64');
var plain_auth = buf.toString();       

console.log(plain_auth);
