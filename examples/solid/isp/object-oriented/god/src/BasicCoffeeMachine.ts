import { IEspressoMachine } from "./interfaces/IEspressoMachine";

export class BasicCoffeeMachine implements IEspressoMachine {
  brewEspresso(): void {
    console.log("Brewing Espresso");
  }
}
