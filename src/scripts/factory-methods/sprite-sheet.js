import { Sprite } from "../sprite";
import { Animation } from "../animation"
// МЕТОД-ФАБРИКА для создания спрайтов
// Этот метод своего рода объект-отображение картинки со спрайтами 
// Передаем следующие параметры:
//  - название картинки со спрайтами
//  - размеры этой картинки
// - размеры спрайта
export function SpriteSheet({imageName, imageWidth, imageHeight, spriteWidth, spriteHeight}) {
  this.imageName = imageName;
  this.imageWidth = imageWidth;
  this.imageHeight = imageHeight;
  this.spriteWidth = spriteWidth;
  this.spriteHeight = spriteHeight;
}

SpriteSheet.prototype.getAnimation = function(indexes, speed, repeat = true, autorun = true) {
  // метод для создания анимаций (набор спрайтов)
  // задаем кадры по порядковому номеру на спрайт-листе
  return new Animation({
    imageName: this.imageName,
    // создаёт новый массив, который будет состоять из результатов вызова callback(item, i, arr) для каждого элемента arr 
    // В данной стрелочной функции возвращается объектный литерал, таким образом происходит создание массива объектов,
    // в которых находятся координаты на листе спрайтов. с 
    frames: indexes.map(index => ({sx: this.getSourceX(index), sy: this.getSourceY(index)})),
    speed: speed, // скорость анимации
    repeat: repeat, // флаг на повторение анимации
    autorun: autorun, // флаг на автозапуск анимации
    width: this.spriteWidth,
    height: this.spriteHeight
  });
}

SpriteSheet.prototype.getSprite = function(index) {
  // Метод для получения статичных объектов, т.е. всеголишь одного спрайта
  // Передаем просто порядковый номер спрайта, который хотим получить, на листе спрайтов
  return new Sprite({
    imageName: this.imageName,
    sourceX: this.getSourceX(index),
    sourceY: this.getSourceY(index),
    width: this.spriteWidth,
    height: this.spriteHeight
  });
}

// Методы для определения координат спрайта на картинке по его номеру
SpriteSheet.prototype.getSourceX = function(index) {
  return (--index * this.spriteWidth) % this.imageWidth;
}
SpriteSheet.prototype.getSourceY = function(index) {
  return Math.trunc((--index * this.spriteWidth) / this.imageWidth) * this.spriteHeight;
}