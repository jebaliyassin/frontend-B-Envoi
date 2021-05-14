import { Ldepot } from '../model/ldepot';
export class Depot {
    id : number;
    annee : number;
    numero : number;
    date_depot : any;
    code : string;
   // nbre:number;
    mat : number;
   //nom : string;
  destinataire : string;
   sms: string;
    lib_client : string;
    libdes : string;
    total : number;
    codedes :string;
    ldepots :Array<Ldepot> =[];
}
