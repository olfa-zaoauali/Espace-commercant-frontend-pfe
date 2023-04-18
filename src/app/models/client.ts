export class Client {
    constructor( public id:number,
        public firstname: String,
        public lastname: string,
        public email:string,
        public password:string,
        public telephone: string,
        public company: string,
        public domain: string,
        public logo: string,
        public nbEmployer: number,
        public enabled: boolean,
        public emailCommercant: string,
        public commercantId:String
        ){
            
        }
}
