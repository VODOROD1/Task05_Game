import { SpriteSheet } from "./sprite-sheet";

export function BonusSheet({imageName, imageWidth, imageHeight}) {
  SpriteSheet.call(this, {
    imageName: imageName,
    imageWidth: imageWidth,
    imageHeight: imageHeight,
    spriteWidth: 32,
    spriteHeight: 32
  });
}
BonusSheet.prototype = Object.create(SpriteSheet.prototype);

BonusSheet.prototype.getSpriteOfBonus = function(index) {
  // В данном методе можно получить объект спрайта
  return this.getSprite(index);
}