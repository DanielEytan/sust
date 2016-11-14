'use strict';

/* scroll things */
var ScrollTrigger = require('scrolltrigger-classes');

var trigger = new ScrollTrigger({
  toggle: {
    visible: 'is-visible',
    hidden: 'is-hidden'
  },
  offset: {
    x: 0,
    y: 100
  },
  addHeight: true,
  once: true
}, document.body, window);

/* 3D css */
var Css3d = require('3dcss');
var d = document;

function createCloud (minParticles, maxParticles, depth){
  var x,y,z,a,s, $cloud, $cloudPart, cloud, cloudPart;

  $cloud = d.createElement('div');
  $cloud.classList.add('cloud');

  cloud = new Css3d($cloud);
  depth = depth || 0;

  for(i = 0; i < (minParticles || 2) + Math.round( Math.random() * ( maxParticles || 10) ); i++){
    $cloudPart = d.createElement('div');
    $cloudPart.classList.add('cloudPart');

    x = 256 - ( Math.random() * 256 );
    y = 256 - ( Math.random() * 256 );
    z = 100 - ( Math.random() * 200 );
    a = Math.random() * 360;
    s = 0.25 + Math.random();

    cloudPart = new Css3d($cloudPart);
    cloudPart.set('transform', x, y, z)
             .setAttr('rotation', 'z', a)
             .setAttr('scale', 'x', s)
             .setAttr('scale', 'y', s)
             .applyStyle();

    cloud.addChild(cloudPart);
  }

  $cloud.style.top = ( Math.random() * 100 ) + "%";
  if ( Math.random() > .3 ) {
    $cloud.style.left = ( 70 + (Math.random() * 30) ) + "%";
  } else {
    $cloud.style.left = -30 + (Math.random() * -20) + "%";
  }
  cloud.setAttr('transform', 'z', ((Math.random() < 0.5 ? -1 : 1) * Math.random() * 100) + depth );
  cloud.applyStyle();

  return cloud;
};

var $mother = d.querySelector('.js-mother');

var world = new Css3d($mother);

var max = 0;

for(var j = 0; j < 50; j++) {
  max = j * 175;
  world.addChild( createCloud(1,5,max) );
}

var i = 0;

var height = null;

var body = document.body,
    html = document.documentElement;

var $parent = $mother.parentElement;

function setSize() {
  world.setAttr('transform', 'x', window.innerWidth * -.4)
       .setAttr('transform', 'y', window.innerHeight * -.4);
  height = $parent.getBoundingClientRect().height + $parent.getBoundingClientRect().top;
}

setSize();

window.addEventListener('resize', setSize);

var speed = 0.75;
var max = -max;
var direction = -1;
var progress = 0;

function loop (){
  i += .25; /*(direction * speed) */

  progress = (window.scrollY + window.innerHeight) / height;

  world.setAttr('transform', 'z', (progress * (direction * speed) * 1000) - i);
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

// starts loop
loop();


/* class toggeling */
window.menuFunction = function()
{
    document.getElementById("nav-glossary").classList.add("menu-active");
    document.getElementById("nav-glossary").classList.remove("glossary-active");
    document.getElementById("body").classList.add("overflow");
};
window.menulistFunction = function()
{
    document.getElementById("nav-glossary").classList.remove("menu-active");
    document.getElementById("body").classList.remove("overflow");

};
window.glossaryFunction = function()
{
    document.getElementById("nav-glossary").classList.add("glossary-active");
    document.getElementById("nav-glossary").classList.remove("menu-active");
    document.getElementById("body").classList.add("overflow");
};
window.dismissFunction = function()
{
    document.getElementById("nav-glossary").classList.remove("menu-active", "glossary-active");
    document.getElementById("body").classList.remove("overflow");
};
