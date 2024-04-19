export class Intervention {
  id: number;
  dateintervention: Date;
  qui: string;
  natureAction: string;
  resultat: string;
  certificat: string;
  nomVisa: string;
  observation: string;

  constructor(
    id: number,
    dateintervention: Date,
    qui: string,
    natureAction: string,
    resultat: string,
    certificat: string,
    nomVisa: string,
    observation: string
  ) {
    this.id = id;
    this.dateintervention = dateintervention;
    this.qui = qui;
    this.natureAction = natureAction;
    this.resultat = resultat;
    this.certificat = certificat;
    this.nomVisa = nomVisa;
    this.observation = observation;
  }
}
