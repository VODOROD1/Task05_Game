import { ImageLoader } from './image-loader';
import { TileMap } from './tile-map';
// данный конструктор используется для управления экраном
export function Screen(width, height){
  this.width = width;
  this.height = height;
  this.canvas = this.createCanvas(width, height);
  this.context = this.canvas.getContext('2d');
  this.images={};
  this.isImagesLoaded = false;
  this.camera = null;
  this.isCameraSet = false;
  // Указываем пути до картинок
  this.loadImages({
    orc: '../../public/img/orc.png',
    player: '../../public/img/player.png',
    title: '../../public/img/title.jpg',
    tileset: '../../public/img/tileset.png',
    bonuses: '../../public/img/bonuses.png'
  });
}

Screen.prototype.loadImages = function(pathOfImageFiles){
  // Создаем объект для загрузки изображений
  const loader = new ImageLoader(pathOfImageFiles);
  let promises = loader.load();
  // ОБРАБОТКА ПРОМИСА
  promises.then( // сработает только при успешном выполнении
    (names) => {
      this.images = Object.assign(this.images, loader.images);
      this.isImagesLoaded = true;
      console.log(names);
    }
  );
}

Screen.prototype.createCanvas = function(width, height) {
  // данная функция используется для того чтобы получить уже 
  // существующий канвас или же создать новый
  let elements = document.getElementsByTagName('canvas');
  let canvas = elements[0] || document.createElement('canvas');
  document.body.appendChild(canvas);
  canvas.width = width;
  canvas.height = height;
  return canvas;
}

Screen.prototype.fill = function(color) {
  this.context.fillStyle = color;
  this.context.fillRect(0, 0, this.width, this.height);
}

Screen.prototype.print = function(x, y, text){
  this.context.fillStyle = "#FFFFFF";
  this.context.font = "22px Georgia";
  this.context.fillText(text, x, y);
}
// Метод для отображения изображения
Screen.prototype.drawImage = function(x, y, imageName){
  let someImage = this.images[imageName];
  this.context.drawImage(this.images[imageName], x, y);
}
// Метод для отображения спрайта
Screen.prototype.drawSprite = function(sprite, elem) {
  // Спрайт смещается относительно поля камеры
  let spriteX = sprite.x;
  let spriteY = sprite.y;

  if(this.isCameraSet) {
    spriteX -= this.camera.x;
    spriteY -= this.camera.y;
  }
  // Оптимизация отрисовки спрайта, те спрайты, которые находятся за 
  // пределами камеры не будут отрисовываться
  if(
      (spriteX >= this.width) ||
      (spriteY >= this.height) ||
      ((spriteX + sprite.width) <= 0) ||
      ((spriteY + sprite.height) <= 0)
  ) {
    return;
  }

  let sourceX = sprite.sourceX + Math.abs(Math.min(0, spriteX));
  let sourceY = sprite.sourceY + Math.abs(Math.min(0, spriteY));
  let width = Math.min(this.width, spriteX + sprite.width) - Math.max(0, spriteX);
  let height = Math.min(this.height, spriteY + sprite.height) - Math.max(0, spriteY);

  this.context.drawImage ( 
    this.images[sprite.imageName],
    sourceX, 
    sourceY, 
    width, 
    height,
    Math.max(0, spriteX), 
    Math.max(0, spriteY), 
    width, 
    height 
  );

  // Нарисуем временно контур коллизии вокруг объекта
  if(sprite.imageName != "castle") {
    this.context.strokeStyle = "blue";
    this.context.lineWidth = 2;
    this.context.strokeRect(
      Math.max(0, spriteX) + elem.collisionShape.indentX, 
      Math.max(0, spriteY) + elem.collisionShape.indentY,  
      elem.collisionShape.width, 
      elem.collisionShape.height
    )
    this.context.strokeStyle = "yellow";
    this.context.strokeRect(
      Math.max(0, spriteX), 
      Math.max(0, spriteY),  
      sprite.width, 
      sprite.height
    )
  }
}

Screen.prototype.createMap = function(name, mapData, mapTileset) {
  // Метод для создания конвертации карты как набора спрайтов в карту как картинку
  // передаем будущее название картинки, данные из json-файла и набор файлов из которых рисуется карта
  // От tileset ожидается объект типа SpriteSheet, который используется для того чтобы найти
  // нужный тайл по индексу, а далее отрисовываем в нужное место на карте используя cal/row
  // Для карты создается новый канвас, на котором она будет рисоваться
  const mapImage = document.createElement('canvas');
  // значения используются из json-файла карты
  mapImage.width = mapData.width * mapData.tilewidth;
  mapImage.height = mapData.height * mapData.tileheight;
  const mapContext = mapImage.getContext('2d');
  const hitboxes = [];
  let row, col;   // номера ряда и колонки на карте
  // у слоев тип tilelayer, а у объектов objectgroup
  mapData.layers.forEach(layer => {
    if(layer.type == "tilelayer") {
      row = 0;
      col = 0;
      layer.data.forEach( index => {  // порядковый номер тайла
          // прорисовываем тайл если индекс не равен нулю
          if(index > 0) {
              mapContext.drawImage(this.images[mapTileset.imageName],
              mapTileset.getSourceX(index), mapTileset.getSourceY(index),
              mapData.tilewidth, mapData.tileheight,
              col * mapData.tilewidth, row * mapData.tileheight,
              mapData.tilewidth, mapData.tileheight,
              );
          }
          col++;
          if(col > (mapData.width - 1)){
            col = 0;
            row++;
          }
        }
      );
    }
    // Сохраняем данные для коллизии в hitboxes
    if(layer.type == "objectgroup") {
      hitboxes.push(...layer.objects.map(obj => ({x1: obj.x, x2: obj.x + obj.width, y1: obj.y, y2: obj.y + obj.height})));
    }
  });
  // Добавляем созданное изображение карты в загруженные изображения
  this.images[name] = mapImage;
  return new TileMap({
    imageName: name,
    sourceX: 0,
    sourceY: 0,
    width: mapImage.width,
    height: mapImage.height,
    hitboxes: hitboxes
  });
}
// Метод установки камеры
Screen.prototype.setCamera = function(camera) {
  this.camera = camera;
  this.isCameraSet = true;
}