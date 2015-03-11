'use strict';

var _ = require('lodash');
var app = require('express')();
var fs = require('fs');
var request = require('request');

// Dummy data which are the kind credentials provided to you by BARC.
// Replace them with your credentials.
var clientId = 'alphadraft-335c1d61c9fcf364196b594c48751167';
var clientSecret = '05e394410819be40cd434a48d50c3d6f5bff9d90197a5dc2e043a32f0457e451';
var dedicatedHost = 'alphadraft.barc.com';

// The template for the page to be rendered. See <%= %> tokens in index.html.
var indexPage = fs.readFileSync('index.html', 'utf8');
var compiled = _.template(indexPage);

// The login of the user whom you want to sign into chat.
var login = 'supermario';

// The handler for the home page
function renderHomePage(req, res) {

  // Build the server to server request to Barc.
  var options = {
    url: 'https://' + dedicatedHost + '/__api/sso/login',
    // query string
    qs: {clientId: clientId, clientSecret: clientSecret, login: login}
  };

  request.get(options, function(err, response, bod) {
    if (err || response.statusCode !== 200) {
      return res.send(403, 'could not get token');
    }

    // Barc returns a JSON payload like this { 'token': 'BACF1230' }
    var body = JSON.parse(bod);

    // Set the token in your template engine and render the page
    res.type('text/html');
    res.send(compiled({dedicatedHost: dedicatedHost, token: body.token}));
  });
}

app.get('/', renderHomePage);

// Run the server and provide curl example
app.listen(3100);
console.log('Listening on :3100');
console.log('Or, try curl:\n');
console.log('curl -H "Host: alphadraft.com" "https://alphadraft.barc.com/__api/sso/login?clientId=' + clientId + '&clientSecret=' + clientSecret + '&login=' + login + '"\n');
