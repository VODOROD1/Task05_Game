 // Метод, отвечающий за перемещение по направлению
export function Vector(direction, speed) { 
  // хранятся направления, скорость и координаты
  this.setDirection(direction, speed);
}
Vector.prototype.setDirection = function(direction, speed) {
  this.direction = direction;
  this.speed = speed;
  this.x = 0;
  this.y = 0;
  // по направлению определяется x и y
  // для движения вверх отнимаем от y
  switch(direction) {
    case "up":
      this.y = -speed;
      break;
    case "down":
      this.y = speed;
      break;
    case "right":
      this.x = speed;
      break;
    case "left":
      this.x = -speed;
      break;
  }
}
// dt - время между последними фреймами
Vector.prototype.move = function(object, dt) {
  // идет просчет перемещение в котором переменная speed является количеством пикселей в секунду, но
  // т.к. таймер отсчитывает в миллисекундах, то делим это количество на 1000
  object.x += dt * (this.x / 1000);
  object.y += dt * (this.y/1000);
}