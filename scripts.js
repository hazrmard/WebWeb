$(document).ready(function(){
	console.log("Script loaded.");
	createVariables();
	loadElements();
	$button.on("click", go);
	$text.on("keypress", function(event){enterAndGo(event);});
});

function loadElements(){
	console.log("Element loader function called.");
	$tableDiv.fadeOut(0);
	$container.hide(0).fadeIn(1000);
	$text.attr("placeholder", "Enter a URL to extract links.");
	$text.focus();
};

function go(){
	console.log("Go function called.");
	$tableDiv.fadeOut(300);
	$container.css("box-shadow", "");
	$("#button-text").text("Loading");
	extractLinks($text.val());
};

function createVariables(){
	$button = $("#button-div");
	$container = $("#super-container")
	$text = $("input[type='text']");
	$tableDiv = $("#table");
	$table = $("#table table");
};

function enterAndGo(event){
	//console.log("enterAndGo called with key code: " + event.which)
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
	//console.log("query is: " + query);
	$.getJSON(query, function(data) {
		try {
			console.log("Query made.");
			console.log(data.query.results.a);
			slideText();
			populateTable(data.query.results.a);
		}
		catch(err) {
			bounceText();
			console.log(err);
		}		
	})
	.fail(function() {
		bounceText();
	});
};

function bounceText() {
	console.log("bounceText called");
	$.when($text.effect("bounce", {times: 3}, 300)).done(function() {
		$("#button-text").text("Go");
		$container.css({top:"50%", transform: "translate(-50%, -50%)"});
	});
}

function slideText() {
	console.log("slideText called");
	$container.css({top:"0%", transform: "translateX(-50%)"});
}

function populateTable(data) {
	console.log("populateTable called.");
	$container.css("box-shadow", "0px 6px 33px 0px rgba(112,194,224,1)");
	$table.empty();
	data = filterDistinct(data);
	console.log(data.length);
	$table.append("<tr><td><strong></strong></td></tr>");
	$("td strong").addClass("heading");
	var numLinks = 0;
	for (var i=0; i<data.length; i++) {
		try {
			if (data[i].substring(0,4)=="http") {
				$table.append("<tr><td><a href='" + data[i] + "'>" + data[i] + "</a></td></tr>");
				numLinks++;
			}
		}
		catch(err) {
			console.log(err.message);
		}
	}
	$(".heading").text(numLinks + " Links:");
	$.when($tableDiv.fadeIn(1000)).done(function() {
		$("#button-text").text("Go");
	});
}

function filterDistinct(data) {
	var unique = [];
	$.each(data, function(i, el) {
		if($.inArray(el.href, unique) === -1) unique.push(el.href);
	});
	return unique;
}
	