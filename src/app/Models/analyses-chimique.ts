export interface AnalysesChimique  {
  matiere?: string;
  id?: number;
  reference?: string;
  dateAnalyse?: Date  ;
  temperature?: number;
  vent?: number;
  description?: string;
  densite?: number|undefined;
  matiereEnSuspension?: number|undefined;
  salinite?: number|undefined;
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
  ref?:string;

}
