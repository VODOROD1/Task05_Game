import { SpriteSheet } from "./sprite-sheet";

export function CharacterSheet({imageName, imageWidth, imageHeight, spriteWidth, spriteHeight}) {
  // Метод-фабрика для создания анимаций персонажей
  // пока что принадлежит чисто только орку
  SpriteSheet.call(this, {
    imageName: imageName,
    imageWidth: imageWidth,
    imageHeight: imageHeight,
    spriteWidth: spriteWidth,
    spriteHeight: spriteHeight
  });
  // Данная переменная хранит объект, состоящий из массивов, в каждом из которых находится
  // последовательность индексов спрайтов на картинке персонажа
  this.sequences = this.getSequences(imageName, spriteWidth);
}
CharacterSheet.prototype = Object.create(SpriteSheet.prototype);

CharacterSheet.prototype.getSequences = function(imageName, spriteWidth) {
  // В данном методе загружаем все последовательности анимации, которые были созданы в программе tiled
  let data = null;
  // Далее проиходит распарсинг json-файлов
  if(imageName == "orc" && spriteWidth == 64){
    data = require('../../../public/animations/orc-animations.json');
  }else if(imageName == "player" && spriteWidth == 64){
    data = require('../../../public/animations/player-animations.json');
  } else if(imageName == "player" && spriteWidth == 192) {
    data = require('../../../public/animations/player-attack-animations.json');
  }
  const sequences = {};
  data.layers.forEach(layer => {
    sequences[layer.name] = layer.data.filter(i => i > 0);
  });
  return sequences;
}

CharacterSheet.prototype.getAnimationOfCharacter = function(name, speed=100, repeat=true, autorun=true) {
  // В данном методе можно получить объект анимации, передав сюда название нужной анимации
  // Задаем скорость по умолчанию 100
  return this.getAnimation(this.sequences[name], speed, repeat, autorun);
}
