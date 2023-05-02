import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from 'src/app/models/client';
import { Modules } from 'src/app/models/modules';

@Injectable()
export class CountryService {
    apiurl='http://localhost:8098/api/v1/auth/'

    valCheck:any
    constructor(private http: HttpClient) { }

    getCountries() {
        return this.http.get<any>('assets/demo/data/countries.json')
            .toPromise()
            .then(res => res.data as any[])
            .then(data => data);
    }
    public getClientByemail(email : String): Observable<Client> {
      return this.http.get<Client>(`${this.apiurl}clients/${email}`);
    }
   
    public getClientList(): Observable<Client[]> {
        return this.http.get<Client[]>(`${this.apiurl}clients`)
      }
      public getClientListOfSadmin(id:String): Observable<Client[]> {
        return this.http.get<Client[]>(`${this.apiurl}sadmins/get/${id}`)
      }
      public getClientListOfCommercant(id:String): Observable<Client[]> {
        return this.http.get<Client[]>(`${this.apiurl}commercants/clients/${id}`)
      }
      public getClientListOfAdmin(id:String): Observable<Client[]> {
        return this.http.get<Client[]>(`${this.apiurl}admins/clients/${id}`)
      }
      public getModulesList(): Observable<Modules[]> {
        return this.http.get<Modules[]>(`${this.apiurl}modules`)
      }
      updateenabledcomm(id : Number , enabled: boolean): Observable<Client>{
        return this.http.put<Client>(`${this.apiurl}clients/enabled/${id}`,enabled);
      }
      updatenotenabled(id : Number , enabled: boolean): Observable<Client>{
        return this.http.put<Client>(`${this.apiurl}clients/notenabled/${id}`,enabled);
      }
      //commercant
      addclientcommercant(client : string, logo: File): Observable<any>{
        const data: FormData = new FormData();
        console.log('clientjson',client)
        data.append('request', client);
        data.append('logo', logo);
        console.log('logo',data.get('logo'))
        console.log('client',data.get('request'))
    
        return this.http.post<any>(this.apiurl+"clients/add" , data,{headers:new HttpHeaders().set('enctype', 'multipart/form-data')});
      }
      //sadmin
      addclient(client : string, logo: File): Observable<any>{
        const data: FormData = new FormData();
        console.log('clientjson',client)
        data.append('request', client);
        data.append('logo', logo);
        console.log('logo',data.get('logo'))
        console.log('client',data.get('request'))
    
        return this.http.post<any>(this.apiurl+"clients/addclient" , data,{headers:new HttpHeaders().set('enctype', 'multipart/form-data')});
      }
     
      //update commercant
      public updateclient(client:string,logo:File,id:Number): Observable<any> {
        const data: FormData = new FormData();
        console.log('clientjson',client)
        data.append('request', client);
        data.append('logo', logo);
        console.log('logo',data.get('logo'))
        console.log('client',data.get('request'))
    
        return this.http.put<any>(`${this.apiurl}clients/updateCommercant/${id}` , data,{headers:new HttpHeaders().set('enctype', 'multipart/form-data')});
      }
       //update commercant
       public update(client:string,logo:File,id:Number): Observable<any> {
        const data: FormData = new FormData();
        console.log('clientjson',client)
        data.append('request', client);
        data.append('logo', logo);
        console.log('logo',data.get('logo'))
        console.log('client',data.get('request'))
    
        return this.http.put<any>(`${this.apiurl}clients/update/${id}` , data,{headers:new HttpHeaders().set('enctype', 'multipart/form-data')});
      }
      
     
      delete(id: any): Observable<void> {
        return this.http.delete<void>(`${this.apiurl}clients/delete/${id}`);
      }
      clientde(tenant_id:any): Observable<any> {
        return this.http.get<any>(`${this.apiurl}user/${tenant_id}`);
      }
      validation(id : Number): Observable<void>{
        return this.http.get<void>(`${this.apiurl}clients/validation/${id}`);
      }
      
      
}
