'use strict';

function menuFunction()
{
    document.getElementById("nav-glossary").classList.add("menu-active");
    document.getElementById("nav-glossary").classList.remove("glossary-active");
    document.getElementById("body").classList.add("overflow");
};
function menulistFunction()
{
    document.getElementById("nav-glossary").classList.remove("menu-active");
    document.getElementById("body").classList.remove("overflow");

};
function glossaryFunction()
{
    document.getElementById("nav-glossary").classList.add("glossary-active");
    document.getElementById("nav-glossary").classList.remove("menu-active");
    document.getElementById("body").classList.add("overflow");
};
function dismissFunction()
{
    document.getElementById("nav-glossary").classList.remove("menu-active", "glossary-active");
    document.getElementById("body").classList.remove("overflow");
};
