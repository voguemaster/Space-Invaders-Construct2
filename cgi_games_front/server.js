const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const querystring = require('querystring');
const uuid = require('uuid');
const serverApp = express();

// our port
const serverPort = 8000;

// parsing of body and cookies, must be before we validate cookies in any following middlewares
serverApp.use(bodyParser.urlencoded({ extended: false }));
serverApp.use(bodyParser.json());

// not interested in favorite icon
serverApp.route('/favicon.ico').get((req, res) => {
	sendNotFound(res);
});

// static files for our client
serverApp.use(express.static("public"));

// catch all routes except login and validate credentials. If valid - go next. if not valid, redirect to login
serverApp.get('*', function(req, res, next) {  
    // redirect to games.html page
    res.redirect("/games.html");
});

// start listening for incoming connections (IPv4 only)
serverApp.listen(serverPort, "0.0.0.0", () => {
    // server started
    console.log('server started');
});

////////////////////////////
// send methods

// send 404 not found
function sendNotFound(res) {
    res.type("html");
    res.statusCode = 404;
    setPoweredByHeader(res);
    res.send("<h1>Not Found</h1><br/>");
}

// send 403 unauthorized error
function sendUnauthorized(res) {
    res.type("html");
    res.statusCode = 403;
    setPoweredByHeader(res);
    res.send("<h1>Unauthorized!</h1><br/>");
}

function sendBadRequest(res) {
    res.type("html");
    res.statusCode = 400;
    setPoweredByHeader(res);
    res.send("<h1>Bad Request</h1><br/>");
}

function setPoweredByHeader(res) {
    res.setHeader('X-Powered-By', ['Infinity Stones']);
}

function setAccessAllowAllOrigins(res) {
    res.setHeader('Access-Control-Allow-Origin', ['*']);
}