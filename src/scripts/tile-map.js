import { Sprite } from "./sprite";
// Данная функция представляет реализацию карты, которая является просто спрайтом с массивом hitboxes
// Будем делать пререндер карты и использовать её как картинку
export function TileMap(props){
  Sprite.call(this, props);
  this.hitboxes = props.hitboxes || [];
}
TileMap.prototype = Object.create(Sprite.prototype);
