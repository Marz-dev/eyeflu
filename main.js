const canvas =document.getElementById("myCanvas");
canvas.height=window.innerHeight;
let phone = true;
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
if (isTouchDevice) {
   phone = true;
} else {
   phone = false;
}
if(window.innerWidth > 400) {
    canvas.width = 400;
}else{
    canvas.width = window.innerWidth;
}
let highscore = 0;
let gen = 1;
let genD = 0;
let bestBrain =0;
let populations = 100;
const ctx = canvas.getContext("2d");
//const eye = new Eye(15,canvas.height/2, 30, 30);
let pipeXincrement = canvas.width/2;
let pipeX =canvas.width/2;
let fps = 0;
let controls = new Controls();
function first (){
    for(var i = 0; i < 20; i ++){
        pipeX = canvas.width/2 + i*pipeXincrement;
        pipe.addPipes(pipeX);
    }
}
let eye = [];
let eyeY =canvas.height/2* Math.random() + 100;
for (var i = 0; i<populations; i++){
   eye[i]= new Eye(30, eyeY, 30, 30);
}
const pipe = new Pipes();
first();
let buffer = canvas.width/8;
let cluffer = canvas.width;
const parallax = new Parallax();
let start = false;
let restart = false;
let gameOver = false;

animate();


function animate(){
    canvas.height=window.innerHeight;
    buffer = canvas.width/8;
    cluffer = canvas.width;
    parallax.update();
    ctx.save();
    parallax.draw(ctx);
    pipe.update(ctx);
    if(genD >= populations){
        gameOver = true;
        genD = populations -1;
    }
   // eye.update();
  //  eye.draw(ctx);
    
    for(var i = 0; i < eye.length; i++){
    eye[i].update();
    eye[i].draw(ctx);
    }
    ctx.restore();
    requestAnimationFrame(animate);
    if(restart){
        restart = false;
        first();
    }
}
function phoneStart(){
    start = true;
    gameOver = false;
}
function placePipes(){
    if(start){
        if(!gameOver){
            pipe.addPipes(pipeX);
        }
    }
}
