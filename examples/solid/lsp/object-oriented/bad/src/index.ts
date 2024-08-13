import { Rectangle } from "./Rectangle";
import { Square } from "./Square";

// Função para aumentar a largura (e apenas a largura) em mais 10
function increaseRectangleWidth(rectangle: Rectangle) {
  const newWidth = rectangle.getWidth() + 10;
  rectangle.setWidth(newWidth);
}

let rectangle = new Rectangle(5, 10);
console.log("rectangle initial:", rectangle.getArea()); // 50
increaseRectangleWidth(rectangle);
console.log("rectangle after:", rectangle.getArea()); // 150 (correto: nova largura 15 * altura 10)

let square = new Square(5);
console.log("square initial:", square.getArea()); // 25
increaseRectangleWidth(square);
console.log("square after:", square.getArea()); // 225 (incorreto para Square) o esperado 75
