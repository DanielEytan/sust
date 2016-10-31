$(document).ready(function() {
	$("#toggle").click(function() {
		$("nav").toggleClass("visible");
	});
	$(".glossary-toggle").click(function() {
		$("#glossary").toggleClass("visible");
		$("#main-content").toggleClass("overflow");
		// $("nav div").toggleClass("active");
	});
	$(".menu-toggle").click(function() {
		$("nav ul").toggleClass("visible");
		$("nav").toggleClass("active");

	});
	$("nav ul").click(function() {
		$("nav ul").toggleClass("visible");
		$("nav").toggleClass("active");
	});
});