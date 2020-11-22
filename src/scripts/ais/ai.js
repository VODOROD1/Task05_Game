// Метод-конструктор для описания скриптов для ИИ
export function AI() {
  this.bodyOfMonster = null;
}

AI.prototype.control = function(bodyOfMonster) {
  this.bodyOfMonster = bodyOfMonster;
}
// UPDATE
AI.prototype.update = function(time) {

}