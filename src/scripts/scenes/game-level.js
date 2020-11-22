import { Scene } from './scene';
import { SpriteSheet } from '../factory-methods/sprite-sheet';
import { Player } from '../dynamic-objects/player';
import { Camera } from '../camera';
import { Physics } from '../physics';
import { MonsterRoaming } from '../dynamic-objects/monster-roaming';
import { TargetBonus } from '../bonuses/target-bonus';
// КОНСТРУКТОР
export function GameLevel(game) {
  Scene.call(this, game);
  // загрузка тайлов для создания карты
  this.mapTiles = new SpriteSheet({
    imageName: 'tileset',
    imageWidth: 1104,
    imageHeight: 736,
    spriteWidth: 16,
    spriteHeight: 16
  });
  this.drawableObjects = [];   // массив объектов, которые будут выводиться на канвас
  // Создание бонусов
  this.targetBonus1 = new TargetBonus();
  this.drawableObjects.push(this.targetBonus1);
  this.targetBonus1.x = 100;
  this.targetBonus1.y = 1000;
  // Создание врагов
  this.orc1 = new MonsterRoaming(); // берем объект Animation переключаем анимации по названию
  this.drawableObjects.push(this.orc1);
  this.orc1.x = 100;
  this.orc1.y = 950;
  // Персонаж -- Главный Герой
  this.player = new Player(this.game.control);
  this.drawableObjects.push(this.player);
  this.player.x = 50;
  this.player.y = 950;
  // Создаем объект метода, который используется для просчета коллизии
  this.physics = new Physics();
}
GameLevel.prototype = Object.create(Scene.prototype);

const mas = [1,2,3,4,5];

Array.prototype.multBy = function(n) {
  return this.map(function(i) {
    return i*n;
  })
}
console.log(mas.multBy(20));

// INIT
GameLevel.prototype.init = function() {
  this.initScene();
  // карту создаем в методе initScene т.к. делается пререндеринг карты из картинок
  // а если бы прописали в конструкторе, то там картинки еще не загружены
  const mapData = require('../../../public/environment/castle.json');
  this.map = this.game.screen.createMap("castle", mapData, this.mapTiles);
  // создаем объект камеры
  this.mainCamera = new Camera({
    width: this.game.screen.width,
    height: this.game.screen.height,
    limitX: this.map.width - this.game.screen.width,
    limitY: this.map.height - this.game.screen.height
  });
  this.mainCamera.watch(this.player);
  this.game.screen.setCamera(this.mainCamera);
  // Далее происходит загрузка форм коллизии
  this.physics.addStaticShapes(mapData);
  this.physics.addKinematicBody("player" ,this.player);
  this.physics.addKinematicBody("orc" ,this.orc1);
  this.physics.addBonus("targetBonus", this.targetBonus1);
}

// ОБЩИЙ UPDATE
GameLevel.prototype.update = function(time){
  // Обновляем сцену игрового уровня, прежде чем рендерить
  // Происходит отсев тех элементов, который имеют флаг precence = false
  this.drawableObjects.forEach(elem => {
    if(elem.presenceFlag == false){
      let index = this.drawableObjects.indexOf(elem);
      this.drawableObjects.splice(index, 1);
    } else {
      elem.update(time);
    }
  })
  // this.orc1.update(time);
  // this.player.update(time);
  // this.targetBonus1.update(time);
  this.physics.update(time);
  this.mainCamera.update(time);
  //Finish сцены
  if(this.player.amountOfTargetBonuses == this.player.takenTargetBonuses){
    this.finishScene(Scene.prototype.GAME_WIN);
  }
}

// RENDER
GameLevel.prototype.render = function(time) {
  this.update(time);
  this.game.screen.fill("#000000");
  // карту переделали в спрайт, поэтому вызываем метод отрисовки спрайта
  this.game.screen.drawSprite(this.map);
  // Вывод на канвас всех объектов
  this.drawableObjects.forEach(elem => {
    this.game.screen.drawSprite(elem.view, elem);
  })
  this.game.screen.print(50, 50, `Score: ${this.player.takenTargetBonuses}`);
  // // Вывод бонусов
  // this.game.screen.drawSprite(this.targetBonus1.view);
  // // Вывод врага
  // this.game.screen.drawSprite(this.orc1.view);
  // // Вывод игрока
  // this.game.screen.drawSprite(this.player.view);
  this.renderScene(time);
}