import { Rectangle } from "./Rectangle";

export class Square extends Rectangle {
  constructor(side: number) {
    super(side, side);
  }

  setWidth(width: number) {
    this.width = this.height = width;
  }

  setHeight(height: number) {
    this.height = this.width = height;
  }
}
