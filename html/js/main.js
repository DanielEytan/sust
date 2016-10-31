$(document).ready(function() {
	$("#toggle").click(function() {
		$("nav").toggleClass("visible");
	});
	$(".glossary-toggle").click(function() {
		$("#glossary").toggleClass("visible");
		$("#main-content").toggleClass("overflow");
		$("nav").toggleClass("active");
	});
	$(".menu-toggle").click(function() {
		$("nav ul").toggleClass("visible");
		$("nav").toggleClass("active");
		
	});
});