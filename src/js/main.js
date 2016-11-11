'use strict';

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
