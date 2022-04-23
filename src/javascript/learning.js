let canvas = document.getElementById('note-slider');
let c = canvas.getContext('2d');

const imgWidth = 50;

let maxWidth = window.innerWidth;
canvas.width = maxWidth;
canvas.height = 300;
const path = "src/img/learning/";
const NOTES = ['note.png','eightNote.png','quarterNote.png','sixteen.png','wholeNote.png'];
const notesQuantity = canvas.width/imgWidth;

const imgHeight = 75;

let scale = canvas.height / 10;
let offset = 1;
let notes = [];
for(let i = 0; i < notesQuantity; i++){
    notes[i] = new Image();
    notes[i].myX = i*imgWidth;
    notes[i].myY = (Math.floor(Math.random()*5)+1)*scale;
}
let carousel = () =>{
    requestAnimationFrame(carousel);
    c.clearRect(0,0, canvas.width, canvas.height);
    for(let i = 0; i < notesQuantity; i++){
        notes[i].myX+=offset;
        if(notes[i].myX > canvas.width){
            notes[i].myX = -imgWidth;
            notes[i].myY = (Math.floor(Math.random()*5)+1)*scale;
        }
        c.drawImage(notes[i], notes[i].myX, notes[i].myY, imgWidth, imgHeight);
    }
    fiveline();

}
notes[0].addEventListener('load',carousel);
for(let i = 0; i < notesQuantity; i++){
    let index = Math.floor(Math.random()*NOTES.length);
    notes[i].src = `${path}${NOTES[index]}`;
}
window.addEventListener('resize', () => {
    maxWidth = window.innerWidth;
    canvas.width = maxWidth;
})
let fiveline = () =>{
    for(let i = 3; i < 8; i++){
        c.beginPath();
        c.moveTo(0, i*scale);
        c.lineTo(canvas.width, i*scale);
        c.strokeStyle = "black";
        c.stroke();
    }
}
// fiveline();
