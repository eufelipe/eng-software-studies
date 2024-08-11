export interface IDiscountStrategy {
  calculateDiscount(purchaseAmount: number): number;
}
