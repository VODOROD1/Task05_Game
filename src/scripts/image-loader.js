// метод для создания объектов изображений
export function ImageLoader(pathOfImageFiles){
  this.pathOfImageFiles=pathOfImageFiles;
  this.images = {};
}

ImageLoader.prototype.load = function(){
  let promises = [];

  for(let name in this.pathOfImageFiles){
    promises.push(this.loadImage(name, this.pathOfImageFiles[name]));
  }
  // заострить внимание
  return Promise.all(promises);
}

ImageLoader.prototype.loadImage = function(name, src){
  // ПРОМИС
  return new Promise((resolve) => {
      const image = new Image();
      image.src = src;
      this.images[name] = image;
      image.onload = () => resolve(name);
    }
  );
}
