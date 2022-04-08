let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");

let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;

canvas.width = windowWidth;
canvas.height = windowHeight;

window.addEventListener('resize', () => {
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;

    canvas.width = windowWidth;
    canvas.height = windowHeight;
})
let gradientWidth = windowWidth;
let gradientHeight = windowHeight;
let gradient = ctx.createLinearGradient(0,0, gradientWidth, 0);
gradient.addColorStop(0, "#fff");
gradient.addColorStop(1, "#000");
let leftColor = 230;
let rightColor = 200;
let deltaColor = .1;
ctx.fillStyle = gradient;
ctx.fillRect(0,0, windowWidth, windowHeight);
let redrawGradient = () =>{
    gradient = ctx.createLinearGradient(0,0, gradientWidth, gradientHeight);
    gradient.addColorStop(0, `rgb(${leftColor}, ${leftColor}, ${leftColor})`);
    gradient.addColorStop(1, `rgb( ${rightColor}, ${rightColor},  ${rightColor})`);
    ctx.fillStyle = gradient;
    ctx.fillRect(0,0, windowWidth, windowHeight);
}
let SignOffset = 100;
let SignSpeed;
let SignX;
let SignY;
let Chars = ['€', '$', 'PLN', '<3', ':)', '£', `¥`];
let Signs = [];
ctx.fillStyle = "#0f0";
ctx.font = "30px Arial ";
ctx.textAlign = "center";
function Sign(char){
    this.char = char;
    this.initSign = () => {
        this.SignSpeed = Math.random()*5 + 2;
        this.SignX = Math.random()*windowWidth;
        this.SignY = windowHeight + SignOffset;
    }
    this.drawSign = (char) => {
        ctx.shadowBlur = 7;
        ctx.shadowColor = "grey";
        ctx.fillText(`${this.char}`, this.SignX, this.SignY);
        ctx.shadowBlur = 0;
        ctx.fillStyle = "#0f0";
        ctx.fillText(`${this.char}`, this.SignX, this.SignY);
    }
    this.moveSign = () => {
        this.SignY -= this.SignSpeed;
        if(this.SignY < -SignOffset){
            this.initSign();
        }
    }
    this.animateSign = () => {
        this.moveSign();
        this.drawSign(this.char);
    }
}

for(let i = 0; i < Chars.length; i++){
    Signs[i] = new Sign(Chars[i])
    Signs[i].initSign();
}
let animate = () => {
    requestAnimationFrame(animate);
    ctx.clearRect(0,0, windowWidth, windowHeight);
    redrawGradient();
    for(let i = 0; i < Signs.length; i++){
        Signs[i].animateSign();
    }
    

    
}
animate();