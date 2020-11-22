export function ControlState(){
  this.up = false;
  this.down = false;
  this.left = false;
  this.right = false;
  this.attack = false; // атака
  this.pause = false; // пауза
  // Создаем коллекцию, состоящую из элементов ключ-значение
  this.keyMap = new Map([
    [65,'left'],[68,'right'],[87,'up'],[83,'down'],[32,'attack'],[27,'pause']  // управление персом
  ]);
  document.addEventListener('keydown', (event) => this.update(event, true));
  document.addEventListener('keyup', (event) => this.update(event, false));
}
// UPDATE
ControlState.prototype.update = function(event, pressed){
  if(this.keyMap.has(event.keyCode)){
    event.preventDefault();
    event.stopPropagation();
    this[this.keyMap.get(event.keyCode)] = pressed;
    // console.log(this);
  }
}
