import "normalize.css";

import * as game from "@mark-halls/game-of-life-data";

const pixelSize = 8;

let gameCoords = [];

const draw = () => {
  const canvas = document.getElementById("canvas");
  canvas.width = document.body.clientWidth;
  canvas.height = document.body.clientHeight + 225;
  gameCoords = game.create({
    xMin: 0,
    xMax: canvas.width / pixelSize,
    yMin: 0,
    yMax: canvas.height / pixelSize,
    density: 0.2,
  });

  console.log(gameCoords);

  if (canvas.getContext) {
    const ctx = canvas.getContext("2d");

    setInterval(() => {
      gameCoords = drawGame(ctx, gameCoords, canvas);
    }, 10);
  }
};

const drawGame = (ctx, gameCoords, canvas) => {
  console.log(gameCoords.length);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  gameCoords.map(([x, y]) => {
    ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
    ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
  });
  const newCoords = game.next(gameCoords);
  //   console.log(newCoords);
  return newCoords;
};
draw();
