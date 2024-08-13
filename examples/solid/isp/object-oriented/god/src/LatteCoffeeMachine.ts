import { ILatteMachine } from "./interfaces/ILatteMachine";

export class LatteCoffeeMachine implements ILatteMachine {
  brewEspresso(): void {
    console.log("Brewing Espresso");
  }

  steamMilk(): void {
    console.log("Steaming Milk");
  }

  brewLatte(): void {
    console.log("Brewing Latte");
  }
}
