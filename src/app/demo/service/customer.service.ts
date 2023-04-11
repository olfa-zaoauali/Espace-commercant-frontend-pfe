import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from '../api/customer';
import { Observable } from 'rxjs';
import { Admin } from 'src/app/models/Admin';
import { Admin2 } from 'src/app/models/admin2';

@Injectable()
export class CustomerService {
    apiurl='http://localhost:8098/api/v1/auth/'
    constructor(private http: HttpClient) { }

    getCustomersSmall() {
        return this.http.get<any>('assets/demo/data/customers-small.json')
            .toPromise()
            .then(res => res.data as Customer[])
            .then(data => data);
    }

    getCustomersMedium() {
        return this.http.get<any>('assets/demo/data/customers-medium.json')
            .toPromise()
            .then(res => res.data as Customer[])
            .then(data => data);
    }

    getCustomersLarge() {
        return this.http.get<any>('assets/demo/data/customers-large.json')
            .toPromise()
            .then(res => res.data as Customer[])
            .then(data => data);
    }
    public getAdminList(): Observable<Admin2[]> {
        return this.http.get<Admin2[]>(`${this.apiurl}admins`)
    }
    public getAdminList2(){
        return this.http.get<any>(`${this.apiurl}admins`).toPromise()
        .then(res => res.data as Admin[])
        .then(data => data);
    }
    
      GetAll(){
        return this.http.get(this.apiurl)
      }
      Getbyemail(email: any){
        console.log(this.apiurl+email)
        return this.http.get(this.apiurl+email);
      }
      //registre sans file 
      Procedeedregister(user:any){
        return this.http.post<Admin2>(`${this.apiurl}registeradmin`,user);
      }
      //registre avec files
      addAdmin(admin : string,  file: File, logo: File): Observable<any>{
        const data: FormData = new FormData();
        console.log('adminjson',admin)
        data.append('request', admin);
        data.append('file', file);
        data.append('logo', logo);
        console.log('logo',data.get('logo'))
        console.log('file',data.get('file'))
        console.log('admin',data.get('request'))
    
        return this.http.post<any>(this.apiurl+"registeradmin" , data,{headers:new HttpHeaders().set('enctype', 'multipart/form-data')});
      }
      validation(id : Number): Observable<void>{
        return this.http.get<void>(`${this.apiurl}admins/validation/${id}`);
      }
      public updateAdmin(admin:Admin2,id:number): Observable<Admin2> {
        return this.http.put<Admin2>(`${this.apiurl}admins/id/${id}`, admin);
      }
      updateenabled(id : Number , enabled: boolean): Observable<Admin2>{
        return this.http.put<Admin2>(`${this.apiurl}admins/enabled/${id}`,enabled);
      }
      updatenotenabled(id : Number , enabled: boolean): Observable<Admin2>{
        return this.http.put<Admin2>(`${this.apiurl}admins/notenabled/${id}`,enabled);
      }
}
