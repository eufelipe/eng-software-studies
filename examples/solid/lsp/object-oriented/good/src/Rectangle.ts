import { Shape } from "./Shape";

export class Rectangle extends Shape {
  constructor(
    protected width: number,
    protected height: number
  ) {
    super();
  }

  setWidth(width: number) {
    this.width = width;
  }

  setHeight(height: number) {
    this.height = height;
  }

  getArea(): number {
    return this.width * this.height;
  }

  getWidth(): number {
    return this.width;
  }

  getHeight(): number {
    return this.height;
  }
}
