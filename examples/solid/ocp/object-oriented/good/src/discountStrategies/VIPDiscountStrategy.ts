import { IDiscountStrategy } from "../interfaces/IDiscountStrategy";

export class VIPDiscountStrategy implements IDiscountStrategy {
    calculateDiscount(purchaseAmount: number): number {
      return purchaseAmount * 0.2;
    }
  }