import { Scene } from "./scene";
// Сцена меню
export function Menu(game){
  Scene.call(this, game);
}
Menu.prototype = Object.create(Scene.prototype);

Menu.prototype.init = function() {
  this.initScene();
}
Menu.prototype.render = function(time){
  this.update(time);
  this.game.screen.drawImage(0, 0, 'title');
  this.game.screen.print(250, 500, 'Нажмите пробел');
  this.renderScene(time);
}
//UPDATE
Menu.prototype.update = function(time) {
  //Finish сцены
  if(time > 50) {
    this.finishScene(Scene.prototype.START_GAME);
  }
}