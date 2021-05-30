canvas = document.getElementById("canvas");

//change canvas height and width here to change the game area
canvas.width = window.innerWidth * 0.7;
canvas.height = window.innerHeight * 0.7;
let ctx = canvas.getContext("2d");
let cellSize = 20;
let rows = Math.floor(canvas.width / cellSize),
  cols = Math.floor(canvas.height / cellSize);
let xpos = Math.floor(rows / cellSize),
  ypos = Math.floor(cols / cellSize);

let xvel = (yvel = 0);
let xapl = Math.floor(Math.random() * rows),
  yapl = Math.floor(Math.random() * cols); //initial apple position
let body = [];
let length = 1;
let interv;
let paused = false,
  started = false;
// window.onblur = () => clearInterval(interv);
// window.onfocus = () => setInterval(update, 1000 / 10);

window.onload = function () {
  addEventListener("keydown", keyPressed);
  interv = setInterval(update, 1000 / 10); //increase if you need higher speed
};

keyPressed = (e) => {
  switch (e.keyCode) {
    case 37:
      if ((xvel != 1 && yvel != 0) || !started) {
        xvel = -1;
        yvel = 0;
        started = true;
      }
      break;

    case 38:
      if ((xvel != 0 && yvel != 1) || !started) {
        xvel = -0;
        yvel = -1;
        started = true;
      }
      break;
    case 39:
      if ((xvel != -1 && yvel != 0) || !started) {
        xvel = +1;
        yvel = 0;
        started = true;
      }
      break;
    case 40:
      if ((xvel != -0 && yvel != -1) || !started) {
        xvel = 0;
        yvel = +1;
        started = true;
      }
      break;
    case 80:
      if (paused) {
        interv = setInterval(update, 1000 / 10);
      } else {
        clearInterval(interv);
      }
      paused = !paused;
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
      cellSize - 1,
      cellSize - 1
    );
    //death
    if (body[index].x == xpos && body[index].y == ypos && started) {
      xvel = yvel = 0;
      death();
      ctx.beginPath();
    }
  }

  body.push({ x: xpos, y: ypos });
  while (body.length > length && started) {
    body.shift();
  }

  if (xapl == xpos && yapl == ypos) {
    length++;
    xapl = Math.floor(Math.random() * rows);
    yapl = Math.floor(Math.random() * cols);
    document.querySelector(".score-value").innerHTML = `${length}`;
  }
  ctx.fillStyle = "red";
  //   ctx.fillRect(
  //     xapl * cellSize + 5,
  //     yapl * cellSize + 5,
  //     cellSize - 10,
  //     cellSize - 10
  //   );

  //creates circles instead of squares

  ctx.arc(
    xapl * cellSize + cellSize / 2,
    yapl * cellSize + cellSize / 2,
    cellSize * 0.6,
    0,
    2 * Math.PI
  );
  ctx.fill();
  ctx.closePath();
}

function death() {
  started = false;
  while (body.lenth > 1) {
    body.pop();
  }
  setTimeout(() => {
    length = 1;
    document.querySelector(".score-value").innerHTML = `${length}`;
  }, 3000);
}
