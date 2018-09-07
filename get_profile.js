var cheerio = require('cheerio');
var request = require('request');

	var get_profile_once = function(url, username){
						request(url, function(err, res, body){
							if(err){
								console.log(err);
							}
							if(!err && res.statusCode == 200){
								var $ = cheerio.load(body);
								var following = $('span.ProfileNav-value', '[data-nav=following]');
								var followers = $('span.ProfileNav-value', '[data-nav=followers]');
								var name = $('a.ProfileHeaderCard-nameLink', 'h1.ProfileHeaderCard-name');
								var image_url = $('img.ProfileAvatar-image');
								var profile = {
									'username' : username,
									'fullName' : name.text(),
									'imgUrl' : image_url.attr('src'),
									'followers' : followers.attr('data-count'),
									'following' : following.attr('data-count')
									};
								console.log(profile);
								
							}

						});
						
	};

	module.exports.get_profile_once = get_profile_once;

