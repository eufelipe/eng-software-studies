import { IDiscountStrategy } from "./IDiscountStrategy";

export class PremiumDiscountStrategy implements IDiscountStrategy {
  calculateDiscount(purchaseAmount: number): number {
    return purchaseAmount * 0.15;
  }
}
