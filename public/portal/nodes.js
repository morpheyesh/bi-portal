/**
 * Copyright 2013 IBM Corp.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/

/* 
 * This is modified by Megam Systems.
 */

//var randomWords = require('random-words');

PORTAL.nodes = function() {

	var node_defs = {};
	var nodes = [];
	var configNodes = {};
	var links = [];
	var defaultWorkspace;
	var workspaces = {};
	var obj = JSON.parse("{}");

	
	
	function registerType(def) {
		 for (var i = 0; i < def.length; i++) {    	       
            node_defs[def[i].name] = def[i];
		   // TODO: too tightly coupled into palette UI
		   PORTAL.palette.add(def[i]);
         }		
	}	
	
	function getType(name) {
		return node_defs[name];
	}

	return {
		registerType : registerType,
		getType : getType		
	};
}();
