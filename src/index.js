import "normalize.css";

import {
  create,
  createSeeded,
  next,
  boundedNext,
} from "@mark-halls/game-of-life-data";

const pixelSize = 8;

let gameCoords = [];

// const create = (game) => {
//   const random = Math.random().toString();
//   return createSeeded(game, random);
// };
// exports.create = create;

// const createSeeded = (game, seed) => {
//   const rng = seedrandom_1.default.alea(seed);

//   console.log(game);
//   if (!game.density) {
//       game.density = 0;
//   }
//   return naiveRandomCoords(game, rng);
// };

const draw = () => {
  const canvas = document.getElementById("canvas");
  canvas.width = document.body.clientWidth;
  canvas.height = document.body.clientHeight + 225;

  const testing = create({ xMin: 0, xMax: 2, yMin: 0, yMax: 2 });
  // console.log(testing);

  gameCoords = createSeeded(
    {
      xMin: 0,
      xMax: canvas.width / pixelSize,
      yMin: 0,
      yMax: canvas.height / pixelSize,
      density: 0.2,
    },
    "seed"
  );

  console.log(gameCoords);

  if (canvas.getContext) {
    const ctx = canvas.getContext("2d");

    setInterval(() => {
      gameCoords = drawGame(ctx, gameCoords, canvas);
    }, 300);
  }
};

const drawGame = (ctx, gameCoords, canvas) => {
  console.log(gameCoords.length);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  gameCoords.map(([x, y]) => {
    ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
    ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
  });
  const newCoords = boundedNext(
    {
      xMin: 0,
      xMax: canvas.width / pixelSize,
      yMin: 0,
      yMax: canvas.height / pixelSize,
    },
    gameCoords
  );
  //   console.log(newCoords);
  return newCoords;
};
draw();
