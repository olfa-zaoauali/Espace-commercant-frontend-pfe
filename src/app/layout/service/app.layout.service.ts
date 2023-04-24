import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { Admin2 } from 'src/app/models/admin2';
import { Commercant } from 'src/app/models/commercant';

export interface AppConfig {
    inputStyle: string;
    colorScheme: string;
    theme: string;
    ripple: boolean;
    menuMode: string;
    scale: number;
}

interface LayoutState {
    staticMenuDesktopInactive: boolean;
    overlayMenuActive: boolean;
    profileSidebarVisible: boolean;
    configSidebarVisible: boolean;
    staticMenuMobileActive: boolean;
    menuHoverActive: boolean;
}

@Injectable({
    providedIn: 'root',
})
export class LayoutService {


    config: AppConfig = {
        ripple: false,
        inputStyle: 'outlined',
        menuMode: 'static',
        colorScheme: 'light',
        theme: 'lara-light-indigo',
        scale: 14,
    };

    state: LayoutState = {
        staticMenuDesktopInactive: false,
        overlayMenuActive: false,
        profileSidebarVisible: false,
        configSidebarVisible: false,
        staticMenuMobileActive: false,
        menuHoverActive: false
    };
    apiurl='http://localhost:8098/api/v1/auth/'


    private configUpdate = new Subject<AppConfig>();

    private overlayOpen = new Subject<any>();

    configUpdate$ = this.configUpdate.asObservable();

    overlayOpen$ = this.overlayOpen.asObservable();
    constructor(private http:HttpClient,  private router : Router) { }


    onMenuToggle() {
        if (this.isOverlay()) {
            this.state.overlayMenuActive = !this.state.overlayMenuActive;
            if (this.state.overlayMenuActive) {
                this.overlayOpen.next(null);
            }
        }

        if (this.isDesktop()) {
            this.state.staticMenuDesktopInactive = !this.state.staticMenuDesktopInactive;
        }
        else {
            this.state.staticMenuMobileActive = !this.state.staticMenuMobileActive;

            if (this.state.staticMenuMobileActive) {
                this.overlayOpen.next(null);
            }
        }
    }

    showProfileSidebar() {
        this.state.profileSidebarVisible = !this.state.profileSidebarVisible;
        if (this.state.profileSidebarVisible) {
            this.overlayOpen.next(null);
        }
    }

    showConfigSidebar() {
        this.state.configSidebarVisible = true;
    }

    isOverlay() {
        return this.config.menuMode === 'overlay';
    }

    isDesktop() {
        return window.innerWidth > 991;
    }

    isMobile() {
        return !this.isDesktop();
    }

    onConfigUpdate() {
        this.configUpdate.next(this.config);
    }
    //mon service 
    IsloggedIn(){
        return sessionStorage.getItem('email')!=null;
      }
      GetUserrole(){
        return sessionStorage.getItem('userrole')!=null?sessionStorage.getItem('userrole')?.toString():'';
      }
      
      getDataFromToken(){
        let token = localStorage.getItem('token');
    
         if (token){
           let data = JSON.parse(window.atob(token.split('.')[1]));
           return data;
        }    
      }
      login(user : any){
        return this.http.post(this.apiurl+'authenticate',user);
      }
      logOut(){
        localStorage.removeItem('token');
        this.router.navigate(['/auth/login']);
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
  public chercherCommercantadmin(tenantId: String): Observable<Commercant[]> {
    return this.http.get<Commercant[]>(`${this.apiurl}admins/commercants/${tenantId}`)
  }
  public chercherCommercantsadmin(tenantId: String): Observable<Commercant[]> {
    return this.http.get<Commercant[]>(`${this.apiurl}sadmins/commercants/${tenantId}`)
  }

}
