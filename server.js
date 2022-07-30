var application_root = __dirname;
var express = require("express");
var path = require("path");
var mongojs = require('mongojs');
var session = require('express-session');
var app = express();
var databaseUrl = "mongodb://localhost:27017/server1";
var collections = ["things"];
var db = mongojs(databaseUrl, collections);
//var Kekule = require('kekule').Kekule;


app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

app.configure(function() {
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(application_root, "public")));
  app.use(express.errorHandler({
    dumpExceptions: true,
    showStack: true
  }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static(path.join(__dirname, 'static')));
  });



app.get('/api', function(req, res) {
  res.send('Our Sample API is up...');
});

app.get('/getcontent', function(req, res) {
  res.header("Access-Control-Allow-Origin", "http://localhost");
  res.header("Access-Control-Allow-Methods", "GET, POST");
  db.things.find('', function(err, data) {
    if (err || !data) console.log("No molecules found");
    else {
      res.writeHead(200, {
        'Content-Type': 'application/json'
      });
      str = '[';
      data.forEach(function(ent1) {
        str = str + '{ "name" : "' + ent1.username + '",'+'"ID" : "' + ent1._id + '",'+'"structure" : "'+ent1.password + '"},' + '\n';
      });
      str = str.trim();
      str = str.substring(0, str.length - 1);
      str = str + ']';
      res.end(str);
    }
  });
});

// app.post('/insertmolecule', function(req, res) {
//   console.log("POST: ");
//   res.header("Access-Control-Allow-Origin", "http://localhost");
//   res.header("Access-Control-Allow-Methods", "GET, POST");
//   res.writeHead(200, {'Content-Type': 'text/plain'});
//   user = req.body.username;
//   passwd = req.body.password;
//   emailid = req.body.email;
//   console.log(req.body);
//   console.log(req.body.mydata);
//   var jsonData = JSON.parse(req.body.mydata);
//   console.log(jsonData.username);
//   console.log(jsonData.password);
//   console.log(jsonData.email);
//
//   db.things.save({
//     email: jsonData.email,
//     password: jsonData.password,
//     username: jsonData.username
//   }, function(err, saved) {
//     if (err || !saved) res.end("User not saved");
//     else res.end("User saved");
//   });
// });



app.listen(1212);
