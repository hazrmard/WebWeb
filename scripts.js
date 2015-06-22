$(document).ready(function(){
	console.log("Script loaded.");
	loadElements();
	$("#button-div").on("click", go);
});

function loadElements(){
	console.log("Element loader function called.");
	$("#container-div").hide(0).fadeIn(1000);
};

function go(){
	console.log("Go function called.");
	$("#container-div").css("top", "15%");
};