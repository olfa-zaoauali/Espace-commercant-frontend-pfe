import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from 'express';
import { Observable } from 'rxjs';
import { Admin2 } from 'src/app/models/admin2';

@Injectable({
  providedIn: 'root'
})
export class FactureService {
  apiurl='http://localhost:8098/api/v1/auth/'

  constructor(private http:HttpClient,  private router : Router) { }
  public getAdmin(company: String): Observable<Admin2> {
    return this.http.get<Admin2>(`${this.apiurl}admins/get/${company}`)
  }
}
