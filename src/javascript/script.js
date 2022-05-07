const body = document.querySelector("body");
const nav = document.querySelector("nav");
const menu = document.getElementById("menu");
const logo = document.getElementById("logo");
const slider = document.getElementById("slider");
const slide = document.getElementById("current-slide");
const main = document.getElementsByTagName("main");
const footerHovers = document.getElementsByClassName("mouse-event");
const footerInfo = document.getElementsByClassName("additional-info");

const menuItems = document.getElementsByClassName("menu-item");
const menuImg = document.getElementsByClassName("roller"); 
const sublists = document.getElementsByClassName("sub-list");
const maxHeight = window.innerHeight;
const mobileWidth = 641;
// menuStatus == 1 : visible
// menuStatus == 0 : hidden
window.addEventListener('load', () => {
    if(window.innerWidth > mobileWidth){
        showMenu();
        sessionStorage.setItem("menuStatus", 1);
    }else{
        hideMenu();
        showRollers();
        logo.src = "src/img/logo_w_rotate.png";
        sessionStorage.setItem("menuStatus", 0);
    }
    logo.style.height = `${menu.style.height}px`;
})

window.addEventListener('resize', () => {
    if(window.innerWidth > mobileWidth){
        showMenu();
        rollSublistUp();
        hideRollers();
        sessionStorage.setItem("menuStatus", 0);
        logo.src = "src/img/logo_w.png";
    }else{
        switchMenu();
        switchRollers();
        logo.src = "src/img/logo_w_rotate.png";
    }
    logo.style.height = `${menu.style.height}px`;
});
logo.addEventListener("click", () => {
    if(window.innerWidth <= mobileWidth){
        if(sessionStorage.getItem("menuStatus") == 0){
            showMenu();
            showRollers();
            sessionStorage.setItem("menuStatus", 1);
            logo.src = "src/img/logo_w.png";
        }else{
            hideMenu();
            hideRollers();
            sessionStorage.setItem("menuStatus", 0);
            logo.src = "src/img/logo_w_rotate.png";
        }
    }
});
// When in mobile mode triangles to roll down sublist are added
// This makes sublist roll out
let showRollers = () => {
    for(let i = 0; i < menuImg.length; i++){   
        menuImg[i].style.display = "inline";
    }
}
let hideRollers = () => {
    for(let i = 0; i < menuImg.length; i++){   
        menuImg[i].style.display = "none";
    }
}
let switchRollers = () => {
    if(sessionStorage.getItem("menuStatus") == 0){
        hideRollers();
    }else{
        showRollers();
    }
}

let showMenu = () => {
    for(let i = 0; i < menuItems.length; i++){   
        menuItems[i].style.visibility = "visible";
    }
}
let hideMenu = () => {
    for(let i = 0; i < menuItems.length; i++){   
        menuItems[i].style.visibility = "hidden";
    }
}
let switchMenu = () => {
    if(sessionStorage.getItem("menuStatus") == 0){
        hideMenu();
    }else{
        showMenu();
    }
}
let rollSublistUp = () => {
    for(let id = 0; id < sublists.length; id++){   
        sublists[id].style.position = "absolute";
        sublists[id].style.visibility = "hidden";
    }
}
let rollSublist = (id) => {
    if (sublists[id].style.position != "relative"){
        sublists[id].style.position = "relative";
        sublists[id].style.visibility = "visible";
    }else{
        sublists[id].style.position = "absolute";
        sublists[id].style.visibility = "hidden";
    }
};

let downScaleNav = 0;
window.addEventListener('scroll', () => {
    if( window.innerWidth > mobileWidth){
        if(window.scrollY > window.innerHeight){
            downScaleNav = 1;
            nav.classList.add('ScaleDown');
            nav.classList.remove('ScaleUp');
        }
        else{
            if(downScaleNav == 1){
                nav.classList.remove('ScaleDown');
                nav.classList.add('ScaleUp');
                downScaleNav = 0;
            }
        }
    }
})
for(let i = 0; i < footerHovers.length; i++){ // footer Author,Email,Phone animation
    footerHovers[i].addEventListener('mouseover', () => {
        footerHovers[i].classList.add('FadeAway');
        footerInfo[i].style.display = 'inline';
    })
}
const terms = document.getElementById('terms').getElementsByTagName('li');
const fetchBox = document.getElementById('async');
for(let i = 0; i < terms.length; i++){
    // Get data with fetch api
}