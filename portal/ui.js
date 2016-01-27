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
var session = require('express-session');
var util = require('util');
var app = express();
var bodyParser = require('body-parser');
var events = require("./events");
var connectors = require("./connectors/connector")
var Accounts = require("./../lib/megam/core/accounts.js");
var lib = require("./lib.js");
var path = require("path");
var flash = require('connect-flash');
var icon_paths = [path.resolve(__dirname + '/../public/icons')];
var htmlToPdf = require('html-to-pdf');



var growl = require('growl')

function setupUI(settings) {

  var iconCache = {};
  var defaultIcon = path.resolve(__dirname + '/../public/icons/arrow-in.png');
  //app.use("/", express.static(__dirname + '/../public'));

  app.use(bodyParser.json());

  app.use(bodyParser.urlencoded({
    extended: true
  }));

  app.use(session({
    secret: 'MEGAMMEGLYTICS'
  }));

  app.use(express.static(path.join(__dirname, '/../public')));
  app.set('views', __dirname + '/../views');
  app.engine('html', require('ejs').renderFile);

  app.use(flash());

  app.get("/", function(req, res) {
    util.log('[portal] Loading index page ');
    if (req.session.password) {
      res.redirect("/mconnect");
    } else {
      res.render('index.html', {
        message: req.flash('message')
      });
    }
    //growl('Open a URL', { url: 'https://npmjs.org/package/growl' });
  });

  app.post("/signup", function(req, res) {
    var json = req.body;
    var acc = new Accounts(json.email, json.password);
    util.log('[portal] User sigunup with this email > ' + json.email);
    acc.create(json).then(function(result) {
      util.log('[portal] User onboard successfully');
      req.session.email = json.email;
      req.session.password = json.password;
      //growl('Open a URL', { url: 'https://npmjs.org/package/growl' });
      res.redirect("/mconnect");
    }).otherwise(function(err) {
      util.log('[portal] Error occured > ' + err);
      req.flash('message', err)
      res.redirect("/");
    });
  });

  app.post("/workbench", function(req, res) {
    console.log("+++++++++++++WB+++++++++++++");
    	var json = req.body;
    	 console.log(json);
			var acc = new Workbench(json.email, json.password);
	    util.log('[portal] User sigunup with this email > ' + json.email);
	    acc.create(json).then(function(result) {
	      util.log('[portal] User onboard successfully');
	      req.session.email = json.email;
	      req.session.password = json.password;
	      //growl('Open a URL', { url: 'https://npmjs.org/package/growl' });
	      res.redirect("/mconnect");
	    }).otherwise(function(err) {
	      util.log('[portal] Error occured > ' + err);
	      req.flash('message', err)
	      res.redirect("/");
	    });
    });
/*

   var obj = {
      "data": [
        ["Year", "2015", "2011", "2055"],
        ["Product", 11, 55, 88] , ["Popularity", 899, 100, 858]
      ]
    };


		var obj = {
		      "data": [
		        ["Product", "Car", "Fan", "Book"],
		        ["Cost", 11, 55, 88]
		      ]
		    };

				var obj = {
				      "data": [
				        ["Country", "Germany", "United States", "Brazil", "RU"],
				        ["Deals", 400, 300, 150, 500]
				      ]
				    };
    var arr = [];
    for (elem in obj['data']) {
      arr.push(obj['data'][elem]);
    }
    res.send(arr) */
  });

  app.get("/mconnect", function(req, res) {
    if (req.session.password) {
      res.render('mconnect.html');
    } else {
      res.redirect('/');
    }
  });

  app.get("/report", function(req, res) {

    htmlToPdf.convertHTMLFile('views/bizviz.html', 'views/report.pdf',
      function(error, success) {
        if (error) {
          console.log('Oh noes! Errorz!');
          console.log(error);
        } else {
          console.log('Woot! Success!');
          console.log(success);
        }
      }
    );

  });

  app.get("/bizviz", function(req, res) {
    if (req.session.password) {
      res.render('bizviz.html');
    } else {
      res.redirect('/');
    }
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
