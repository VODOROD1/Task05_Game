import { Sprite } from './sprite';
// Анимация, в каждом фрейме, является просто спрайтом
// поэтому требуется просто в каждом фрейме менять один спрай на другой
// Принимаются следующие параметры:
//  - imageName - название картинки со спрайтами
//  - frames - массив объектов, где в каждом объекте находятся координаты отдельно взятого спрайта на листе спрайтов
//  - speed - скорость анимации
//  - флаги, задающие поведение анимации -- повторять ли анимацию после завершения, запускать ли анимацию сразу или ждать команды на запуск
export function Animation({imageName, frames, speed, repeat = true, 
  autorun = true, width = 16, height = 16}) { //width = 64, height = 64
  Sprite.call(this, {
    imageName: imageName, 
    sourceX: frames[0].sx, 
    sourceY: frames[0].sy, 
    width: width, 
    height: height
  });
  this.frames = frames;
  this.speed = speed;
  this.repeat = repeat;
  this.running = autorun;
  this.lastTime = 0;            // время от последнего фрейма анимации
  this.currentFrame = 0;        // текущая координата
  this.totalFrames = this.frames.length;  // общее количество фреймов
  this.onEnd = null;
}
Animation.prototype = Object.create(Sprite.prototype);

Animation.prototype.setFrame = function(index) {
  // метод для установки текущего фрейма
  this.currentFrame = index;
  this.sourceX = this.frames[index].sx;
  this.sourceY = this.frames[index].sy;
}

Animation.prototype.run = function() {
  // методы контроля для запуска и остановки анимации
  if(!this.running){
    this.setFrame(0);
    this.running = true;
  }
}

Animation.prototype.stop = function() {
  // метод остановки анимации на текущем фрейме
  this.running = false;
}

Animation.prototype.nextFrame = function() {
  // Метод для определения следующего фрейма, этот метод
  // определит конец анимации и запустит её сначала, либо остановит её
  if((this.currentFrame + 1) == this.totalFrames) {
    if(this.onEnd) {
      // Вызов обработчика события при котором анимация подошла к своему последнему фрейму
      this.onEnd();
    }
    if(this.repeat) {
      this.setFrame(0);
      return;
    }
    this.stop();
    return;
  }
  this.setFrame(this.currentFrame + 1);
}
// UPDATE
Animation.prototype.update = function(time) {
  // Здесь определяется каким будет текущий фрейм в данной анимации
  //метод, который будет обновлять анимацию в цикле
  if(!this.running) {
    return;
  }
  if(this.lastTime == 0) {
    this.lastTime = time;
    return;
  }
  if((time - this.lastTime) > this.speed) {
    this.nextFrame();
    this.lastTime = time;
  }
}