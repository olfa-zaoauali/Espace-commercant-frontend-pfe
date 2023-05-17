import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Admin2 } from 'src/app/models/admin2';
import { Cashout } from 'src/app/models/cashout';
import { Commercant } from 'src/app/models/commercant';
import { Compte } from 'src/app/models/compte';
import { Facture } from 'src/app/models/facture';
import { Modules } from 'src/app/models/modules';

@Injectable({
  providedIn: 'root'
})
export class StatistiqueService {
  apiurl='http://localhost:8098/api/v1/auth/'

  constructor(private http:HttpClient,  private router : Router) { }
  
  public calculcommission(tenantId: string): Observable<number> {
    return this.http.get<number>(`${this.apiurl}commercants/commission/${tenantId}`)
  }
  public calculchiffraffaire(tenantId: string): Observable<number> {
    return this.http.get<number>(`${this.apiurl}commercants/revenu/${tenantId}`)
  }
  public calculNbAdmins(tenantId: string): Observable<number> {
    return this.http.get<number>(`${this.apiurl}commercants/nbadmin/${tenantId}`)
  }
   public calculNbClients(tenantId: string): Observable<number> {
    return this.http.get<number>(`${this.apiurl}commercants/nbclients/${tenantId}`)
  }
  public calculRevenuWind(tenantId: string): Observable<number> {
    return this.http.get<number>(`${this.apiurl}sadmins/revenu/${tenantId}`)
  }
  public clientsWind(tenantId: string): Observable<number> {
    return this.http.get<number>(`${this.apiurl}sadmins/nb/${tenantId}`)
  }
  public adminWind(): Observable<number> {
    return this.http.get<number>(`${this.apiurl}admins/nb`)
  }
  public RevenuNetWind(tenantId: string): Observable<number> {
    return this.http.get<number>(`${this.apiurl}sadmins/Revenunet/${tenantId}`)
  }
  public prixparmois(tenantId: string): Observable<number> {
    return this.http.get<number>(`${this.apiurl}admins/prix/${tenantId}`)
  }
  public RevenuTotalAdmin(tenantId: string): Observable<number> {
    return this.http.get<number>(`${this.apiurl}admins/revenu/${tenantId}`)
  }
  public RevenuNetAdmin(tenantId: string): Observable<number> {
    return this.http.get<number>(`${this.apiurl}admins/revenuNet/${tenantId}`)
  }
  public nbClientadmin(tenantId: string): Observable<number> {
    return this.http.get<number>(`${this.apiurl}admins/nbClients/${tenantId}`)
  }
  //facture 
  public getAdmin(tenantId: string): Observable<Admin2> {
    return this.http.get<Admin2>(`${this.apiurl}admins/tenantId/${tenantId}`)
  }
  public getmodules(tenantId: string): Observable<Modules[]> {
    return this.http.get<Modules[]>(`${this.apiurl}admins/modules/${tenantId}`)
  }
  public getFacture(tenantId: string): Observable<Facture> {
    return this.http.get<Facture>(`${this.apiurl}factures/admin/${tenantId}`)
  }
  public getFactureById(id:number): Observable<Facture> {
    return this.http.get<Facture>(`${this.apiurl}factures/number/${id}`)
  }
  public AddFacture(tenantId: string,facture: Facture ): Observable<Facture> {
    return this.http.post<Facture>(`${this.apiurl}factures/add/${tenantId}`,facture)
  }
  //cashout
  public getCashouts(tenantId: string): Observable<Cashout[]> {
    return this.http.get<Cashout[]>(`${this.apiurl}commercants/cashouts/${tenantId}`)
  } 
  public AddCashout(tenantId: string,cashout:Cashout): Observable<Cashout> {
    return this.http.post<Cashout>(`${this.apiurl}cashouts/add/${tenantId}`,cashout)
  }
  public getCommercant(tenantId: string): Observable<Commercant> {
    return this.http.get<Commercant>(`${this.apiurl}commercants/tenantId/${tenantId}`)
  } 
  public AddFactureToCommercant(tenantId: string,facture: Facture ): Observable<Facture> {
    return this.http.post<Facture>(`${this.apiurl}factures/addfacture/${tenantId}`,facture)
  }
  public getFactureCommeracnt(Id: number): Observable<Facture> {
    return this.http.get<Facture>(`${this.apiurl}factures/commercant/${Id}`)
  }
  //modules 
  public getModulesByAdmin(tenantId: string): Observable<Modules[]> {
    return this.http.get<Modules[]>(`${this.apiurl}admins/modules/${tenantId}`)
  } 
  //facture commercant
  public getFactureClientsOfCommercant(tenantId: string): Observable<Facture[]> {
    return this.http.get<Facture[]>(`${this.apiurl}commercants/facturesClients/${tenantId}`)
  }
  public getAdminOfFacture(id:number): Observable<Admin2> {
    return this.http.get<Admin2>(`${this.apiurl}factures/adminInfo/${id}`)
  }
  public getAdminOfCommercant(tenantId :string): Observable<Admin2[]> {
    return this.http.get<Admin2[]>(`${this.apiurl}commercants/admins/${tenantId}`)
  }
  //Contrat
  public getInfoCommerçant(tenantId:string):Observable<Commercant> {
    return this.http.get<Commercant>(`${this.apiurl}commercants/tenantId/${tenantId}`)
  }
  //compte
  public updateComtpecommercant(tenantId:string,commercant:any):Observable<any> {
    return this.http.patch<any>(`${this.apiurl}commercants/updatecompte/${tenantId}`,commercant)
  }
  public getInfoCommerçantCompte(tenantId:string):Observable<any> {
    return this.http.get<any>(`${this.apiurl}commercants/tenantId/${tenantId}`)
  }
  public changerMotDePasse(tenant_id:string,compte:any):Observable<any> {
    return this.http.put<any>(`${this.apiurl}commercants/password/${tenant_id}`,compte)
  }
  public changerImage(tenant_id:string,Image:any):Observable<any> {
    return this.http.put<any>(`${this.apiurl}commercants/image/${tenant_id}`,Image)
  }
  //Sadmin
  public getInfoSAdminCompte(tenantId:string):Observable<any> {
    return this.http.get<any>(`${this.apiurl}sadmins/tenantId/${tenantId}`)
  }
  public updateComtpeAdmin(id: number,sadmin:any):Observable<any> {
    return this.http.put<any>(`${this.apiurl}sadmins/update/${id}`,sadmin)
  }
  public changerMotDePasseSadmin(tenant_id:string,compte:any):Observable<any> {
    return this.http.put<any>(`${this.apiurl}sadmins/password/${tenant_id}`,compte)
  }
  //client
  public getInfoClientCompte(tenantId:string):Observable<any> {
    return this.http.get<any>(`${this.apiurl}clients/tenantId/${tenantId}`)
  }
  public updateComtpeClient(tenantId:string,client:any):Observable<any> {
    return this.http.put<any>(`${this.apiurl}clients/updatecompte/${tenantId}`,client)
  }
  public changerMotDePasseClient(tenant_id:string,compte:any):Observable<any> {
    return this.http.put<any>(`${this.apiurl}clients/password/${tenant_id}`,compte)
  }
  //Admin
  public getInfoAdminCompte(tenantId:string):Observable<any> {
    return this.http.get<any>(`${this.apiurl}admins/tenantId/${tenantId}`)
  }
  public updateAdmin(id: number,admin:any):Observable<any> {
    return this.http.put<any>(`${this.apiurl}admins/id/${id}`,admin)
  }
  public changerMotDePasseAdmin(tenant_id:string,compte:any):Observable<any> {
    return this.http.put<any>(`${this.apiurl}admins/password/${tenant_id}`,compte)
  }
}
