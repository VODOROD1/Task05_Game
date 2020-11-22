// Метод-конструктор для задания обзора за главным героем (ГГ), что то вроде камеры
// Задаем по-умолчанию размеры камеры и предел на которое она может перемещаться (размер карты)
export function Camera({width = 640, height = 640, limitX = 50000, limitY = 50000, scrollEdge = 200} = {}) {
  // задаем начальное положение камеры (верхний левый угол)
  this.x = 50;
  this.y = 800;
  // this.x = 0;
  // this.y = 0;
  this.width = width;
  this.height = height;
  this.limitX = limitX;
  this.limitY = limitY;
  this.watchObject = false;
  this.obj = null;
  this.scrollEdge = scrollEdge;
}
// Методы, которые следит за перемещениями ГГ
Camera.prototype.watch = function(obj) {
  this.watchObject = true;
  this.obj = obj;
}
// Метод для обновления координат камеры
Camera.prototype.update = function(time) {
  // камера начинает свое движение только тогда когда ГГ приближается к краю экрана
  if(this.watchObject) {
    // Заранее определяет то что персонаж вышел за пределы экрана
    // По X
    if(this.obj.x > (this.x + this.width - this.scrollEdge)) {
      this.x = Math.min(this.limitX, this.obj.x - this.width + this.scrollEdge);
    }
    if(this.obj.x < (this.x + this.scrollEdge)) {
      this.x = Math.max(0, this.obj.x - this.scrollEdge);
    }
    // По Y
    if(this.obj.y > (this.y + this.height - this.scrollEdge)) {
      this.y = Math.min(this.limitY, this.obj.y - this.height + this.scrollEdge);
    }
    if(this.obj.y < (this.y + this.scrollEdge)) {
      this.y = Math.max(0, this.obj.y - this.scrollEdge);
    }
  }
}
