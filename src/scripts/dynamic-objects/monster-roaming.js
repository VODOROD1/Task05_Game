import { Body } from "./body";
import { SimpleAI } from "../ais/simpleAI";
// В конструкторе находится хранилище значений характеристик монстров
export function MonsterRoaming() {
  Body.call(this, {
    imageName: "orc", 
    imageWidth: 832, 
    imageHeight: 1344,
    speed: 50,
    health: 120,
    damage: 90
  });
  this.presenceFlag = true;
  this.ai = new SimpleAI();
  this.ai.control(this);
}
MonsterRoaming.prototype = Object.create(Body.prototype);

// UPDATE
MonsterRoaming.prototype.update = function(time) {
  this.ai.updateSimpleAI(time);
  this.updateBody(time);
}
