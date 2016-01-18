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

var express = require('express');
var util = require('util');
var app = express();
var bodyParser = require('body-parser');
var events = require("./events");
var connectors = require("./connectors/connector")
var path = require("path");

// TODO: nothing here uses settings... so does this need to be a function?
function setupUI(settings) {

	var iconCache = {};
	//TODO: create a default icon
	var defaultIcon = path.resolve(__dirname + '/../public/icons/arrow-in.png');
	app.use("/", express.static(__dirname + '/../public'));

	app.use(bodyParser.json());
	// for parsing application/json
	app.use(bodyParser.urlencoded({
		extended : true
	}));
	// for parsing application/x-www-form-urlencoded

	// Need to ensure the url ends with a '/' so the static serving works
	// with relative paths
	app.get("/", function(req, res) {
		req.next();
	});

	app.get("/mconnect", function(req, res) {
		res.sendFile(path.resolve(__dirname + '/../public/mconnect.html'));
	});

	app.post("/connectors", function(req, res) {		
		connectors.init(req.body);		
		connectors.getConnection().then(function(connection) {
			connectors.getData(connection).then(function(result) {				
				res.send(result);
			}).otherwise(function(err) {
				res.status(500).send(err);
			});
		}).otherwise(function(err) {			
				res.status(500).send(err);
		});	
	});

	return app;
}

module.exports = setupUI;

