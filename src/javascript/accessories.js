let canvas = document.getElementById('case-slider');
let c = canvas.getContext('2d');

const imgWidth = 400;

let maxWidth = window.innerWidth;
canvas.width = maxWidth;
canvas.height = 300;
const path = "src/img/accessories/";
const CASES = ['case2.jpg','case3.jpg','case4.jpg','case5.jpg','case6.webp'];
const carouselWidth = imgWidth * (CASES.length - 2);

const imgHeight = canvas.height;

let offset = 1;
let cases = [];
for(let i = 0; i < CASES.length; i++){
    cases[i] = new Image();
    cases[i].myX = i*imgWidth;
}
let carousel = () =>{
    requestAnimationFrame(carousel);
    c.clearRect(0,0, canvas.width, canvas.height);
    for(let i = 0; i < CASES.length; i++){
        cases[i].myX+=offset;
        if(cases[i].myX > carouselWidth + imgWidth){
            cases[i].myX = -imgWidth;
        }
        c.drawImage(cases[i], cases[i].myX, 0, imgWidth, imgHeight);
    }
}
cases[0].addEventListener('load',carousel);
for(let i = 0; i < CASES.length; i++){
    cases[i].src = `${path}${CASES[i]}`;
}
window.addEventListener('resize', () => {
    maxWidth = window.innerWidth;
    canvas.width = maxWidth;
})
