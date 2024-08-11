import { IDiscountStrategy } from "./IDiscountStrategy";

export class RegularDiscountStrategy implements IDiscountStrategy {
  calculateDiscount(purchaseAmount: number): number {
    return purchaseAmount * 0.1;
  }
}
