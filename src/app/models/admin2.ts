
export class Admin2 {
    constructor( public id:number,
        public firstname: String,
        public lastname: string,
        public email:string,
        public password:string,
        public telephone: string,
        public company: string,
        public domain: string,
        public nbEmployer: number,
        public adresse: string,
        public ville: string,
        public pays: string,
        public matricule: string,
        public batinda: string,
        public logo: string,
        public moduleId: number[],
        public revenuNet:number,
        public revenuTotal:number,
        public apayer:number,
        public nbClients:number,
        public tenatId:String,
        public enabled: boolean
        ){
            
        }
}
