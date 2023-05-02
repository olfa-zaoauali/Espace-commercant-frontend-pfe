export class SAdmin {
    constructor( public id:number,
        public firstname: String,
        public lastname: string,
        public email:string,
        public password:string,
        public revenu:number,
        public revenuNet:number,
        public nbClients:number,
        public nbAdmins:number,
        public enabled: boolean
        ){
            
        }
}
