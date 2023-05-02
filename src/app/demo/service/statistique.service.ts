import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Admin2 } from 'src/app/models/admin2';
import { Facture } from 'src/app/models/facture';
import { Modules } from 'src/app/models/modules';

@Injectable({
  providedIn: 'root'
})
export class StatistiqueService {
  apiurl='http://localhost:8098/api/v1/auth/'

  constructor(private http:HttpClient,  private router : Router) { }
  
  public calculcommission(tenantId: String): Observable<number> {
    return this.http.get<number>(`${this.apiurl}commercants/commission/${tenantId}`)
  }
  public calculchiffraffaire(tenantId: String): Observable<number> {
    return this.http.get<number>(`${this.apiurl}commercants/revenu/${tenantId}`)
  }
  public calculNbAdmins(tenantId: String): Observable<number> {
    return this.http.get<number>(`${this.apiurl}commercants/nbadmin/${tenantId}`)
  }
   public calculNbClients(tenantId: String): Observable<number> {
    return this.http.get<number>(`${this.apiurl}commercants/nbclients/${tenantId}`)
  }
  public calculRevenuWind(tenantId: String): Observable<number> {
    return this.http.get<number>(`${this.apiurl}sadmins/revenu/${tenantId}`)
  }
  public clientsWind(tenantId: String): Observable<number> {
    return this.http.get<number>(`${this.apiurl}sadmins/nb/${tenantId}`)
  }
  public adminWind(): Observable<number> {
    return this.http.get<number>(`${this.apiurl}admins/nb`)
  }
  public RevenuNetWind(tenantId: String): Observable<number> {
    return this.http.get<number>(`${this.apiurl}sadmins/Revenunet/${tenantId}`)
  }
  public prixparmois(tenantId: String): Observable<number> {
    return this.http.get<number>(`${this.apiurl}admins/prix/${tenantId}`)
  }
  public RevenuTotalAdmin(tenantId: String): Observable<number> {
    return this.http.get<number>(`${this.apiurl}admins/revenu/${tenantId}`)
  }
  public RevenuNetAdmin(tenantId: String): Observable<number> {
    return this.http.get<number>(`${this.apiurl}admins/revenuNet/${tenantId}`)
  }
  public nbClientadmin(tenantId: String): Observable<number> {
    return this.http.get<number>(`${this.apiurl}admins/nbClients/${tenantId}`)
  }
  //facture 
  public getAdmin(tenantId: String): Observable<Admin2> {
    return this.http.get<Admin2>(`${this.apiurl}admins/tenantId/${tenantId}`)
  }
  public getmodules(tenantId: String): Observable<Modules[]> {
    return this.http.get<Modules[]>(`${this.apiurl}admins/modules/${tenantId}`)
  }
  public getFacture(tenantId: String): Observable<Facture> {
    return this.http.get<Facture>(`${this.apiurl}factures/admin/${tenantId}`)
  }
  public AddFacture(tenantId: String,facture: Facture ): Observable<Facture> {
    return this.http.post<Facture>(`${this.apiurl}factures/add/${tenantId}`,facture)
  }
}
