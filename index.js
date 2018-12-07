var http = require('http');
var url= require('url');
var querystring = require('querystring');

var login = require('./login');
var logout = require('./logout');
var picking = require('./picking');

http.createServer(function (req, res) {

	// POST data
	const FORM_URLENCODED = 'application/x-www-form-urlencoded';

    if(req.headers['content-type'] && req.headers['content-type'] === FORM_URLENCODED && req.method === "POST") {
    	var body = '';
        req.on('data', function(chunk) {body += chunk.toString();});
        req.on('end', function() {response(querystring.parse(body));});
    } else {
		res.writeHead(200,{'Content-Type':'text/json'});
		res.write('{"status": "wrongHeads","statusText":"Wrong Headers"}');
		res.end();
    }

    function response(params) {
    	var resContent = {};
    	var urlParams = url.parse(req.url, true);

		res.writeHead(200,{'Content-Type':'text/json'});
		var correctToken =  params.username && params.password || params.client_id || params.client_secret || params.grant_type;
		if (!req.headers['authorization']) {return;};
		var correctRevoke =  req.headers['authorization'];
		var correctPicking = req.headers['authorization'] && params.whCode && params.customerCode && params.pickingNo;

		console.log(urlParams.pathname);
		console.log(correctToken);
		console.log(params);
		if (urlParams.pathname == "/oauth/token" && correctToken) {
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

}).listen(process.env.PORT || 5000);
// console.log(body);
