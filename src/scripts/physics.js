export function Physics() {
  this.staticShapes = [];   // хитбоксы для всех статических объектов на карте
  this.bodies = [];         // массив всех персонажей
  this.bonuses = [];
}

Physics.prototype.addStaticShapes = function(data) {
  // метод для добавления статический объектов
  data.layers.forEach(layer => {
      if(layer.type == "objectgroup") {
          this.staticShapes.push(...layer.objects); // добавление объектов коллизии в массив
      }
  });
}

Physics.prototype.addKinematicBody = function(name, body) {
  // Добавление в массив объектов тел персонажей и их текущих координат
  this.bodies.push({
    name: name,
    x: body.x,
    y: body.y,
    obj: body
  });
}

Physics.prototype.addBonus = function(name, bonus) {
  // Добавление в массив всех бонусов
  this.bonuses.push({
    name: name,
    x: bonus.x,
    y: bonus.y,
    obj: bonus
  });
}
// UPDATE
Physics.prototype.update = function(time) {
  this.checkCollisionWithStatic(time);
  this.checkCollisionWithDynamic(time);
}

Physics.prototype.checkCollisionWithDynamic = function(time) {
  // Метод, в котором рассчитывается коллизия персонажей с динамическими объектами
  // TEST
  // if( // сравниваем координаты коллизии персонажа ГГ и другого персонажа
  //   ((this.bodies[0].x - 1 + this.bodies[0].obj.collisionShape.indentX + this.bodies[0].obj.collisionShape.width) < this.bodies[1].x + this.bodies[1].obj.collisionShape.indentX) 
  //   &&
  //   ((this.bodies[0].obj.x + this.bodies[0].obj.collisionShape.indentX + this.bodies[0].obj.collisionShape.width) > this.bodies[1].x + this.bodies[1].obj.collisionShape.indentX)
  //   &&
  //   ((this.bodies[0].obj.y + this.bodies[0].obj.collisionShape.indentY) < (this.bodies[1].y + this.bodies[1].obj.collisionShape.indentY + this.bodies[1].obj.collisionShape.height))
  //   &&
  //   ((this.bodies[0].obj.y + this.bodies[0].obj.collisionShape.indentY + this.bodies[0].obj.collisionShape.height) > this.bodies[1].y + this.bodies[1].obj.collisionShape.indentY)
  // ) {
  //   console.log("Есть столкновение!!!")
  // }
  // TEST
  
  this.bodies.forEach(body => {
    let oldX = body.x;
    let oldY = body.y;
    let newX = body.obj.x;
    let newY = body.obj.y;
    // Просчет коллизии для перемещения персонажа ВПРАВО к другому персонажу
    if(newX > oldX) {
      this.bodies.forEach(anotherBody => {
        if(body.obj != anotherBody.obj) {
          if( // сравниваем координаты коллизии персонажа ГГ и другого персонажа
            ((oldX - 1 + body.obj.collisionShape.indentX + body.obj.collisionShape.width) < anotherBody.x + anotherBody.obj.collisionShape.indentX) 
            &&
            ((newX + body.obj.collisionShape.indentX + body.obj.collisionShape.width) > anotherBody.x + anotherBody.obj.collisionShape.indentX)
            &&
            ((newY + body.obj.collisionShape.indentY) < (anotherBody.y + anotherBody.obj.collisionShape.indentY + anotherBody.obj.collisionShape.height))
            &&
            ((newY + body.obj.collisionShape.indentY + body.obj.collisionShape.height) > anotherBody.y + anotherBody.obj.collisionShape.indentY)
          ) {
            newX = oldX;
          }
        }
      });
    }
    // Просчет коллизии для перемещения персонажа ВЛЕВО к другому персонажу
    if(newX < oldX) {
      this.bodies.forEach(anotherBody => {
        if(body.obj != anotherBody.obj) {
          if( 
            ((oldX + 1 + body.obj.collisionShape.indentX) > (anotherBody.x + anotherBody.obj.collisionShape.indentX + anotherBody.obj.collisionShape.width)) 
            &&
            ((newX + body.obj.collisionShape.indentX) < (anotherBody.x + anotherBody.obj.collisionShape.indentX + anotherBody.obj.collisionShape.width))
            &&
            ((newY + body.obj.collisionShape.indentY) < (anotherBody.y + anotherBody.obj.collisionShape.indentY + anotherBody.obj.collisionShape.height))
            &&
            ((newY + body.obj.collisionShape.indentY + body.obj.collisionShape.height) > anotherBody.y + anotherBody.obj.collisionShape.indentY) 
          ) {
            newX = oldX;
          }
        }
      });
    }
    // Просчет коллизии для перемещения персонажа ВНИЗ к другому персонажу
    if(newY > oldY) {
      this.bodies.forEach(anotherBody => {
        if(body.obj != anotherBody.obj) {
          if(
            ((oldY - 1 + body.obj.collisionShape.indentY + body.obj.collisionShape.height) < anotherBody.y + anotherBody.obj.collisionShape.indentY) 
            &&
            ((newY + body.obj.collisionShape.indentY + body.obj.collisionShape.height) > anotherBody.y + anotherBody.obj.collisionShape.indentY)
            &&
            ((newX + body.obj.collisionShape.indentX) < (anotherBody.x + anotherBody.obj.collisionShape.indentX + anotherBody.obj.collisionShape.width))
            &&
            ((newX + body.obj.collisionShape.indentX + body.obj.collisionShape.width) > anotherBody.x + anotherBody.obj.collisionShape.indentX)
          ) {
            newY = oldY;
          }
        }
      });
    }
    // Просчет коллизии для перемещения персонажа ВВЕРХ к другому персонажу
    if(newY < oldY) {
      this.bodies.forEach(anotherBody => {
        if(body.obj != anotherBody.obj) {
          if(
            ((oldY + 1 + body.obj.collisionShape.indentY) > (anotherBody.y + anotherBody.obj.collisionShape.indentY + anotherBody.obj.collisionShape.height)) 
            &&
            ((newY + body.obj.collisionShape.indentY) < (anotherBody.y + anotherBody.obj.collisionShape.indentY + anotherBody.obj.collisionShape.height))
            &&
            ((newX + body.obj.collisionShape.indentX) < (anotherBody.x + anotherBody.obj.collisionShape.indentX + anotherBody.obj.collisionShape.width))
            &&
            ((newX + body.obj.collisionShape.indentX + body.obj.collisionShape.width) > anotherBody.x + anotherBody.obj.collisionShape.indentX)
          ) {
            newY = oldY;
          }
        }
      });
    }

    body.x = newX;
    body.y = newY;
    body.obj.x = newX;
    body.obj.y = newY;
  });
}



Physics.prototype.checkCollisionWithStatic = function(time) {
  // Метод, в котором рассчитывается коллизия персонажей со статическими объектами
  // Перебираются все персонажи для проверки коллизии с ними
  this.bodies.forEach(body => {
    let oldX = body.x;
    let oldY = body.y;
    let newX = body.obj.x;
    let newY = body.obj.y;
    // Далее пойдут проверки условий коллизии с бонусами
    // взависимости от направления движения персонажа
    if(body.name == "player"){
      // Просчет коллизии для перемещения персонажа ВПРАВО к бонусу
      if(newX > oldX) {
        this.bonuses.forEach(bonus => {
          if(
            ((oldX - 1 + body.obj.collisionShape.indentX + body.obj.collisionShape.width) < bonus.x + bonus.obj.collisionShape.indentX) 
            &&
            ((newX + body.obj.collisionShape.indentX + body.obj.collisionShape.width) > bonus.x + bonus.obj.collisionShape.indentX)
            &&
            ((newY + body.obj.collisionShape.indentY) < (bonus.y + bonus.obj.collisionShape.indentY + bonus.obj.collisionShape.height))
            &&
            ((newY + body.obj.collisionShape.indentY + body.obj.collisionShape.height) > bonus.y + bonus.obj.collisionShape.indentY)
          ) {
            body.obj.takenTargetBonuses += 1;
            bonus.obj.takenFlag = true;
            let index = this.bonuses.indexOf(bonus);
            this.bonuses.splice(index, 1);
          }
        });
      }
      // Просчет коллизии для перемещения персонажа ВЛЕВО к бонусу
      if(newX < oldX) {
        this.bonuses.forEach(bonus => {
          if(
            ((oldX + 1 + body.obj.collisionShape.indentX) > (bonus.x + bonus.obj.collisionShape.indentX + bonus.obj.collisionShape.width)) 
            &&
            ((newX + body.obj.collisionShape.indentX) < (bonus.x + bonus.obj.collisionShape.indentX + bonus.obj.collisionShape.width))
            &&
            ((newY + body.obj.collisionShape.indentY) < (bonus.y + bonus.obj.collisionShape.indentY + bonus.obj.collisionShape.height))
            &&
            ((newY + body.obj.collisionShape.indentY + body.obj.collisionShape.height) > bonus.y + bonus.obj.collisionShape.indentY) 
          ) {
            body.obj.takenTargetBonuses += 1;
            bonus.obj.takenFlag = true;
            let index = this.bonuses.indexOf(bonus);
            this.bonuses.splice(index, 1);
          }
        });
      }
      // Просчет коллизии для перемещения персонажа ВНИЗ к бонусу
      if(newY > oldY) {
        this.bonuses.forEach(bonus => {
          if(
            ((oldY - 1 + body.obj.collisionShape.indentY + body.obj.collisionShape.height) < bonus.y + bonus.obj.collisionShape.indentY) 
            &&
            ((newY + body.obj.collisionShape.indentY + body.obj.collisionShape.height) > bonus.y + bonus.obj.collisionShape.indentY)
            &&
            ((newX + body.obj.collisionShape.indentX) < (bonus.x + bonus.obj.collisionShape.indentX + bonus.obj.collisionShape.width))
            &&
            ((newX + body.obj.collisionShape.indentX + body.obj.collisionShape.width) > bonus.x + bonus.obj.collisionShape.indentX)
          ) {
            body.obj.takenTargetBonuses += 1;
            bonus.obj.takenFlag = true;
            let index = this.bonuses.indexOf(bonus);
            this.bonuses.splice(index, 1);
          }
        });
      }
      // Просчет коллизии для перемещения персонажа ВВЕРХ к бонусу
      if(newY < oldY) {
        this.bonuses.forEach(bonus => {
          if(
            ((oldY + 1 + body.obj.collisionShape.indentY) > (bonus.y + bonus.obj.collisionShape.indentY + bonus.obj.collisionShape.height)) 
            &&
            ((newY + body.obj.collisionShape.indentY) < (bonus.y + bonus.obj.collisionShape.indentY + bonus.obj.collisionShape.height))
            &&
            ((newX + body.obj.collisionShape.indentX) < (bonus.x + bonus.obj.collisionShape.indentX + bonus.obj.collisionShape.width))
            &&
            ((newX + body.obj.collisionShape.indentX + body.obj.collisionShape.width) > bonus.x + bonus.obj.collisionShape.indentX)
          ) {
            body.obj.takenTargetBonuses += 1;
            bonus.obj.takenFlag = true;
            let index = this.bonuses.indexOf(bonus);
            this.bonuses.splice(index, 1);
          }
        });
      }
    }
    // Далее пойдут проверки условий коллизии с элементами карты
    // взависимости от направления движения персонажа
    // Просчет коллизии для перемещения персонажа ВПРАВО
    if(newX > oldX) {
      this.staticShapes.forEach(shape => {
        if(
          ((oldX - 1 + body.obj.collisionShape.indentX + body.obj.collisionShape.width) < shape.x) 
          &&
          ((newX + body.obj.collisionShape.indentX + body.obj.collisionShape.width) > shape.x)
          &&
          ((newY + body.obj.collisionShape.indentY) < (shape.y + shape.height))
          &&
          ((newY + body.obj.collisionShape.indentY + body.obj.collisionShape.height) > shape.y) 
        ) {
          // определяем объекты, которые пересекались с персонажем и определяем координаты объектов
          // Чтобы найти координату X необходимо отнять локальную координату коллизии и ширину коллизии

          // x = Math.min(x + body.obj.collisionShape.indentX + body.obj.collisionShape.width, shape.x) -
          // body.obj.collisionShape.indentX - body.obj.collisionShape.width;
          newX = oldX;
        }
      });
    }
    // Просчет коллизии для перемещения персонажа ВЛЕВО
    if(newX < oldX) {
      this.staticShapes.forEach(shape => {
        if(
          ((oldX + 1 + body.obj.collisionShape.indentX) > (shape.x + shape.width)) 
          &&
          ((newX + body.obj.collisionShape.indentX) < (shape.x + shape.width))
          &&
          ((newY + body.obj.collisionShape.indentY) < (shape.y + shape.height))
          &&
          ((newY + body.obj.collisionShape.indentY + body.obj.collisionShape.height) > shape.y) 
        ) {
          // определяем объекты, которые пересекались с персонажем и определяем координаты объектов
          // Чтобы найти координату X необходимо отнять локальную координату коллизии и ширину коллизии

          // x = Math.max(x + body.obj.collisionShape.indentX , shape.x + shape.width) -
          // body.obj.collisionShape.indentX;
          newX = oldX;
        }
      });
    }
    // Просчет коллизии для перемещения персонажа ВНИЗ
    if(newY > oldY) {
      this.staticShapes.forEach(shape => {
        if(
          ((oldY - 1 + body.obj.collisionShape.indentY + body.obj.collisionShape.height) < shape.y) 
          &&
          ((newY + body.obj.collisionShape.indentY + body.obj.collisionShape.height) > shape.y)
          &&
          ((newX + body.obj.collisionShape.indentX) < (shape.x + shape.width))
          &&
          ((newX + body.obj.collisionShape.indentX + body.obj.collisionShape.width) > shape.x) 
        ) {
          // определяем объекты, которые пересекались с персонажем и определяем координаты объектов
          // Чтобы найти координату X необходимо отнять локальную координату коллизии и ширину коллизии

          // y = Math.min(y + body.obj.collisionShape.indentY + body.obj.collisionShape.height, shape.y) -
          // body.obj.collisionShape.indentY - body.obj.collisionShape.height;
          newY = oldY;
        }
      });
    }
    // Просчет коллизии для перемещения персонажа ВВЕРХ
    if(newY < oldY) {
      this.staticShapes.forEach(shape => {
        if(
          ((oldY + 1 + body.obj.collisionShape.indentY) > (shape.y + shape.height)) 
          &&
          ((newY + body.obj.collisionShape.indentY) < (shape.y + shape.height))
          &&
          ((newX + body.obj.collisionShape.indentX) < (shape.x + shape.width))
          &&
          ((newX + body.obj.collisionShape.indentX + body.obj.collisionShape.width) > shape.x) 
        ) {
          // определяем объекты, которые пересекались с персонажем и определяем координаты объектов
          // Чтобы найти координату X необходимо отнять локальную координату коллизии и ширину коллизии

          // y = Math.max(y + body.obj.collisionShape.indentY, shape.y + shape.height) -
          // body.obj.collisionShape.indentY;
          newY = oldY;
        }
      });
    }
    // В конце этого метода происходит возвращение персонажа на ту точку откуда он
    // начал входить в объект коллизии и присваиваем в стартовую точку полученную новую точку
    body.x = newX;
    body.y = newY;
    body.obj.x = newX;
    body.obj.y = newY;
  })
}