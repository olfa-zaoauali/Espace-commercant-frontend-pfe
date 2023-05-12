export class Facture {
    [x: string]: any;
    constructor( 
        public numero : number,
        public dateFacture: string,
        public ttc : number,
        public ht : number,
        public tva : number,
        public totalLettre: string,
        public adminId:string,
        public commercantId: string,
        public reference: string,
        public emailAdmmin:string,
        public companyAdmin:string,
        public logoAdmin:string
        ){
            
        }
}
