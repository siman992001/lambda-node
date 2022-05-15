// var h = require('./secrets_getsecretvalue.js');
// h.handler()
var h = require('./http.js')
h.handler().then((data) => {console.log(data)})