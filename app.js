// Module dependencies.
var express = require('express')
  , http = require('http')
  , cons = require('consolidate');

var app = express();

var conf = (require('path').existsSync( './dev_conf.js' ) && require('./dev_conf').conf) || 
           { "port":(process.env.PORT || 8008), "base":"" };

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
  app.use(express.session({ secret: 'very_unique_secret_string',
        cookie: { maxAge: 1800000 }}));
  app.use(app.router);
});

app.get('/', function( req, res ){
	res.render( 'index', {
		title:'Welcome to wasulahewa.com'
	})
})

module.exports = app