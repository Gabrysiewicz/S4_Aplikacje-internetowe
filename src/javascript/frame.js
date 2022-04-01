let nav = document.querySelector("nav");
let slider = document.getElementById("slider");
let slide = document.getElementById("current-slide");
let main = document.getElementsByTagName("main");
let section = document.getElementsByTagName("section")[0];
const maxHeight = window.innerHeight;

window.addEventListener('load', () => {
    slider.style.height = `${slide.offsetHeight - nav.offsetHeight}px`;
})