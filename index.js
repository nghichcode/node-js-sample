var http = require('http');
var url= require('url');
var querystring = require('querystring');

var login = require('./login');
var logout = require('./logout');
var picking = require('./picking');
var err = false;

http.createServer(function (req, res) {

	// POST data
    if(req.method === "POST") {
    	var body = '';
        req.on('data', function(chunk) {body += chunk.toString();});
        req.on('end', function() {response(querystring.parse(body));});
    } else {err = true;}

    function response(params) {
    	var resContent = {};
    	var urlParams = url.parse(req.url, true);

		res.writeHead(200,{'Content-Type':'text/json'});
		var correctToken =  params.username && params.password && params.client_id && params.client_secret && params.grant_type;
		var correctRevoke =  req.headers['authorization'];
		var correctPicking = req.headers['authorization'] && params.whCode && params.customerCode && params.pickingNo;

		if (urlParams.pathname == "/oauth/token") {
			resContent = login.parse(params);
		} else if (urlParams.pathname == "/oauth/revoke" && correctRevoke) {
			resContent = logout.parse(req.headers['authorization']);
		} else if (urlParams.pathname == "/api/picking/sacnSerial.json" && correctPicking) {
			resContent = picking.parse(req.headers['authorization'], params);
		} else {
			resContent = {status: "wrongParams",statusText:"Wrong Parameters"};
		};
		res.write(JSON.stringify(resContent));
		res.end();
    }

    if (err) {
		res.writeHead(200,{'Content-Type':'text/json'});
		res.end("Err");
    };

}).listen(process.env.PORT || 5000);
// console.log(body);
