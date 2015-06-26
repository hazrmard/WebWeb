$(document).ready(function(){
	console.log("Script loaded.");
	createVariables();
	loadElements();
	$button.on("click", go);
	$text.on("keypress", function(event){enterAndGo(event);});
});

function loadElements(){
	console.log("Element loader function called.");
	$container.hide(0).fadeIn(1000);
	$text.focus();
};

function go(){
	console.log("Go function called.");
	extractLinks($text.val());
};

function createVariables(){
	$button = $("#button-div");
	$container = $("#container-div")
	$text = $("input[type='text']");
};

function enterAndGo(event){
	console.log("enterAndGo called with key code: " + event.which)
	if (event.which==13) {
		event.preventDefault();
		console.log("Enter key registered.")
		go();
	};
};

function extractLinks(url){
	var url = $text.val();
	var query = "https://query.yahooapis.com/v1/public/yql?q=" + encodeURIComponent("select * from html where url='" + url) + "%27%20and%20xpath%3D%27%2F%2Fa%27&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys" ;
	console.log("URL is: " + url);
	console.log("query is: " + query);
	$.getJSON(query, function(data) {
		try {
			console.log("Query made.");
			console.log(data.query.results.a);
			slideText();
		}
		catch(err) {
			bounceText();
		}
		
		
	})
	.fail(function() {
		bounceText();
	});	
};

function bounceText() {
	console.log("bounceTest called");
	$text.effect("bounce", {times: 3}, 300);
}

function slideText() {
	console.log("slideText called");
	$container.css({top:"5%", transform: "translateY(-50%)", transform: "translateX(-50%)"});
}
	