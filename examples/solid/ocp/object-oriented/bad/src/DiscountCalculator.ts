export enum CustomerType {
  Regular,
  Premium,
  VIP,
}

export class DiscountCalculator {
  calculateDiscount(
    customerType: CustomerType,
    purchaseAmount: number
  ): number {
    if (customerType === CustomerType.Regular) {
      return purchaseAmount * 0.1;
    } else if (customerType === CustomerType.Premium) {
      return purchaseAmount * 0.15;
    } else if (customerType === CustomerType.VIP) {
      return purchaseAmount * 0.2;
    }
    return 0;
  }
}
