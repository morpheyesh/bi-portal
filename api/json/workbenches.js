/*
 ** Copyright [2013] [Megam Systems]
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

var when = require("when");
var lib = require("./../../portal/lib.js");
var _result = [];
var _json = {};

function Workbenches(options) {

	this._json = postWorkbench(options);
}

function postWorkbench(data) {

	if (data.hasOwnProperty('email')) {
		lib.mergeObjects(data, {
			email : data.email
		});
	} else {
		lib.mergeObjects(data, {
			email : ''
		});
	}


	if (data.hasOwnProperty('password')) {
		lib.mergeObjects(data, {
			password : data.password
		});
	} else {
		lib.mergeObjects(data, {
			password : ''
		});
	}

	if (data.hasOwnProperty('query')) {
		lib.mergeObjects(data, {
			query : data.query
		});
	} else {
		lib.mergeObjects(data, {
			query : ''
		});
	}
	if (data.hasOwnProperty('workbench')) {
		lib.mergeObjects(data, {
			workbench : data.workbench
		});
	} else {
		lib.mergeObjects(data, {
			workbench : ''
		});
	}

	return data;
}

Workbenches.prototype.toJson = function() {
	return this._json;
};

module.exports = Workbenches;
