import { Scene } from "./scene";
// Сцена паузы
export function Pause(game){
  Scene.call(this, game);
}
Pause.prototype = Object.create(Scene.prototype);

Pause.prototype.init = function() {
  this.initScene();
}
Pause.prototype.render = function(time) {
  this.update(time);
  this.game.screen.drawImage(0, 0, 'title');
  this.game.screen.print(250, 500, 'Нажмите пробел');
  this.renderScene(time);
}
// UPDATE
Pause.prototype.update = function(time) {
  if(this.game.control.pause) {
    this.finishScene(Scene.prototype.START_GAME);
      
  }
}