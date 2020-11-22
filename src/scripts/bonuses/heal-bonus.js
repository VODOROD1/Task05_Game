import { Bonus } from ".bonus.js"
import { BonusSheet } from "../bonus-sheet.js";

export function HealBonus() {
    Bonus.call(this, {
      imageName: "bonuses",
      imageWidth: 64,
      imageHeight: 256,
    })
}
HealBonus.prototype = Object.create(Bonus.prototype);
// UPDATE
HealBonus.prototype.update = function(time) {
  this.updateBonus();
}