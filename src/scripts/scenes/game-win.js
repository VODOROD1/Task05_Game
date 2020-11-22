import { Scene } from "./scene";
// Сцена меню
export function GameWin(game){
  Scene.call(this, game);
}
GameWin.prototype = Object.create(Scene.prototype);

GameWin.prototype.init = function() {
  this.initScene();
}
GameWin.prototype.render = function(time){
  this.update(time);
  this.game.screen.fill("#000000");
  this.game.screen.print(300, 300, "WIN!!!");
  this.renderScene(time);
}
//UPDATE
GameWin.prototype.update = function(time) {
  
  
}