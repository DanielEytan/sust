$("#toggle").click(function() {
	$("nav").toggleClass("visible");
});
$(".glossary-toggle").click(function() {
	$("#glossary").toggleClass("visible");
	$("#main-content").toggleClass("overflow");
	$("body").toggleClass("overflow");
	// $("nav div").toggleClass("active");
});
$(".menu-toggle").click(function() {
	$("nav ul").toggleClass("visible");
	$("nav").toggleClass("active");
	$("body").toggleClass("overflow");

});
$("nav ul").click(function() {
	$("nav ul").toggleClass("visible");
	$("nav").toggleClass("active");
	$("#glossary").removeClass("visible");
	$("body").removeClass("overflow");
});


function createCloud (minParticles, maxParticles, depth){
  var x,y,z,a,s, $cloud, $cloudPart, cloudHtml = "<div class='cloud'></div>", cloudPartHtml = "<div class='cloudPart'></div>", cloud, cloudPart;

  $cloud = $(cloudHtml);
  cloud = new Css3d($cloud[0]);
  depth = depth || 0;

  for(i = 0; i < (minParticles || 2) + Math.round( Math.random() * ( maxParticles || 10) ); i++){
    $cloudPart = $(cloudPartHtml);
    x = 256 - ( Math.random() * 256 );
    y = 256 - ( Math.random() * 256 );
    z = 100 - ( Math.random() * 200 );
    a = Math.random() * 360;
    s = 0.25 + Math.random();

    cloudPart = new Css3d($cloudPart[0]);
    cloudPart.set('position', x, y, z);
    cloudPart.setAttr('rotation', 'z', a);
    cloudPart.setAttr('scale', 'x', s);
    cloudPart.setAttr('scale', 'y', s);
    cloudPart.applyStyle();
    cloud.addChild(cloudPart);
  }

  $cloud.css({"top": ( Math.random() * 100 ) + "%", "left":  ( Math.random() * 100 ) + "%"});
  cloud.setAttr('position', 'z', ((Math.random() < 0.5 ? -1 : 1) * Math.random() * 100) + depth );
  cloud.applyStyle();

  return cloud;
};

var world = new Css3d($('.js-mother')[0]);

var max = 0;

for(var j = 0; j < 50; j++) {
  max = j * 175;
  world.addChild( createCloud(1,5,max) );
}

var i = 0;
function setSize() {
  world.setAttr('position', 'x', window.innerWidth * -.4);
  world.setAttr('position', 'y', window.innerHeight * -.4);
}
setSize();
$(window).on('resize', setSize);

var speed = 0.75;
var max = -max;
var direction = -1;



function loop (){
  i = i + (direction * speed);

  world.setAttr('position', 'z', i);
  world.applyStyle();
  world.children.forEach(function(cloudy){
    cloudy.setAttr('rotation', 'z', i * .015);
    cloudy.applyStyle();
  });
  if(i < max && direction == -1) {
    direction = 1;
  }
  requestAnimationFrame(loop);
};

loop();

var $win = $(window);
var h = $('body').height();
$win.on('scroll', function(e){
	//i += 10 * ( $win.scrollTop() / h );
});
