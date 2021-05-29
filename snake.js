canvas = document.getElementById("canvas");
canvas.width = 800;
canvas.height = 400;
let ctx = canvas.getContext("2d");
let cellSize = 20;
let rows = canvas.width / cellSize,
  cols = canvas.height / cellSize;
let xpos = rows / cellSize,
  ypos = cols / cellSize;

let xvel = (yvel = 0);
let xapl = (yapl = 15);
let body = [];
let length = 1;

window.onload = function () {
  addEventListener("keydown", keyPressed);
  setInterval(update, 1000 / 10);
};

keyPressed = (e) => {
  switch (e.keyCode) {
    case 37:
      if ((xvel != 1 && yvel != 0) || xvel + yvel === 0) {
        xvel = -1;
        yvel = 0;
      }
      break;

    case 38:
      if ((xvel != 0 && yvel != 1) || xvel + yvel === 0) {
        xvel = -0;
        yvel = -1;
      }
      break;
    case 39:
      if ((xvel != -1 && yvel != 0) || xvel + yvel === 0) {
        xvel = +1;
        yvel = 0;
      }
      break;
    case 40:
      if ((xvel != -0 && yvel != -1) || xvel + yvel === 0) {
        xvel = 0;
        yvel = +1;
      }
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
    if (body[index].x == xpos && body[index].y == ypos) {
      length = 1;
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
