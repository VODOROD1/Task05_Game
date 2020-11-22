import { AI } from "./ai";
// Самый простейший враг, просто бродящий монстр
export function SimpleAI() {
  AI.call(this);
  // Здесь хранятся все состояния монстра с данным ИИ
  this.duration = 3000;     // продолжительность движения в данном направлении
  this.directionOfWalk = "down";  // направление движения
  this.lastTimeOfChangeDirection = 0;        // когда последний раз менял направление движения
  this.directionOfAttack = null;
  this.dead = null;
}
SimpleAI.prototype = Object.create(AI.prototype);

SimpleAI.prototype.changeDirectionOfWalk = function() {
  // Метод для просчета смены направления хотьбы
  // рандомно меняется направление
  this.directionOfWalk = "down,up,left,right".split(',')[Math.floor(Math.random()*4)];
}

// SimpleAI.prototype.turnONDead = function() {
//   // выбор анимации смерти
//   this.bodyOfMonster
// }

// SimpleAI.prototype.changeDirectionOfAttack = function() {
//   // смена направления атаки
//   if(true){
//     this.directionOfAttack = "";
//   }
// }

// UPDATE
SimpleAI.prototype.updateSimpleAI = function(time) {
  // Здесь происходит выбор того какая анимация должна появиться в следующем рендере
  // Если время, прошедшее после последнего апдейта выше чем продолжительность движения в данном направлении
  // то вызываем метод по смене направления
  if((time - this.lastTimeOfChangeDirection) > this.duration){
    this.changeDirectionOfWalk();
    this.lastTimeOfChangeDirection = time;
  }
  this.bodyOfMonster.walk(this.directionOfWalk);
  // Если здоровья меньше 0 то умирает
  if(this.bodyOfMonster.health < 1){
    this.turnONDead();
  }
  // Если ГГ рядом то атакует
  // if(true){
  //   this.changeDirectionOfAttack();
  // }
  this.update(time);
}