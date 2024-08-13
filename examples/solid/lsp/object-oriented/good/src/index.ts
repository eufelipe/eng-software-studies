import { Rectangle } from "./Rectangle";
import { Square } from "./Square";

// Função específica para Retângulo para aumentar a largura (e apenas a largura) em mais 10
function increaseRectangleWidth(rectangle: Rectangle) {
  rectangle.setWidth(rectangle.getWidth() + 10);
}

let rectangle = new Rectangle(5, 10);
console.log("rectangle initial:", rectangle.getArea()); // 50
increaseRectangleWidth(rectangle);
console.log("rectangle after:", rectangle.getArea()); // 150

let square = new Square(5);
console.log("square initial:", square.getArea()); // 25
square.setSide(7); // Mudança de lado independente
console.log("square after:", square.getArea()); // 49
