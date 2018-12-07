var db = [
	{ uid: 1, ucode:"NV1311", user_name: "aaa", permission: 1, permissionText:"Quan Ly Kho", password: "pass"},
	{ uid: 2, ucode:"NV1312", user_name: "aab", permission: 2, permissionText:"Quyen Nhap Kho", password: "pass"},
	{ uid: 3, ucode:"NV1313", user_name: "aac", permission: 3, permissionText:"Quyen Xuat Kho", password: "pass"},
	{ uid: 4, ucode:"NV1314", user_name: "aad", permission: 1, permissionText:"Quan Ly Kho", password: "pass"},
	{ uid: 5, ucode:"NV1315", user_name: "aae", permission: 2, permissionText:"Quyen Nhap Kho", password: "pass"},
	{ uid: 6, ucode:"NV1316", user_name: "aba", permission: 3, permissionText:"Quyen Xuat Kho", password: "pass"},
	{ uid: 7, ucode:"NV1317", user_name: "abb", permission: 1, permissionText:"Quan Ly Kho", password: "pass"},
	{ uid: 8, ucode:"NV1318", user_name: "abd", permission: 2, permissionText:"Quyen Nhap Kho", password: "pass"},
	{ uid: 9, ucode:"NV1319", user_name: "abe", permission: 3, permissionText:"Quyen Xuat Kho", password: "pass"}
];

var response = {
	access_token: "asdsa-asdsa-asdsa-asdsa",
	token_type: "bearer",
	refresh_token: "zxczc-zxczc-zxczc-zxczc",
	expires_in: 7199,
	scope: "read,write,trust",
	full_name: "Nguy Dien Ba Vuong",
	max_quantity: 999999
};

// var correctToken =  params.username && params.password && params.client_id && params.client_secret && params.grant_type;

exports.parse = function (params) {
	var res = {status: "notExist",statusText:"Account not exist"}
	for (var i=0; i < db.length; i++) {
		if (db[i].user_name===params.username) {
			res = {status: "wrongPass 88",statusText:"Wrong password 77"};
			if (db[i].password===params.password) {
				res = response;
			}
			break;
		};
	};
	return res;
};
