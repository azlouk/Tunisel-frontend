import { AnalysesChimique } from "./analyses-chimique";
import { AnalysesPhysique } from "./analyses-physique";
import { Sblf } from "./sblf";
import Stock from "./stock";

export interface Sbl extends Stock {
  sblfs: Sblf[];
  analysesChimiques: AnalysesChimique[];
  analysesPhysiques: AnalysesPhysique[];
}
