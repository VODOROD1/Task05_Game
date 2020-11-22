// базовый класс сцены
export function Scene(game){
  this.game = game;
  this.status = this.WORKING; // текущий статус текущей сцены
}
// Здесь определяются все возможные состояния всех сцен
Object.defineProperties(Scene.prototype, {
  
  WORKING:    { get: function() { return 'WORKING'; } },        // является статусом "сцена выполняется" для всех сцен

  LOADED:     { get: function() { return 'LOADED'; } },         // переход с loading на menu
  START_GAME: { get: function() { return 'START_GAME'; } },     // переход с menu на game-level
  PAUSE_GAME: { get: function() { return 'START_GAME'; } },     // переход с game-level на menu
  CONTINUE_GAME: { get: function() { return 'START_GAME'; } },  // переход с menu на game-level с прогрессом
  GAME_OVER:  { get: function() { return 'GAME_OVER'; } },      // переход с game-level на game-over
  GAME_WIN:   { get: function() { return 'GAME_WIN'; } },       // переход с game-level на game-win
  FINISHED:   { get: function() { return 'FINISHED'; } }        // 
});

Scene.prototype.initScene = function() {       // для запуска и перезапуска сцены, чтобы вернуть все 
  this.status = Scene.prototype.WORKING;  // параметры в первоначальное состояние
}
Scene.prototype.finishScene = function(status) {
  this.status = status;
}
// можно что то отрисовть в данном методе render и это что то
// появится во всех остальных сценах (например счетчик FPS)
Scene.prototype.renderScene = function(time) {
  
}

















// // базовый класс сцены
// export function Scene(game){
//   this.game = game;
//   this.isActive = true;

//   this.init = function() { // для запуска и перезапуска сцены
//     this.isActive = true;
//   }
//   // можно что то отрисовть в данном методе render и это что то
//   // появится во всех остальных сценах (например счетчик FPS)
//   this.render = function (time) {

//   }
// }