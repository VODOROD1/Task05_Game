import { Body } from "./body";

export function Player(control) {
  Body.call(this, {
    imageName: "player",
    imageWidth: 1536, 
    imageHeight: 2112,
    speed: 100,
    health: 100,
    damage: 100
  });
  this.amountOfTargetBonuses = 10;
  this.takenTargetBonuses = 0;
  this.control = control;
  this.presenceFlag = true;
}
Player.prototype = Object.create(Body.prototype);
// UPDATE
Player.prototype.update = function(time){
  if(this.control.attack) {
    this.attack();
  } else if(this.control.up) {
    this.walk("up");
  } else if(this.control.down) {
    this.walk("down");
  } else if(this.control.left) {
    this.walk("left");
  } else if(this.control.right) {
    this.walk("right");
  } else {
    this.stand(this.velocity.direction);
  }
  this.updateBody(time);
}
