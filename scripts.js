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
	var $placeholder = $("<div></div>");
	var contentURI= $text.val();
	console.log("URI is: " + contentURI);
	console.log(jQuery.get(contentURI));	
};
	