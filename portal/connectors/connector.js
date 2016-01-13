var MYSQL = require("./mysql.js");
var _connect = '';
var _connectorname = '';
var _data = "";

var connectors = module.exports = {
	init : function(options) {
		switch(options.connector) {
		case "mysql":
		    _connect = new MYSQL(options);
			break;
		default:
			break;

		}
	},

	getConnection : function() {
		return _connect.getConnection();
	},
	
	getResult : function() {
		return _connect.getResult();
	},

	getData : function() {

		return _connect.getData();
	}
}; 