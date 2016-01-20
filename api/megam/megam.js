/*
** Copyright [2012-2013] [Megam Systems]
**
** Licensed under the Apache License, Version 2.0 (the "License");
** you may not use this file except in compliance with the License.
** You may obtain a copy of the License at
**
** http://www.apache.org/licenses/LICENSE-2.0
**
** Unless required by applicable law or agreed to in writing, software
** distributed under the License is distributed on an "AS IS" BASIS,
** WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
** See the License for the specific language governing permissions and
** limitations under the License.
*/

// We need this to build our post string
var http = require('http');
var request = require('request');
var fs = require('fs');
var when = require('when');
var crypto = require('crypto');
var time = require('time');
var mixin = require("./../json/mixins.js");


var now = new time.Date();
var version = "/v2";
var result = {};
var post_result = {};
//var host = 'https://api.megam.io';
var host = 'http://localhost:9000';
var email = "";
var password = "";
var url = "";
var path = "";
var headers = {};

var X_Megam_EMAIL = "X-Megam-EMAIL",
	X_Megam_APIKEY = "X-Megam-APIKEY",
	X_Megam_DATE = "X-Megam-DATE",
	X_Megam_PUTTUSAVI = "X-Megam-PUTTUSAVI",
	Content_Type = "Content-Type",
	application_json = "application/json",
	Accept = "Accept",
	application_vnd_megam_json = "application/vnd.megam+json";
	
var _email = "",
	_password = "",
	_url = "",
	_mixin = "",
	_

function MEGAM(options) {
	this._email = options.email.length > 1 ? options.email : "";
    this._password = options.password.length > 1 ? options.password : "";
	this._url = options.url;
	this._body = JSON.stringify(options);	
}

/*setBody = function(options, type) {
	mixin.init(options, type);
	this._body = mixin.toJson();	
};

setHeaders = function(options) {
	this._path = version + this._url;

	var hmac = generateHMAC(this._body, this._path, this._password);
	
	this._headers = {
				X_Megam_DATE : now.toString(),
				X_Megam_EMAIL : this._email,
				X_Megam_PUTTUSAVI : this._password,
				X_Megam_HMAC : this._email + ":" + hmac,
				Accept : application_vnd_megam_json,
				Content_Type : application_json
			};	
};*/

MEGAM.prototype.post = function() {
		var defer = when.defer();
		var path = version + this._url;

		var hmac = generateHMAC(this._body, path, this._password);
		// An object of options to indicate where to post to
		// Configure the request
		var options = {
			url : host + path,
			method : 'POST',
			headers : {
				'X-Megam-DATE' : now.toString(),
				'X-Megam-EMAIL' : this._email,
				'X-Megam-PUTTUSAVI' : this._password,
				'X-Megam-HMAC' : this._email + ":" + hmac,
				'Accept' : 'application/vnd.megam+json',
				'Content-Type' : 'application/json'
			},
			form : this._body
		};
		// An object of options to indicate where to post to
		// Configure the request
		var options = {
			url : host + path,
			method : 'POST',
			headers : this._headers,
			form : this._body
		};
		// Start the request
		request(options, function(error, response, body) {
			post_result = body;
			console.log("---------------------");
			console.log(body);
			console.log(error);
			console.log(response)
			defer.resolve();
		});
		return defer.promise;
};

function createSign(data, path) {
	var mkSign = now.toString() + "\n" + path + "\n" + calculateMD5(data);
	console.log(mkSign);
	return mkSign;
}

function calculateMD5(data) {
	console.log(typeof data);
	console.log(data);
	md5 = crypto.createHash("md5", "MD5").update(data).digest( encoding = 'base64');
	console.log(md5);
	return md5;
}

function generateHMAC(body, path, password) {
	var algorithm = 'sha1';
	var hash, hmac;	
	hmac = crypto.createHmac(algorithm, password).update(createSign(body, path)).digest("hex");
	console.log(hmac);
	return hmac;
}


module.exports = MEGAM;


