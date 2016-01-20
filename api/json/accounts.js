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

function Accounts(options) {

	this._json = createAccountJson(options);
}

function createAccountJson(data) {
	if (data.hasOwnProperty('id')) {
		lib.mergeObjects(data, {
			id : data.id
		});
	} else {
		lib.mergeObjects(data, {
			id : ''
		});
	}
	if (data.hasOwnProperty('email')) {
		lib.mergeObjects(data, {
			email : data.email
		});
	} else {
		lib.mergeObjects(data, {
			email : ''
		});
	}
	if (data.hasOwnProperty('username')) {
		lib.mergeObjects(data, {
			first_name : data.username
		});
	} else {
		lib.mergeObjects(data, {
			first_name : ''
		});
	}
	if (data.hasOwnProperty('api_key')) {
		lib.mergeObjects(data, {
			api_key : data.api_key
		});
	} else {
		lib.mergeObjects(data, {
			api_key : ''
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
	if (data.hasOwnProperty('phone')) {
		lib.mergeObjects(data, {
			phone : data.phone
		});
	} else {
		lib.mergeObjects(data, {
			phone : ''
		});
	}
	if (data.hasOwnProperty('last_name')) {
		lib.mergeObjects(data, {
			last_name : data.last_name
		});
	} else {
		lib.mergeObjects(data, {
			last_name : ''
		});
	}
	if (data.hasOwnProperty('authority')) {
		lib.mergeObjects(data, {
			authority : data.authority
		});
	} else {
		lib.mergeObjects(data, {
			authority : ''
		});
	}
	if (data.hasOwnProperty('password_reset_key')) {
		lib.mergeObjects(data, {
			password_reset_key : data.password_reset_key
		});
	} else {
		lib.mergeObjects(data, {
			password_reset_key : ''
		});
	}
	if (data.hasOwnProperty('password_reset_sent_at')) {
		lib.mergeObjects(data, {
			password_reset_sent_at : data.password_reset_sent_at
		});
	} else {
		lib.mergeObjects(data, {
			password_reset_sent_at : ''
		});
	}
	if (data.hasOwnProperty('created_at')) {
		lib.mergeObjects(data, {
			created_at : data.created_at
		});
	} else {
		lib.mergeObjects(data, {
			created_at : ''
		});
	}
	return data;
}

Accounts.prototype.toJson = function() {
	return this._json;
};

module.exports = Accounts;
