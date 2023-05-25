export class Cashout {
    constructor( 
        public id:number,
        public dateDeCreation: string,
        public temp: string,
        public cashout : number,
        public Montant : number,
        public verified:boolean,
        public commercant:string,
        public emailCommercant:string,
        public firstnameCom:string,
        public lastnameCom:string,
        public tenantId:string
        ){
            
        }
}
