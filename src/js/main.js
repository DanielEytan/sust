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
  $cloud.classLIst.add('cloud');
  cloud = new Css3d($cloud);
  depth = depth || 0;

  for(i = 0; i < (minParticles || 2) + Math.round( Math.random() * ( maxParticles || 10) ); i++){
    $cloudPart = d.createElement('div');
    $cloudPart.classLIst.add('cloudPart');

    x = 256 - ( Math.random() * 256 );
    y = 256 - ( Math.random() * 256 );
    z = 100 - ( Math.random() * 200 );
    a = Math.random() * 360;
    s = 0.25 + Math.random();

    cloudPart = new Css3d($cloudPart);
    cloudPart.set('position', x, y, z);
    cloudPart.setAttr('rotation', 'z', a);
    cloudPart.setAttr('scale', 'x', s);
    cloudPart.setAttr('scale', 'y', s);
    cloudPart.applyStyle();
    cloud.addChild(cloudPart);
  }

  $cloud.style.top = ( Math.random() * 100 ) + "%";
  $cloud.style.left =  ( Math.random() * 100 ) + "%";

  cloud.setAttr('position', 'z', ((Math.random() < 0.5 ? -1 : 1) * Math.random() * 100) + depth );
  cloud.applyStyle();

  return cloud;
};


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
