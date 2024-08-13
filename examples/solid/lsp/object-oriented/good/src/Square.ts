import { Shape } from "./Shape";

export class Square extends Shape {
  constructor(private side: number) {
    super();
  }

  setSide(side: number) {
    this.side = side;
  }

  getArea(): number {
    return this.side * this.side;
  }

  getSide(): number {
    return this.side;
  }
}
