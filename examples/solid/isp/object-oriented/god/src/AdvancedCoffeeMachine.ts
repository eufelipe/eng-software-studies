import { ICappuccinoMachine } from "./interfaces/ICappuccinoMachine";

export class AdvancedCoffeeMachine implements ICappuccinoMachine {
  brewEspresso(): void {
    console.log("Brewing Espresso");
  }

  steamMilk(): void {
    console.log("Steaming Milk");
  }

  brewCappuccino(): void {
    console.log("Brewing Cappuccino");
  }
}
