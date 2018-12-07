var db = [
	{access_token: "aaaaa-asdsa-asdsa-asdsa",type:"bearer"},
	{access_token: "bbbbb-asdsa-asdsa-asdsa",type:"bearer"},
	{access_token: "ccccc-asdsa-asdsa-asdsa",type:"bearer"},
	{access_token: "ddddd-asdsa-asdsa-asdsa",type:"bearer"},
];

exports.parse = function (auth) {
	var res = {status: "notExist",statusText:"Token not exist"}
	var type=auth.toLowerCase().split(" ")[0];
	var tok=auth.toLowerCase().split(" ")[1];
	for (var i=0; i < db.length; i++) {
		if (db[i].access_token===tok && db[i].type===type) {
			res = {status: "success",statusText:"Logged out"};
			break;
		};
	};
	return res;
};
