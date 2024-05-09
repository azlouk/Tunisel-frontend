export interface AnalysesChimique  {
  matiere?: string;
  id?: number;
  reference?: string;
  dateAnalyse?: Date  ;
  temperature?: number;
  vent?: number;
  densite?: string|undefined;
  matiereEnSuspension?: string|undefined;
  salimite?: string|undefined;
  calcium?: string|undefined;
  magnesium?: string|undefined;
  sulfate?: string|undefined;
  humidite?: string|undefined;
  matiereInsoluble?: string|undefined;
  potassium?: string|undefined;
  sodium?: string|undefined;
  chlorure?: string|undefined;
  ph?: string|undefined;
  chlorureDeSodium?: string|undefined;
  ferrocyanure?: string|undefined;
  ref?:string;
}
