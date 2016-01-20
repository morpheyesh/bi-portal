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

var MEGAM = require("./megam/megam.js");
var _api = '';
var _connectorname = '';
var _data = "";

var api = module.exports = {
	init : function(options) {
		console.log(options);
		switch(options.api) {
		case "megam":
		    _api = new MEGAM(options);
			break;
		default:
			break;

		}
	},	
	
	
	post : function() {
		return _api.post();
	},
	
	
}; 