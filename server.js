var express         = require('express'),
    app             = express(),
    http            = require('http'),
    bodyParser      = require('body-parser'),
    mongoose        = require('mongoose'),
    env             = process.env.NODE_ENV || 'development',
    APP_CONFIG      = require('./config')[env],
    dbURI           = APP_CONFIG.MONGODB_URL,
    db              = mongoose.connection,
    port            = process.env.PORT || 3000;

// MongoDB connection configurations========================================
mongoose.connect(dbURI, {server:{auto_reconnect:true}});

// mongoose listeners added
db.once('connected', function(){
    console.log('Db connected');
});

db.on('error', function(err){
    console.log('Error while DB connect: ', err);
});

db.on('disconnected', function(){
    console.log('DB disconnected. Reconnecting...')
    mongoose.connect(dbURI, {server:{auto_reconnect:true}});
});

db.on('reconnected', function(){
    console.log('Reconnected DB successfully.');
});

//Bootstrap Models===========================================================
require('./api/models/user.js');

//middlewares================================================================
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

//Handling Demo request from client
app.get('/', function(req, res){
    res.sendFile(__dirname+'/index.html');
});

require('./config/routes')(app);

// Creating server to listen on port specified=================================
http.createServer(app).listen(port, function(done){
    console.log('Created server: '+ port);
});
