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
window.addEventListener('load', () => { // If [First visit (load)/refresh] load correct navbar [desktop/mobile] 
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

window.addEventListener('resize', () => { // Switch desktop navbar to mobile and vice-versa + rezise handler
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
logo.addEventListener("click", () => { // Show/Hide Navbar [Mobile]
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
let showRollers = () => { // display 'little triangle == roller'
    for(let i = 0; i < menuImg.length; i++){   
        menuImg[i].style.display = "inline";
    }
}
let hideRollers = () => { // hide 'little triangle == roller'
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
let showMenu = () => { // display vertical Navbar/Menu
    for(let i = 0; i < menuItems.length; i++){   
        menuItems[i].style.visibility = "visible";
    }
}
let hideMenu = () => { // show vertical Navbar/Menu
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
let rollSublistUp = () => { // Works for all sublists 
    for(let id = 0; id < sublists.length; id++){   
        sublists[id].style.position = "absolute";
        sublists[id].style.visibility = "hidden";
    }
}
let rollSublist = (id) => { // Works for particular sublist
    if (sublists[id].style.position != "relative"){
        sublists[id].style.position = "relative";
        sublists[id].style.visibility = "visible";
    }else{
        sublists[id].style.position = "absolute";
        sublists[id].style.visibility = "hidden";
    }
};

// Navbar resize
let downScaleNav = 0; // Needed help variable to keep track of navbar
window.addEventListener('scroll', () => {
    if( window.innerWidth > mobileWidth){ // Navbar goes big
        if(window.scrollY > window.innerHeight){
            downScaleNav = 1;
            nav.classList.add('ScaleDown');
            nav.classList.remove('ScaleUp');
        }
        else{ // Navbar goes down
            if(downScaleNav == 1){
                nav.classList.remove('ScaleDown');
                nav.classList.add('ScaleUp');
                downScaleNav = 0;
            }
        }
    }
})
// Start of footer hover effect
for(let i = 0; i < footerHovers.length; i++){ // footer Author,Email,Phone animation
    footerHovers[i].addEventListener('mouseover', () => {
        footerInfo[i].style.display = 'inline';
        footerHovers[i].classList.add('FadeAway');
        footerInfo[i].classList.add('FadeIn');
    })
}
// Start of FetchAPI
const terms = document.getElementById('terms').getElementsByTagName('li');
const fetchBox = document.getElementById('fetch-box');
// const docsPath = 'https://serwer2138353.home.pl/studia/pai/src/docs'; // Online
const docsPath = 'http://127.0.0.1:5500//src/docs'; // Local
const docsNames = [`tos.json`,`privacy.json`,`tac.json`];
const docs = [];
for(i = 0; i < docsNames.length; i++){
    docs[i] = (`${docsPath}/${docsNames[i]}`);
}
sessionStorage.setItem('currentFetch', 'none');
for(let i = 0; i < terms.length; i++){
    terms[i].addEventListener('click', () => {  // For each term add listener to get/delete fetched data
        if(sessionStorage.getItem('currentFetch') != docsNames[i]){ // If fetch data isn't already shown => Load term
        let template = '';
            // Get data with fetch api
            fetch(docs[i])
            .then( response => response.json())
            .then( data => {
                template = `<h2 id='fetch-title'>${data.title}</h2>`;
                template += '<ol id="fetch-data-list">';
                for(let i = 0; i < data.content.length; i++)
                    template += `<li>${data.content[i]}</li>`;
                template += '</ol>';
                fetchBox.innerHTML = template;
                sessionStorage.setItem('currentFetch', docsNames[i]);
            })
            .catch( error => console.log(error));
        }else{ // If fetch data is already shown => Hide term
            fetchBox.innerHTML = '';
            sessionStorage.setItem('currentFetch', 'none');
        }
    })
}
// Google maps
const map = '';
const store = document.getElementById('store');
store.addEventListener('click', () => { // Load/Unload map
    if(sessionStorage.getItem('currentFetch') === 'map'){ // If map is already loaded => Hide map
        fetchBox.innerHTML = '';
    }else{ // If map isn't loaded => Load map
        fetchBox.innerHTML = '<div id="google-map"><iframe  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2497.959517659392!2d22.55151581556967!3d51.238240438168454!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47225771a38cd54f%3A0x3616f8a886ad8051!2sMassive%20Music!5e0!3m2!1spl!2spl!4v1652987828643!5m2!1spl!2spl" width="750" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>'
        sessionStorage.setItem('currentFetch', 'map');
    }
})