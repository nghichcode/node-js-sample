var dba = [
	{access_token: "aaaaa-asdsa-asdsa-asdsa",type:"bearer"},
	{access_token: "bbbbb-asdsa-asdsa-asdsa",type:"bearer"},
	{access_token: "ccccc-asdsa-asdsa-asdsa",type:"bearer"},
	{access_token: "ddddd-asdsa-asdsa-asdsa",type:"bearer"},
];

var dbp = [
	{whCode: "WHA",customerCode: "DIA",pickingNo: "AASDPSADPSAP1341"},
	{whCode: "WHB",customerCode: "DIB",pickingNo: "BASDPSADPSAP1341"},
	{whCode: "WHC",customerCode: "DIC",pickingNo: "CASDPSADPSAP1341"},
	{whCode: "WHD",customerCode: "DID",pickingNo: "DASDPSADPSAP1341"}
];


exports.parse = function (auth, params) {
	var res = {status: 401,statusText:"Token not exist"};
	var type=auth.toLowerCase().split(" ")[0];
	var tok=auth.toLowerCase().split(" ")[1];
	var cToken = false, cPickingNo = false;
	for (var i=0; i < dba.length; i++) {
		if (dba[i].access_token===tok && dba[i].type===type) {
			res = {
				status: 400,
				message:"Picking list no "+params.pickingNo+" not exist.",
				data: null
			};
			for (var j=0; j < dbp.length; j++) {
				if (dbp[j].pickingNo===params.pickingNo) {
					res = {
						status: 200,
						message: "OK"
					}
					break;
				};
			};
			break;
		};
	};
	return res;
};
