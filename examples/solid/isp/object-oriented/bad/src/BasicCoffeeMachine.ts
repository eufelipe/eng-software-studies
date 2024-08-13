import { ICoffeeMachine } from "./interfaces/ICoffeeMachine";

export class BasicCoffeeMachine implements ICoffeeMachine {
  brewEspresso(): void {
    console.log("Brewing Espresso");
  }

  brewCappuccino(): void {
    throw new Error("Basic machine cannot brew Cappuccino");
  }

  brewLatte(): void {
    throw new Error("Basic machine cannot brew Latte");
  }

  steamMilk(): void {
    throw new Error("Basic machine cannot steam milk");
  }
}
