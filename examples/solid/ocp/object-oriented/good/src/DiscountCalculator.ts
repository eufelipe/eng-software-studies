import { IDiscountStrategy } from "./interfaces/IDiscountStrategy";

export class DiscountCalculator {
  constructor(private strategy: IDiscountStrategy) {}

  calculateDiscount(purchaseAmount: number): number {
    return this.strategy.calculateDiscount(purchaseAmount);
  }
}
