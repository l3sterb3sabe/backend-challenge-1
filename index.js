var express = require('express');
var request = require('request');
var urlExists = require('url-exists');
var get_profile = require('./get_profile');
 

var app = express();
var profile = {};

var data = {'name' : 'Lester', 'age' : '21'};

//skip the calling of favicon.ico
app.get('/favicon.ico', function(req, res){
	res.sendStatus(204);
});

//route for returning scrape data
app.get('/user_profile/:username', function(req, res){
	var username = req.params.username;
	var url = 'https://twitter.com/' + username;

	//Check if the username is valid
	urlExists(url, function(err, exists) {
  		if(exists){
  			get_profile.get_profile_once(url, username);
  			res.send("Success");
  		}
  		else{
  			res.status(404).send('Not found');
  		}
	});

	
});

//route for returning scrape data every 2 mins
app.get('/user_profile_continue/:username', function(req, res){
	var username = req.params.username;
	var url = 'https://twitter.com/' + username;
	const mins = 2 * 60 * 1000;
	 setInterval(function() {
	     profile = get_profile.get_profile_once(url, username);
	     console.log(profile);
	     res.send("Success");
	   }, mins);
});



app.listen(process.env.PORT || 3000);
console.log('Listening to port 3000');