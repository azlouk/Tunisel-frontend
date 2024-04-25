import {UserType} from "../Enum/user-type";

export interface User {
  id?: number;
  nom?: string;
  telephone?: number;
  poste?: string;
  pseudo?: string;
  mp?: string;
 userType?: UserType;
}

