import { Vector } from "../vector";
import { CharacterSheet } from "../factory-methods/character-sheet";

// Метод, являющийся основой для всех персонажей
export function Body({imageName, imageWidth, imageHeight, speed, health, damage}) {
  this.x = 0;         // положение объекта на канвасе по оси x
  this.y = 0;         // положение объекта на канвасе по оси y
  this.speed = speed; // скорость перемещения объекта
  this.velocity = new Vector("down", 0);  // вектор перемещения
  this.lastTime = 0;  // время последнего кадра

  this.attackAnimations = {}; // контейнер для хранения анимаций атаки двуручным оружием
  this.deathAnimations = {};  // контейнер для хранения анимаций смерти
  this.cutAnimations = {};    // контейнер для хранения анимаций атаки коротким оружием
  this.walkAnimations = {};   // контейнер для хранения анимаций хотьбы
  this.stabAnimations = {};   // контейнер для хранения анимаций удара ножом

  this.collisionShape = {indentX: 18, indentY: 25, width: 25, height: 35};  // размер хитбокса персонажа
  this.isAttack = false;  // флаг для отслеживания того что персонаж находится в состоянии атаки
  this.health = health;
  this.damage = damage;
  // Загружаем анимацию передвижения персонажа для всех направлений
  this.allAnimationSheet = new CharacterSheet ({
    imageName: imageName,
    imageWidth: imageWidth, 
    imageHeight: imageHeight,
    spriteWidth: 64,
    spriteHeight: 64
  });
  if(imageName == "player") {
    // Загружаем анимацию атаки двуручным оружием для ГГ
    this.attackAnimationSheet = new CharacterSheet ({
      imageName: imageName,
      imageWidth: imageWidth, 
      imageHeight: imageHeight,
      spriteWidth: 192,
      spriteHeight: 192
    });
  }
  "death".split(",").forEach(name => {
    this.deathAnimations[name] = this.allAnimationSheet.getAnimationOfCharacter(name, 50, false);
  });
  "cut_down,cut_up,cut_left,cut_right".split(",").forEach(name => {
    this.cutAnimations[name] = this.allAnimationSheet.getAnimationOfCharacter(name, 110, false);
  });
  "walk_down,walk_up,walk_left,walk_right".split(",").forEach(name => {
    this.walkAnimations[name] = this.allAnimationSheet.getAnimationOfCharacter(name);
  });
  "stab_down,stab_up,stab_left,stab_right".split(",").forEach(name => {
    this.stabAnimations[name] = this.allAnimationSheet.getAnimationOfCharacter(name, 110, false);
  });
  if(imageName == "player") {
    "attack_down,attack_up,attack_left,attack_right".split(",").forEach(name => {
      this.attackAnimations[name] = this.attackAnimationSheet.getAnimationOfCharacter(name, 110, false);
    });
  }
}

Body.prototype.attack = function() {
  // Атака
  if(!this.isAttack) {
    this.isAttack = true;
    this.view = this.attackAnimations["attack_" + this.velocity.direction];
    // Обработка события при котором анимация подошла к своему последнему фрейму
    this.view.onEnd = () => this.isAttack = false;
    this.view.run();
  }
}

Body.prototype.death = function(){
  // Смерть

}

Body.prototype.cut = function(){
  
  this.velocity.setDirection(direction, this.speed);
  this.view = this.animations["cut_" + direction];
  this.view.run();
}

Body.prototype.walk = function(direction) {
  // Метод для хотьбы персонажа
  if(this.isAttack) {   // во время атаки не может делать другие действия
    return;
  }
// Задали скорость, выбрали анимацию и запустили её
// Вызываем метод вектора
  this.velocity.setDirection(direction, this.speed);
  this.view = this.walkAnimations["walk_" + direction];
  this.view.run();    // запуск анимации
}

Body.prototype.stand = function(direction) {
  if(this.isAttack) {   // во время атаки не может делать другие действия
    return;
  }
  // Для того чтобы персонаж остановился -- нужно обнулить скорость и остановить анимацию
  this.velocity.setDirection(direction, 0);
  this.view = this.walkAnimations["walk_" + direction];
  this.view.stop();
}

// UPDATE
Body.prototype.updateBody = function(time) {
  // Метод для обработки перемещений персонажа
  if(!this.isAttack) {
    // Далее идет расчет перемещений взависимости от вектора скорости
    this.velocity.move(this, time - this.lastTime);
  }
  if(this.lastTime == 0) { // пропускаем первый кадр
    this.lastTime = time;
    return;
  }
  this.lastTime = time;
  // Задаем координаты нашей анимации, которые округляем
  this.view.setXY(Math.trunc(this.x),Math.trunc(this.y));
  this.view.update(time);
}