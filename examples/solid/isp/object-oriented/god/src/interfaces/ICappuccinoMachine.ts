import { IEspressoMachine } from "./IEspressoMachine";
import { IMilkSteamer } from "./IMilkSteamer";

export interface ICappuccinoMachine extends IEspressoMachine, IMilkSteamer {
  brewCappuccino(): void;
}
