import { DiscountCalculator } from "./DiscountCalculator";

import { RegularDiscountStrategy } from "./discountStrategies/RegularDiscountStrategy";
import { VIPDiscountStrategy } from "./discountStrategies/VIPDiscountStrategy";

import { IDiscountStrategy } from "./interfaces/IDiscountStrategy";

// Uso inicial com estratégias existentes

const regularCalculator = new DiscountCalculator( new RegularDiscountStrategy());
console.log(regularCalculator.calculateDiscount(100)); // 10

const vipCalculator = new DiscountCalculator(new VIPDiscountStrategy());
console.log(vipCalculator.calculateDiscount(100)); // 20

// Adicionando um novo tipo de desconto sem modificar o código existente
class SuperVIPDiscountStrategy implements IDiscountStrategy {
  calculateDiscount(purchaseAmount: number): number {
    return purchaseAmount * 0.25;
  }
}

// Criando uma nova instância do DiscountCalculator com a nova estratégia
const superVIPCalculator = new DiscountCalculator(
  new SuperVIPDiscountStrategy()
);
console.log(superVIPCalculator.calculateDiscount(100)); // 25
