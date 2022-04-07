let articles = document.getElementsByTagName('article');
let windowHeight = window.innerHeight;

window.addEventListener('load', () => {
    for(let i = 0; i < articles.length; i++){
        articles[i].style.height = `${windowHeight}px`;
    }    
})

window.addEventListener('resize', () => {
    windowHeight = window.innerHeight;
    for(let i = 0; i < articles.length; i++){
        articles[i].style.height = `${windowHeight}px`;
    }
});
