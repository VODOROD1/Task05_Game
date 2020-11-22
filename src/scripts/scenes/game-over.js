import { Scene } from "./scene";
// Сцена меню
export function GameOver(game){
  Scene.call(this, game);
}
GameOver.prototype = Object.create(Scene.prototype);

GameOver.prototype.init = function() {
  this.initScene();
}
GameOver.prototype.render = function(time){
  this.update(time);
  this.game.screen.drawImage(0, 0, 'title');
  this.game.screen.print(250, 500, 'Нажмите пробел');
  this.renderScene(time);
}
//UPDATE
GameOver.prototype.update = function(time) {
  // if(this.game.control.fire) {
  if(time > 50) {
    this.finishScene(Scene.prototype.START_GAME);
  }
}