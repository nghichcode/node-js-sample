var http = require('http');
var url= require('url');
var fs = require('fs');

http.createServer(function (req, res) {
	if (req.url.search(/(\w)+\.(jpg|png)$/) == 1 ) {
		fs.readFile('./'+req.url.substring(1), function (err, data) {
			if (err) {warn("Not Found 1!");return;}
		    res.writeHead(200, {'Content-Type': 'image/jpg'});
		    res.write(data);
		    res.end();
		});
	} else if (req.url.search(/(\w)+\.(js|jsx)$/) == 1 || req.url.search(/(\w)+\/(\w)+\.(js|jsx)$/) == 1 ) {
		fs.readFile('./'+req.url.substring(1), function (err, data) {
			if (err) {warn("Not Found 2!");return;}
		    res.writeHead(200, req.url.search("jsx")>=0
		    	? {}
		    	: {'Content-Type':"application/javascript; charset=utf-8"} );
		    res.write(data);
		    res.end();
		});
	} else if (req.url.search(".html") >= 0) {
		fs.readFile('./'+req.url.substring(1), function (err, data) {
			if (err) {warn("Not Found 4!");return;}
			res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
		    res.write(data);
		    res.end();
		});
	} else {
		fs.readFile('./index.html', function (err, data) {
			if (err) {warn("Not Found 3!");return;}
		    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
		    res.write(data);
		    res.end();
		    // {'Content-Type':"application/javascript; charset=utf-8"}
		    // {'Content-Type': 'text/html; charset=utf-8'}
		    // {'Content-Type': 'image/jpg'}
		});
	}

    function warn(txt) {
		res.writeHead(200,{'Content-Type':'text/json; charset=utf-8'});
		res.write(JSON.stringify({txt:txt}));
		res.end();
	}
}).listen(process.env.PORT || 5000);
