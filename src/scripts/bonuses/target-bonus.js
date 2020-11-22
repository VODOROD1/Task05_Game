import { Bonus } from "./bonus";

export function TargetBonus() {
  Bonus.call(this,{
    imageName: "bonuses",
    imageWidth: 64,
    imageHeight: 256,
    amountOfPoints: 10,
    index: 1
  })
  this.takenFlag = false;
  this.presenceFlag = true;
}
TargetBonus.prototype = Object.create(Bonus.prototype);

//UPDATE
TargetBonus.prototype.update = function(time) {
  this.updateBonus(time);
  if(this.takenFlag){
    this.presenceFlag = false;
  }
}
