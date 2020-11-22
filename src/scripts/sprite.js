//  Чтобы отобразить спрайт из набора спрайтов требуется знать след. данные: 
//  - название загруженной картинки (листа со спрайтами)
//  - положение спрайта на листе
//  - размер спрайта
//  - положение на канвасе
export function Sprite({imageName, sourceX, sourceY, width = 16, height = 16}) { // width = 64, height = 64
  this.imageName = imageName;
  // положение на картинке
  this.sourceX = sourceX;
  this.sourceY = sourceY;
  this.width = width;
  this.height = height;
  this.x = 0;
  this.y = 0;
}
// метод для перемещения спрайта по экрану
Sprite.prototype.setXY = function(x, y) {
  if(this.width == 192) {
    // условие чтобы большой спрайт атаки отрисовывался с поправкой
    this.x = x - 64;
    this.y = y - 64;
  } else {
    this.x = x;
    this.y = y;
  }
}

