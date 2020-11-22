// import {startEngine} from "./engine-script"
import { Game } from "./game";

// var canv = document.getElementById("canvas");
// canv.width = 1000;
// canv.height = 800;
// export const ctx = canv.getContext('2d');

console.log("Запуск начального файла успешен!");
// СТАРТ
// основная программа
// window.onload = () => startEngine();
// тестовая программа
window.onload = () => { // запуск игры сразу же после загрузки документа
  const game = new Game();
  game.startEngine();
};
console.log("Всё еще работает!");
// ctxEnviroment.strokeRect(0,0, 1000, 700);
// ctxEnviroment.fill="black";