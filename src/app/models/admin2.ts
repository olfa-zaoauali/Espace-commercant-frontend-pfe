import { Modules } from "./modules";

export class Admin2 {
    constructor( public id:number,
        public firstname: String,
        public lastname: string,
        public email:string,
        public password:string,
        public telephone: string,
        public company: string,
        public domain: string,
        public matricule: string,
        public batinda: string,
        public logo: string,
        public moduleId: number[],
        public enabled: boolean
        ){
            
        }
}
