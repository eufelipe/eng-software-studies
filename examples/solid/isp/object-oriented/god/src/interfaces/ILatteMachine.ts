import { IEspressoMachine } from "./IEspressoMachine";
import { IMilkSteamer } from "./IMilkSteamer";

export interface ILatteMachine extends IEspressoMachine, IMilkSteamer {
  brewLatte(): void;
}
