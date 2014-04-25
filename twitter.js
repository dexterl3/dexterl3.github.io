// twitter.js
// JavaScript skeleton file for Lab 10: Mobile Twitter
// INFO 343, Autumn 2012
//  Dexter Lesaca III, Fall 2012

// Make all ajax requests on the page call ajaxError in case of error.
$.ajaxSetup({ error: ajaxError });

// Capture the submit event on the search form.
$(document).ready(function() {
	var list = [];
	$('#search-form').submit(search);
	
});

// Call pageChange when currently-displayed internal "page" is about to be changed.
//$(document).bind("pagebeforechange", pageChange);


// A search term was entered into the search box.
function search(event) {
	// Prevent the browser from submitting the form.
	event.preventDefault();
	event.stopPropagation();
	
	fetchClick();

}

// When the subpage is about to be changed, determine which page is about to be
// shown so that loading/cleanup of #show-timeline can be performed.
function pageChange(event, data) {
	// console.log(data);
	if (typeof data.toPage === "string") {
		var to = $.mobile.path.parseUrl(data.toPage);
		var timeline = /^#show-timeline/;
		var search = /^(#search-page|)$/;
		
		if (to.hash.search(search) !== -1) {
			// We're moving back to the search page. Clear out the profile info
			// on #show-timeline.f
			clearProfile();
		} else if (to.hash.search(timeline) !== -1) {
			// We're going to show the timeline. Fetch and inject the profile data
			// into it for the screenname specified in the ?screen_name parameter.
			
			var screenname = data.options.pageData.screen_name;
			loadProfile(screenname);
		}
	}
}


function fetchClick() {
	// Fetch tweets here.
	$.ajax('https://search.twitter.com/search.json', {
	  data: { 
	
	 q: $('#search').val() 
	  },
	dataType: 'jsonp',
	  success: injectTweets,
	  fail:ajaxError,
	});
	
}

//injects tweets
function injectTweets(data) {
  
  for (var i = 0; i < data.results.length; i++) {
	var tweet = data.results[i]; // the ith tweet in the results list
	var one = $('<li>').appendTo('#results');
	
	var link = $('<a>',{
	'href': '#show-timeline?screen_name=' + tweet.from_user,}).appendTo(one);
	
	var str = tweet.profile_image_url;
	var n=str.replace('_normal','_bigger'); 
	
	$('<img>', {
		'src': n, //tweet.profile_image_url,
		'alt': tweet.from_user,
	}).appendTo(link);
	
	
	
	var hea = $('<h3>', {
		'text': tweet.from_user_name, //+ tweet.from_user,
	}).appendTo(link);
	
	
	link.click(function(){
		
		loadProfile(tweet.from_user_name);
	});
	
	$('<small>', {'text':'@' + tweet.from_user,}).appendTo(hea);
	
   $('<p>', {'text':tweet.text,}).appendTo(link);
	
  }
  
   $('#results').listview('refresh');	
}

function temp(){
/*
 name into the h1, and their screen_name (prefixed with an @ sign) into the h2.
$("#show-timeline h1")

//	$('<small>', {'text':'@' + tweet.from_user,}).appendTo(?????);

 */
	
	loadProfile(tweet.from_user);
}


// Remove any existing profile/timeline information from #show-timeline.
function clearProfile() {	 
	$('#avatar').removeAttr('src').removeAttr('alt');
	$('#show-timeline header h1').empty();
	$('#show-timeline header h2').empty();
	$('#user_tweets strong').empty();
	$('#user_following strong').empty();
	$('#user_followers strong').empty();
	$('#user_location strong').empty();
	$('#timeline').empty();
}

// Load the profile/timeline data for the screenname specified.
function loadProfile(screenname) {
/*
	$.ajax('https://info344.ischool.uw.edu/proxy.php', {
	 data: { 
	 _service_: 'https://api.twitter.com/1/users/lookup.json', 
	 screen_name: screenname
	  },
	  success: profile, //profile
	  fail:ajaxError
	});
	*/
	alert(" before " + screenname);
	$.ajax('https://api.twitter.com/1/users/lookup.json', {
	 data: { 
	 screen_name: screenname
	  },
	  dataType:'jsonp',
	  success: profile, //profile
	  fail:ajaxError
	});
	alert(" after " + screenname);
	/*
	$.ajax('http://search.twitter.com/search.json', {
	data: { 
	 _service_: 'http://search.twitter.com/search.json',	 
	 screen_name: screenname
	  },
	  success: status, // status, like tweets
	  fail:ajaxError
	});
	
	
(The elements are exacty as on the search page, 
but without an a tag surrounding them. Note that the pieces of data for
 the user’s full name and @handle have slightly different names 
 when coming from this web service.)
	*/
	
}

function profile(data){
	alert("yay i made it");
	var tweet = data.results[0];
	alert("yay i made it" + tweet + " " + tweet.profile_image_url);
	data.results[0];
	//tweet.profile_image_url
	$("#show-timeline h1").attr('src', 'value')

	$('<small>').text('@' + tweet.from_user);

}


function status(data){
 for (var i = 0; i < data.results.length; i++) {
	var tweet = data.results[i]; // the ith tweet in the results list
	var one = $('<li>').appendTo('#results');
	
	
	var str = tweet.profile_image_url;
	var n=str.replace('_normal','_bigger'); 
	
	$('<img>', {
		'src': n, //tweet.profile_image_url,
		'alt': tweet.from_user,
	}).appendTo(one);
	
	
	
	var hea = $('<h3>', {
		'text': tweet.from_user_name, //+ tweet.from_user,
	}).appendTo(one);
	
	$('<small>', {'text':'@' + tweet.from_user,}).appendTo(hea);
	
   $('<p>', {'text':tweet.text,}).appendTo(one);
	
  }
 $('#results').listview('refresh');	


}




// Provided Ajax error handler function. (Displays useful debugging message.)
function ajaxError(jqxhr, type, error) {
	var msg = "An Ajax error occurred!\n\n";
	if (type == 'error') {
		if (jqxhr.readyState == 0) {
			// Request was never made - security block?
			msg += "Looks like the browser security-blocked the request.";
		} else {
			// Probably an HTTP error.
			msg += 'Error code: ' + jqxhr.status + "\n" + 
			       'Error text: ' + error + "\n" + 
			       'Full content of response: \n\n' + jqxhr.responseText;
		}
	} else {
		msg += 'Error type: ' + type;
		if (error != "") {
			msg += "\nError text: " + error;
		}
	}
	alert(msg);
}