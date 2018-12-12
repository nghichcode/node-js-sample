var http = require('http');
var url= require('url');
var querystring = require('querystring');

var login = require('./login');
var logout = require('./logout');
var picking = require('./picking');
// var config = require('./config');

http.createServer(function (req, res) {
	// POST data Content-Type: application/x-www-form-urlencoded; charset=utf-8
	const URLE = "application/x-www-form-urlencoded";

	var body = '';
    req.on('data', function(chunk) {body += chunk.toString();});
    req.on('end', function() {
		if (req.headers['content-type'] && req.headers['content-type'].search(URLE)>-1 && req.method === "POST" && body!="" ) {
    		response(querystring.parse(body));
    	} else alert("Error","Not POST || Body empty || Wrong Content-Type!");
    });

    function response(params) {
    	var resContent = {};
    	var urlParams = url.parse(req.url, true);

		res.writeHead(200,{'Content-Type':'text/json'});
		var correctToken =  params.username && params.password || params.client_id || params.client_secret || params.grant_type;
		var correctRevoke =  req.headers['authorization'];
		var correctPicking = req.headers['authorization'] && params.whCode && params.customerCode && params.pickingNo;

		if (urlParams.pathname == "/oauth/token" && correctToken) {console.log("InP");
			resContent = login.parse(params);
		} else if (urlParams.pathname == "/oauth/revoke" && correctRevoke) {
			resContent = logout.parse(req.headers['authorization']);
		} else if (urlParams.pathname == "/api/picking/sacnSerial.json" && correctPicking) {
			resContent = picking.parse(req.headers['authorization'], params);
		} else if (urlParams.pathname == "/config") {
			// resContent = config.getTime();
			resContent = {status: "Error",statusText:"config"};
		} else {
			resContent = {status: "Error",statusText:"Wrong Parameters || Path"};
		};
		res.write(JSON.stringify(resContent));
		res.end();
    }

    function alert(stat, txt) {
		res.writeHead(200,{'Content-Type':'text/json'});
		res.write('{"status": "'+stat+'","statusText": "'+txt+'"}');
		res.end();
	}

}).listen(process.env.PORT || 5000);
// console.log(body);
