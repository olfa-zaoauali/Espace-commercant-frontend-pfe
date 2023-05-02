export class Facture {
    constructor( 
        public dateFacture: String,
        public ttc : number,
        public ht : number,
        public tva : number,
        public totalLettre: String,
        public adminId:String,
        public reference: String
        ){
            
        }
}
