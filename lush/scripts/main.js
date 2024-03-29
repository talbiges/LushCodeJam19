/*
Below is using the TweenMax library.
I am also using the perlin library to help with the automovement of the animation when no mouse or touch is detected 
*/
var fizzSound = new Audio('audio/fizz.mp3');
var waspSound = new Audio('audio/wasp.mp3');
var splashSound = new Audio('audio/splash.mp3');
var drainingSound = new Audio('audio/draining.mp3');
var fizzAudio = document.getElementById("myAudio");
var playSoundEffects = true;
let lastMove = 0;
var lastmousex = 0;
var lastmousey = 0;

function createParticle(x, y) {

    var size = Math.random() * 50 + 10;

    x -= (size / 2);
    y -= (size / 2);

    var particle = document.createElement('div');
    document.body.appendChild(particle);

    TweenMax.set(particle, {
        x: x,
        y: y,
        width: size,
        height: size,
        background: function () {
            return `hsl(${Math.random() * 90 + 200}, 50%, 50%)`
        }
    });

    TweenMax.to(particle, Math.random() * 2 + 1, {
        x: x + (Math.random() - 0.5) * 200,
        y: y + (Math.random() - 0.5) * 200,
        opacity: 0,
        scale: 0,
        ease: Power2.easeOut,
        onComplete: function () {
            document.body.removeChild(particle);
        }
    })
}

function changeBackground(x, y) {

    var r = 255 * (x / screen.width);
    var g = 255 * (y / screen.height);
    var b = 255 * Math.abs(Math.cos(Math.PI * y / screen.width));

    TweenLite.to('body', 1, { backgroundColor: 'rgb(' + Math.round(r) + ', ' + Math.round(g) + ', ' + Math.round(b) + ')', opacity: 0.69, ease: Power3.easeOut });

}


function render(a) {

    let random = 1;
    const speed = Math.floor(Math.random() * 50) + 1 ;
    const randomness = Math.floor(Math.random() * 100) + 1 ;


    //If you stop moving for 500ms, the fake mouse will start moving again.
    if (Date.now() - lastMove > 500) {

        const s = 0.001 * (speed / 100);

        const noiseX = (noise.simplex3(1, 0, a * s) + 1) / 2;
        const noiseY = (noise.simplex3(11, 0, a * s) + 1) / 2;

        random += randomness / 1000;
        const randX = noise.simplex3(1, 0, random) * window.innerWidth * 0.5;
        const randY = noise.simplex3(3, 0, random) * window.innerHeight * 0.5;
        const x = noiseX * innerWidth + randX;
        const y = noiseY * innerHeight + randY;

        if (x != 0 || y != 0) { createParticle(x, y); }

       

        //change background colours 
        changeBackground(x, y);

    } 
        
    
    requestAnimationFrame(render);
}

// When the mouse is being moved
function onMouseMove(e) {
    // Get the x and y coordinates
    var x = e.clientX;
    var y = e.clientY;
    createParticle(x, y);
    changeBackground(x, y);
    lastMove = Date.now();
    playAudio(x, y);
 
}

function ontouchmove(e) {
    
    var x = event.touches[0].clientX;
    var y = event.touches[0].clientY;

    createParticle(x, y);
    changeBackground(x, y);
    //Save the last move time
    lastMove = Date.now();
    playAudio(x, y);
    

}

function ontouchend() {

    fizzSound.pause();
    
    playSoundEffects = true;
}

function move() {

    var honey = document.getElementsByClassName("move");
    

}
function imageSwap() {
    var image = document.getElementsByClassName(move);
    image.values()
}



function playAudio(x, y) {

    //Math.abs returns the result of x - lastmousex etc
    var movementX = Math.abs(x - lastmousex);
    var movementY = Math.abs(y - lastmousey);
    var movement = Math.sqrt(movementX * movementX + movementY * movementY);

    var speed = 10 * movement;//current speed	
    var roundedSpeed = Math.random() * speed;
     

    if (roundedSpeed > 100) {

        fizzSound.playbackRate = 2.5;
        
        console.log("2x normal speed = Fast Bubbles!");

    } else if (roundedSpeed == 0) {

        splashSound.playbackRate = 1.2;
        splashSound.play();
        console.log("1.5x normal speed = Normal Bubbles!");

    } else {
        
        splashSound.playbackRate = 1.0;
        splashSound.play();
        console.log("1x normal speed = Slow Bubbles!");
    }

    if (playSoundEffects) {

        fizzSound.play();
        playSoundEffects = true;
    }

    lastmousex = x;
    lastmousey = y;

}

window.addEventListener('mousemove', onMouseMove);
window.addEventListener('touchmove', ontouchmove);
window.addEventListener('touchend', ontouchend);
requestAnimationFrame(render);










// JavaScript source code
