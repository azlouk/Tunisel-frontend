export interface AnalysesChimique  {
  id?: number;
  reference?: string;
  dateAnalyse?: Date;
  temperature?: number;
  vent?: number;
  densite?: number|undefined;
  matiereEnSuspension?: number|undefined;
  salimite?: number|undefined;
  calcium?: number|undefined;
  magnesium?: number|undefined;
  sulfate?: number|undefined;
  humidite?: number|undefined;
  matiereInsoluble?: number|undefined;
  potassium?: number|undefined;
  sodium?: number|undefined;
  chlorure?: number|undefined;
  ph?: number|undefined;
  chlorureDeSodium?: number|undefined;
  ferrocyanure?: number|undefined;
}
