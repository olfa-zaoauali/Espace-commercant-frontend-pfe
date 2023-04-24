import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Image } from '../api/image';
import { Observable } from 'rxjs';
import { Modules } from 'src/app/models/modules';

@Injectable()
export class PhotoService {
    apiurl='http://localhost:8098/api/v1/auth/'


    constructor(private http: HttpClient) { }

    getImages() {
        return this.http.get<any>('assets/demo/data/photos.json')
            .toPromise()
            .then(res => res.data as Image[])
            .then(data => data);
    }
    public update(module: Modules,id:Number): Observable<any> {
      return this.http.put<any>(`${this.apiurl}modules/update/${id}`, module);
    }
    public getModules(): Observable<Modules[]> {
        return this.http.get<Modules[]>(`${this.apiurl}modules`)
      }
      public AddModules(module : Modules): Observable<Modules> {
        return this.http.post<Modules>(`${this.apiurl}modules/add`,module)
      }
      delete(id: any): Observable<void> {
        return this.http.delete<void>(`${this.apiurl}modules/delete/${id}`);
      }
}
