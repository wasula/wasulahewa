// Module dependencies.
var express = require('express')
  , http = require('http')
  , cons = require('consolidate')
  , routes = require('./routes');

var app = express();

var conf = { "port":"", "base":"" };

// assign dust engine to .dust files
app.engine('dust', cons.dust);

app.configure(function(){
  app.set('view engine', 'dust');
  app.set('views', __dirname + '/views');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.static(__dirname + '/public', {redirect: false}));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session({
    secret: "my awesome secret",
    cookie: { maxAge: 24*60*60*1000 }
  }));
  
  app.use(app.router);
});

// Routes
app.get('/', routes.index);


//http.createServer(app).listen(10000, '127.0.0.1');
//http.createServer(app).listen(10000, '0.0.0.0');
var conf = { "port":(process.env.PORT || 10000), "base":"" };
http.createServer(app).listen(conf.port);
console.log("Express server listening on port 127.0.0.1:10000");

module.exports = app;