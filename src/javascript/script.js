let body = document.querySelector("body");
let nav = document.querySelector("nav");
let logo = document.getElementById("logo");
let slider = document.getElementById("slider");
let slide = document.getElementById("current-slide");
let main = document.getElementsByTagName("main");

let menuItems = document.getElementsByClassName("menu-item");
let menuImg = document.getElementsByClassName("roller"); 
let sublists = document.getElementsByClassName("sub-list");
const maxHeight = window.innerHeight;
const mobileWidth = 641;
// menuStatus == 1 : visible
// menuStatus == 0 : hidden
sessionStorage.setItem("menuStatus", 1);

window.addEventListener('load', () => {
    slider.style.height = `${slide.offsetHeight - nav.offsetHeight}px`;
});
document.getElementById("guitars").style.height = `${maxHeight}px`;
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
        menuImg[i].style.visibility = "visible";
    }
}
let hideRollers = () => {
    for(let i = 0; i < menuImg.length; i++){   
        menuImg[i].style.visibility = "hidden";
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
    // sessionStorage.setItem("menuStatus", 1);
}
let hideMenu = () => {
    for(let i = 0; i < menuItems.length; i++){   
        menuItems[i].style.visibility = "hidden";
    }
    // sessionStorage.setItem("menuStatus", 0);
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
// // Mouse tracker
// let mouse = {
//     x: 0,
//     y: 0
// }
// window.addEventListener("mousemove", function(e){
//     mouse.x = e.pageX;
//     mouse.y = e.pageY;
// })
// // Scroll locker
// nav.addEventListener("mouseenter", (e) => {
//     body.style.overflow = "hidden";
// })
// nav.addEventListener("wheel", () => {
//     if(nav.style.height > maxHeight || nav.style.height < 0){
//         top += window.screenY;
//     }
//     // if(nav.style.top > nav.style.height - maxHeight)
//     console.log(nav.style.offsetHeight);
//     console.log(window.scrollY);
// })
// // Scroll unlocker
// nav.addEventListener("mouseleave", (e) => {
//     body.style.overflow = "visible";
// })