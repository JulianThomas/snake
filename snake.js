canvas = document.getElementById("canvas");
let cellSize = 20;

//change canvas height and width here to change the game area
//added floor and divide and multiply by cellsize
//to trim off any extra pixels on the canvas
canvas.width = Math.floor((window.innerWidth / cellSize) * 0.7) * cellSize;
canvas.height = Math.floor((window.innerHeight / cellSize) * 0.7) * cellSize;
let ctx = canvas.getContext("2d");

let rows = Math.floor(canvas.width / cellSize),
    cols = Math.floor(canvas.height / cellSize);
    //position of the snake when spawned
let xpos = Math.floor(Math.random()*rows),
    ypos = Math.floor(Math.random() * rows);
let xvel = (yvel = 0);  // initial velocity
let body = [];
let length = 1;
    //initial apple position
let xapl = Math.floor(Math.random() * rows),
    yapl = Math.floor(Math.random() * cols); 

let interv,
    updateInterval = 1000 / 18; //decrease if you need higher speed
let isPaused = false,
    isStarted = false;
  
window.onblur = () => { if (isStarted) pause();};
 

window.onload = function () {
  addEventListener("keydown", keyPressed);
  interv = setInterval(update, updateInterval); 
};

keyPressed = (e) => {
  switch (e.keyCode) {
    case 37:
      if ((xvel != 1 && yvel != 0) || !isStarted) {
        xvel = -1;
        yvel = 0;
        isStarted = true;
      }
      break;

    case 38:
      if ((xvel != 0 && yvel != 1) || !isStarted) {
        xvel = -0;
        yvel = -1;
        isStarted = true;
      }
      break;
    case 39:
      if ((xvel != -1 && yvel != 0) || !isStarted) {
        xvel = +1;
        yvel = 0;
        isStarted = true;
      }
      break;
    case 40:
      if ((xvel != -0 && yvel != -1) || !isStarted) {
        xvel = 0;
        yvel = +1;
        isStarted = true;
      }
      break;
    case 80:
          pause();
      break;
  }
};

function update() {
  xpos += xvel;
  ypos += yvel;

  if (xpos < 0) xpos = rows - 1;
  if (xpos > rows - 1) xpos = 0;
  if (ypos < 0) ypos = cols - 1;
  if (ypos > cols - 1) ypos = 0;

  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "cyan";

  for (let index = 0; index < body.length; index++) {
    ctx.fillRect(
      body[index].x * cellSize,
      body[index].y * cellSize,
      cellSize,
      cellSize
    );
    //death
    if (body[index].x == xpos && body[index].y == ypos) {
      length = 1;
      xvel = yvel = 0;
      setTimeout(() => (isStarted = false), 2000);
      document.querySelector(".score-value").innerHTML = `${length}`;
    }
  }
  body.push({ x: xpos, y: ypos });

  while (body.length > length) {
    body.shift();
  }

  if (xapl == xpos && yapl == ypos) {
    length++;
    xapl = Math.floor(Math.random() * rows);
    yapl = Math.floor(Math.random() * cols);
    document.querySelector(".score-value").innerHTML = `${length}`;
  }
  //makes the apple not spawn on snake
  for (let i = 0; i < body.length; i++) {
    if (body[i].x == xapl && body[i].y == yapl) {
      xapl = Math.floor(Math.random() * rows);
      yapl = Math.floor(Math.random() * cols);
    }
  }
  ctx.fillStyle = "red";
  //   ctx.fillRect(
  //     xapl * cellSize + 5,
  //     yapl * cellSize + 5,
  //     cellSize - 10,
  //     cellSize - 10
  //   );

  //creates circles instead of squares
  ctx.beginPath();
  ctx.arc(
    xapl * cellSize + cellSize / 2,
    yapl * cellSize + cellSize / 2,
    cellSize * 0.3,
    0,
    2 * Math.PI
  );
  ctx.fill();
}

function pause() {
    
    if (isPaused) {
        interv = setInterval(update, updateInterval);
        document.querySelector(".paused").innerHTML = 'Press P to pause';

    } else {
        clearInterval(interv);
        document.querySelector(".paused").innerHTML = 'Game paused. Press P to resume';
    }
    isPaused = !isPaused;
} 