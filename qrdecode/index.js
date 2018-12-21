var fs = require('fs');
var formidable = require('formidable');

var http = require("http");

var qrdir = "./qrdecode/";
var tmpdir = qrdir+"tmp";

exports.parse = function (req, res) {
	console.log(req.url);

	if (req.url.search("/qr/url") == 0 ) {
		var hturl = req.url.substring(8);
		var file = fs.createWriteStream(tmpdir+"/upload_ADSSVCX");

		http.get(hturl, function(gres){
			if (gres.statusCode !== 200) {jwarn('err','get err!');return;}
			gres.pipe(file);
			gres.on('end',function() { jwarn('ok','upload_ADSSVCX'); });
		});
	// qr/upload_ || qr/img.png: search(/(qr\/)(upload_(.)*|(\w)+\.(jpg|png)$)/)
	} else if (req.url.search(/(qr\/)(upload_(.)*|(\w)+\.(jpg|png)$)/) == 1 ) {
		// var tmpdir = "C:\\Documents and Settings\\install\\Local Settings\\Temp";
		fs.readFile(tmpdir+req.url.substring(3), function (err, data) {
			if (err) {warn("Not Found!");return;}
		    res.writeHead(200, {'Content-Type': 'image/jpg'});
		    res.write(data);

        	fs.unlink(tmpdir+req.url.substring(3),function(err) {
	    		if (err) {console.log("Unlink E!");}
			    res.end();
	    	});

		});
	} else if (req.url == "/qr/decode") {// qr/decode
		// Check File!
		fs.stat(tmpdir,function(err,stats) {
			if (err) {
				fs.mkdir(tmpdir,function () { upfile(); });
			} else { upfile(); }
		});

	} else if (req.url.search(/(jquery-3.3.1.min.js)$/) >= 0 ) {// qr jquery
		fs.readFile(qrdir+'jquery-3.3.1.min.js', function (err, data) {
			if (err) {warn("Not Found!");return;}
		    res.writeHead(200, {'Content-Type':"application/javascript; charset=utf-8"});
		    res.write(data);
		    res.end();
		});
	} else {// qr/home
		fs.readFile(qrdir+'jsq.html', function (err, data) {
			if (err) {warn("Not Found!");return;}
		    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
		    res.write(data);
		    res.end();
		});
	}

	function upfile() {
		var form=new formidable.IncomingForm();
		form.uploadDir = tmpdir;
		form.parse(req, function (err, fields, files) {
			if (err || files.fileqr==undefined) {jwarn('error',"parse || upload failed!"); return;}
			console.log("file path::::"+files.fileqr.path);
			var opath=files.fileqr.path.substring(13);
			jwarn('ok',opath);
		});
	}
	function warn(s) {
	    res.writeHead(200, {'Content-Type': 'text/html'});
	    res.write("<h1>Warning : "+s+"</h1>");
	    res.end();
	}
	function jwarn(s,p) {
	    res.writeHead(200, {'Content-Type': 'text/json; charset=utf-8'});
	    res.write(JSON.stringify({status:s, txt:p}));
	    res.end();
	}
};
