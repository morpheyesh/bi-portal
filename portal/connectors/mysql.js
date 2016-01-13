var mysql = require('mysql');
var when = require("when");
var _connection;
var _result = [];

function MySQL(options) {
	this._dbname = options.dbname;
	this._host = options.host;
	this._username = options.username;
	this._password = options.password;
}

MySQL.prototype.getDBName = function() {
	return this._dbname;
};

MySQL.prototype.getHost = function() {
	return this._host;
};

MySQL.prototype.getUserName = function() {
	return this._username;
};

MySQL.prototype.getPassword = function() {
	return this._password;
};

MySQL.prototype.getResult = function() {
	return _result;
};


MySQL.prototype.getConnection = function() {

	_connection = mysql.createConnection({
		host : this._host,
		user : this._username,
		password : this._password,
		database : this._dbname
	});
};

MySQL.prototype.getData = function() {
	var cs_defer = when.defer();
	_connection.query('SHOW tables', function(err, tablesresult) {
		for(var i in tablesresult){
			_connection.query('SHOW COLUMNS FROM ' + tablesresult[i].Tables_in_retail, function(err, columnsresult) {
				var columns = [];
				for(var j in columnsresult){
					columns.push(columnsresult[j].Field);
				};	
				_result.push({name: tablesresult[i].Tables_in_retail, columns});
			});
			if(parseInt(i)+1 == tablesresult.length){
				console.log(tablesresult.length);
				console.log("=============================");
				cs_defer.resolve();
			}
		};
	});
  return cs_defer.promise;
};

module.exports = MySQL;
