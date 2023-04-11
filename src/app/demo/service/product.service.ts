import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../api/product';
import { Commercant } from 'src/app/models/commercant';
import { Observable } from 'rxjs';

@Injectable()
export class ProductService {
    apiurl='http://localhost:8098/api/v1/auth/'
    private modals: any[] = [];
    selectedCommerceId!: number;
    selectedCommerce: any;

  

    constructor(private http: HttpClient) { }

    getProductsSmall() {
        return this.http.get<any>('assets/demo/data/products-small.json')
            .toPromise()
            .then(res => res.data as Product[])
            .then(data => data);
    }

    getProducts() {
        return this.http.get<any>('assets/demo/data/products.json')
            .toPromise()
            .then(res => res.data as Product[])
            .then(data => data);
    }

    getProductsMixed() {
        return this.http.get<any>('assets/demo/data/products-mixed.json')
            .toPromise()
            .then(res => res.data as Product[])
            .then(data => data);
    }

    getProductsWithOrdersSmall() {
        return this.http.get<any>('assets/demo/data/products-orders-small.json')
            .toPromise()
            .then(res => res.data as Product[])
            .then(data => data);
    }
    //commercant
   
    public getCommercantList(): Observable<Commercant[]> {
        return this.http.get<Commercant[]>(`${this.apiurl}commercants`)
      }
      updateenabledcomm(id : Number , enabled: boolean): Observable<Commercant>{
        return this.http.put<Commercant>(`${this.apiurl}commercants/enabled/${id}`,enabled);
      }
      updatenotenabledcomm(id : Number , enabled: boolean): Observable<Commercant>{
        return this.http.put<Commercant>(`${this.apiurl}commercants/notenabled/${id}`,enabled);
      }
      addcommercant(commercant : string, image: File): Observable<any>{
        const data: FormData = new FormData();
        console.log('commercantjson',commercant)
        data.append('request', commercant);
        data.append('image', image);
        console.log('image',data.get('image'))
        console.log('commercant',data.get('request'))
    
        return this.http.post<any>(this.apiurl+"registercommercant" , data,{headers:new HttpHeaders().set('enctype', 'multipart/form-data')});
      }
      //update avec file
      public updatecommercant(commercant:string,image:File,id:Number): Observable<any> {
        const data: FormData = new FormData();
        console.log('commercantjson',commercant)
        data.append('request', commercant);
        data.append('image', image);
        console.log('image',data.get('image'))
        console.log('commercant',data.get('request'))
    
        return this.http.put<any>(`${this.apiurl}commercants/updatecomercant/${id}` , data,{headers:new HttpHeaders().set('enctype', 'multipart/form-data')});
      }
      Getcommercantbyid(id: any){
        return this.http.get(`${this.apiurl}commercants/id/${id}`);
      }
      //update sans file 
      public update(commercant: Commercant,id:number): Observable<Commercant> {
        return this.http.put<Commercant>(`${this.apiurl}commercants/update/${id}`, commercant);
      }
      delete(id: any): Observable<void> {
        return this.http.delete<void>(`${this.apiurl}commercants/delete/${id}`);
      }
      
}
