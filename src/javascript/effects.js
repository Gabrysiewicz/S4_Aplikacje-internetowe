let articles = document.getElementsByTagName('article');
let windowHeight = window.innerHeight;
let miniSliders = document.getElementsByClassName('mini-slider');
window.addEventListener('load', () => {
    for(let i = 0; i < articles.length; i++){
        articles[i].style.height = `${windowHeight}px`;
    }    
});

window.addEventListener('resize', () => {
    windowHeight = window.innerHeight;
    for(let i = 0; i < articles.length; i++){
        articles[i].style.height = `${windowHeight}px`;
    }
});

let SliderImgs = [];
let SliderImgIndex = [];
for(let i = 0; i < miniSliders.length; i++){
    SliderImgIndex[i] = 1;
}
for(let i = 0; i < miniSliders.length; i++){
    SliderImgs[i] = miniSliders[i].getElementsByClassName('effect-img');
    if(SliderImgs[i].length > 1){ // If slider is possible to exist === There are atleast 2 imgs ; then
        let marker = document.getElementsByClassName('slider-marker')[i]; // Ul
        let mark; // li
        for(let x = 0; x < SliderImgs[i].length; x++){
            mark = document.createElement("li");
            mark.appendChild(document.createTextNode(""));
            marker.appendChild(mark);
        }
        let marks = marker.getElementsByTagName('li'); // Array of li
        marks[0].classList.add('active-mark'); // Make first(default) marker active
        miniSliders[i].addEventListener('click', () => { // After clicking on image do
            if(SliderImgIndex[i] < SliderImgs[i].length ){
                // Swap images
                let active = SliderImgs[i][0].src;
                SliderImgs[i][0].src = SliderImgs[i][SliderImgIndex[i]].src;
                SliderImgs[i][SliderImgIndex[i]].src = active;
                // Remove all active classes on li / Make markers grey
                for(let x = 0; x < SliderImgs[i].length; x++){
                    marks[x].classList.remove('active-mark');
                }
                // Activate correct marker
                marks[SliderImgIndex[i]].classList.add('active-mark');
                SliderImgIndex[i]++;
            }else{
                // Swap images
                let active = SliderImgs[i][0].src;
                SliderImgs[i][0].src = SliderImgs[i][1].src;
                SliderImgs[i][1].src = active;
                // Remove all active classes on li / Make markers grey
                for(let x = 0; x < SliderImgs[i].length; x++){
                    marks[x].classList.remove('active-mark');
                }
                // Make first(default) marker active
                marks[0].classList.add('active-mark');
                SliderImgIndex[i] = 1;
            }
            
        })
    }
    
}

