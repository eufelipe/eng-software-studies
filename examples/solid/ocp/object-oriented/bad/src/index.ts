import { CustomerType, DiscountCalculator } from "./DiscountCalculator";

function main() {
  const calculator = new DiscountCalculator();

  console.log(calculator.calculateDiscount(CustomerType.Regular, 100)); // 10
  console.log(calculator.calculateDiscount(CustomerType.Premium, 100)); // 15
  console.log(calculator.calculateDiscount(CustomerType.VIP, 100)); // 20
}

main();
