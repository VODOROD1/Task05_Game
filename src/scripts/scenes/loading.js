import { Scene } from './scene';
// Сцена загрузки
export function Loading(game){
  Scene.call(this, game);
  this.loadedAt = 0;
  //this.nextScene = "menu"; // задаем следующую сцену, т.к. знаем что это может быть за сцена
}
Loading.prototype = Object.create(Scene.prototype);

Loading.prototype.init = function(){
  this.initScene();
  this.loadedAt = 0;
}
Loading.prototype.update = function(time){
  if(this.loadedAt == 0 && this.game.screen.isImagesLoaded == true) {
    this.loadedAt = time;
  }
  if(this.loadedAt != 0 && (time - this.loadedAt) > 50){ // пауза пол секунды между сценами // 500
    this.finishScene(Scene.prototype.LOADED);
  }
}
Loading.prototype.render = function(time) {
  this.update(time);
  this.game.screen.fill("#000000");
  this.game.screen.print(50, 70, "Загрузка...");
  this.renderScene(time);
}

























// import { Scene } from '../scene';
// // Экран загрузки наследуется от сцены
// export function Loading(game){
//   Scene.call(this, game);
//   this.nextScene = "menu"; // задаем следующую сцену, т.к. знаем что это может быть за сцена
  
//   this.renderScene = function(time) {
//     this.game.screen.fill("#000000");
//     Scene.render(time);
//   }
// }

// Loading.prototype = Object.create(Scene.prototype);