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

var Accounts = require("./accounts.js");
var _mixin = '';

var api = module.exports = {
	init : function(options, type) {
		console.log(options);
		switch(type) {
		case "account":
		    _mixin = new Accounts(options);
			break;
		case "workbenches":
		    _mixin = new Workbenches(options);
		  break;
		default:
			break;

		}
	},

	toJson : function() {
		return _mixin.toJson();
	},

};
