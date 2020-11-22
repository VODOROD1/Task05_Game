import { BonusSheet } from '../factory-methods/bonus-sheet'

export function Bonus({imageName, imageWidth, imageHeight, amountOfPoints, index}) {
  this.x = 0;         // положение объекта по оси x
  this.y = 0;         // положение объекта по оси y
  this.collisionShape = {indentX: 10, indentY: 8, width: 13, height: 15};  // размер хитбокса
  // this.collisionShape = {x: 15, y: 10, width: 1, height: 1};  // размер хитбокса
  this.lastTime = 0;
  this.amountOfPoints = amountOfPoints;
  this.index = index;

  const bonusSheet = new BonusSheet({
    imageName: imageName,
    imageWidth: imageWidth, 
    imageHeight: imageHeight,
  });
  this.view = bonusSheet.getSpriteOfBonus(index);
}

// UPDATE
Bonus.prototype.updateBonus = function(time) {
  this.view.setXY(Math.trunc(this.x),Math.trunc(this.y));
}