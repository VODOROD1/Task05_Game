import { Screen } from './screen';
import { ControlState } from './control-state';
import { Scene } from './scenes/scene';
import { Loading } from './scenes/loading';
import { Menu } from './scenes/menu';
import { GameLevel } from './scenes/game-level';
import { GameOver } from './scenes/game-over';
import { GameWin } from './scenes/game-win';
import { Pause } from './scenes/pause';


// requestAnimationFrame для разных браузеров
var myRequestAnimationFrame = (function (callback) {
  return (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (callback) {
        window.setTimeout(callback, 1000 / 60);
    }
  );
}());
//////////////////////////////////////////////////////////////////////////
// Game используется для управления компонентами игры
export function Game({width = 640, height = 640} = {}) {
  // Создаем объект метода который занимается отрисовкой на канвасе
  this.screen = new Screen(width, height);
  // Создаем объект метода, который обрабатывает нажатия пользователя
  this.control = new ControlState();

  this.scenes = {
    loading: new Loading(this),
    menu: new Menu(this),
    gameLevel: new GameLevel(this), // Самая главная сцена -- сцена игрового уровня
    gameWin: new GameWin(this),
    gameOver: new GameOver(this),
    pause: new Pause(this)
  };

  this.currentScene = this.scenes.loading;
  this.currentScene.init();
}
// Метод выбора (смены) сцен
Game.prototype.changeScene = function(status){
  switch (status) {
    case Scene.prototype.LOADED:
      return this.scenes.menu;
    case Scene.prototype.START_GAME:
      return this.scenes.gameLevel;
    case Scene.prototype.GAME_WIN:
      return this.scenes.gameWin;
    default:
      return this.scenes.menu;
  }
}
Game.prototype.gameEngineStep = function(time) {
  let stateOfScene = Scene.prototype.WORKING;
  // механизм переключения сцен -- когда состояние сцены не рабочее, то считаем
  // что свойство завершилось и запускаем метод по смене сцены
  if(this.currentScene.status != stateOfScene) {
    this.currentScene = this.changeScene(this.currentScene.status);
    this.currentScene.init();
  }
  this.currentScene.render(time); // в рендер запускаем текущую сцену
  // setInterval(gameEngineStep(time))
  myRequestAnimationFrame(time => this.gameEngineStep(time));
}

Game.prototype.startEngine = function() {
  myRequestAnimationFrame(time => this.gameEngineStep(time));
}
