import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];
    dataUser : any ;
    imageUrl: any;
    role: any;
    Admin:Boolean=true; 
    SAdmin:Boolean=true; 
    Commercant:Boolean=true; 
    client:Boolean=true;

  
    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.dataUser = this.layoutService.getDataFromToken();
        this.role = this.dataUser.role;
        this.imageUrl=this.dataUser.image;
        console.log("role",this.role);
        if(this.isCommercant()){
        this.model = [
            {   
                label: 'Home',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/dashboard'] }
                ]
            },
            {
                label: 'Gestion des Clients',
                items: [
                   
                    { label: 'Clients', icon: 'pi pi-fw pi-user-plus', routerLink: ['/dashboard/uikit/misc'] }

                  
                ]
            },
          
            {
                label: 'Autre',
                icon: 'pi pi-fw pi-briefcase',
                items: [
                    {
                        label: 'WIND-ERP',
                        icon: 'pi pi-fw pi-globe',
                        routerLink: ['']
                    },
                    

                    {
                        label: 'Contrat',
                        icon: 'pi pi-fw pi-file',
                        routerLink: ['/dashboard/pages/empty']
                    },
                    {
                        label: 'Compte',
                        icon: 'pi pi-fw pi-user',
                        items: [
                         
                            { label: 'Profile', icon: 'pi pi-fw pi-user-edit', routerLink: ['/dashboard/blocks'], badge: 'NEW' },
                            {
                                label: 'Logout',
                                icon: 'pi pi-fw pi-sign-out',
                                routerLink: ['/auth/login']
                            },
                       
                        ]
                    },
                    
                ]
            },
            {
                label: 'Aide',
                items: [
                    { label: 'Guide de utilisation', icon: 'pi pi-fw pi-desktop', routerLink: ['/dashboard/uikit/media'] },

                    { label: 'Contact', icon: 'pi pi-fw pi-comment', routerLink: ['/dashboard/uikit/message'] },
                ]
            }
         
        ];}
        if(this.isClient()){
            this.model = [
                {   
                    label: 'Home',
                    items: [
                       // { label: 'Abonnement', icon: 'pi pi-fw pi-share-alt', routerLink: ['/dashboard/uikit/tree'] }
                       { label: 'Abonnement', icon: 'pi pi-fw pi-check-square', routerLink: ['/dashboard/uikit/input'] }
                    ]
                },
                {
                    label: 'Les Modules',
                    items: [
                       
                        { label: 'CRM', icon: 'pi pi-fw pi-box', routerLink: ['/uikit/button'] },
                        { label: 'Espace Commerçant', icon: 'pi pi-fw pi-box', routerLink: ['/uikit/button'] },
                        { label: 'Immobilisation', icon: 'pi pi-fw pi-box', routerLink: ['/uikit/button'] },
                        { label: 'Gestion RH', icon: 'pi pi-fw pi-box', routerLink: ['/uikit/button'] },
                        { label: 'Espace Commerçant', icon: 'pi pi-fw pi-box', routerLink: ['/uikit/button'] },
                        { label: 'Décisionnel / B.I', icon: 'pi pi-fw pi-box', routerLink: ['/uikit/button'] }

                      
                    ]
                },
              
                {
                    label: 'Autre',
                    icon: 'pi pi-fw pi-briefcase',
                    items: [
                        {
                            label: 'WIND-ERP',
                            icon: 'pi pi-fw pi-globe',
                            routerLink: ['']
                        },
                        {
                            label: 'Compte',
                            icon: 'pi pi-fw pi-user',
                            items: [
                             
                                { label: 'Profile', icon: 'pi pi-fw pi-user-edit', routerLink: ['/dashboard/blocks'], badge: 'NEW' },
                                {
                                    label: 'Logout',
                                    icon: 'pi pi-fw pi-sign-out',
                                    routerLink: ['/auth/login']
                                },
                           
                            ]
                        },
                        
                    ]
                },
                {
                    label: 'Aide',
                    items: [
                        { label: 'Guide de utilisation', icon: 'pi pi-fw pi-desktop', routerLink: ['/dashboard/uikit/media'] },
    
                        { label: 'Contact', icon: 'pi pi-fw pi-comment', routerLink: ['/dashboard/uikit/message'] },
                    ]
                }
             
            ];}
        if(this.isAdmin()){
        this.model = [
            {   
                label: 'Home',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/dashboard'] }
                ]
            },
            {
                label: 'Gestion des utilisateurs',
                items: [
                    {
                        label: 'Commercants',
                        icon: 'pi pi-fw pi-user-plus',
                        routerLink: ['/dashboard/pages/crud']
                    },

                ]
            },
            {
                label: 'Autre',
                icon: 'pi pi-fw pi-briefcase',
                items: [
                    {
                        label: 'WIND-ERP',
                        icon: 'pi pi-fw pi-globe',
                        routerLink: ['']
                    },
                   
                    { label: 'télecharger Contrat', icon: 'pi pi-fw pi-download', routerLink: ['/dashboard/uikit/file'] },
                    {
                        label: 'Compte',
                        icon: 'pi pi-fw pi-user',
                        items: [
                            { label: 'Profile', icon: 'pi pi-fw pi-user-edit', routerLink: ['/dashboard/blocks'], badge: 'NEW' },
                            {
                                label: 'Logout',
                                icon: 'pi pi-fw pi-sign-out',
                                routerLink: ['/auth/login']
                            },
                        ]
                    },
                    
                    
                ]
            },
            {
                label: 'Aide',
                items: [
                    { label: 'Guide de utilisation', icon: 'pi pi-fw pi-desktop', routerLink: ['/dashboard/uikit/media'] },

                    { label: 'Contact', icon: 'pi pi-fw pi-comment', routerLink: ['/dashboard/uikit/message'] },
                ]
            }
        ];}
        
        if(this.isSadmin()){
        this.model = [
            {   
                label: 'Home',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/dashboard'] }
                ]
            },
            {
                label: 'Gestion des utilisateurs',
                items: [
                   // { label: 'Form Layout', icon: 'pi pi-fw pi-id-card', routerLink: ['/uikit/formlayout'] },
                    //{ label: 'Input', icon: 'pi pi-fw pi-check-square', routerLink: ['/uikit/input'] },
                   // { label: 'Float Label', icon: 'pi pi-fw pi-bookmark', routerLink: ['/uikit/floatlabel'] },
                  //  { label: 'Invalid State', icon: 'pi pi-fw pi-exclamation-circle', routerLink: ['/uikit/invalidstate'] },
                   /* { label: 'Button', icon: 'pi pi-fw pi-box', routerLink: ['/uikit/button'] },*/
                    { label: 'Demandes des Admins', icon: 'pi pi-fw pi-users', routerLink: ['/dashboard/uikit/table'] },
                    {
                        label: 'Commercants',
                        icon: 'pi pi-fw pi-user-plus',
                        routerLink: ['/dashboard/pages/crud']
                    },
                    { label: 'Clients', icon: 'pi pi-fw pi-user-plus', routerLink: ['/dashboard/uikit/misc'] }
                   // { label: 'List', icon: 'pi pi-fw pi-list', routerLink: ['/uikit/list'] },
                   /* { label: 'Tree', icon: 'pi pi-fw pi-share-alt', routerLink: ['/uikit/tree'] },*/
                    //{ label: 'Panel', icon: 'pi pi-fw pi-tablet', routerLink: ['/uikit/panel'] },
                    //{ label: 'Overlay', icon: 'pi pi-fw pi-clone', routerLink: ['/uikit/overlay'] },
                   /* { label: 'Menu', icon: 'pi pi-fw pi-bars', routerLink: ['/uikit/menu'], routerLinkActiveOptions: { paths: 'subset', queryParams: 'ignored', matrixParams: 'ignored', fragment: 'ignored' } },*/
                   // { label: 'Contact', icon: 'pi pi-fw pi-comment', routerLink: ['/uikit/message'] },
                  //  { label: 'Chart', icon: 'pi pi-fw pi-chart-bar', routerLink: ['/uikit/charts'] },
                   //{ label: 'Misc', icon: 'pi pi-fw pi-circle', routerLink: ['/dashboard/uikit/misc'] }
                ]
            },
           // {
             //   label: 'Prime Blocks',
              //  items: [
              //      { label: 'Free Blocks', icon: 'pi pi-fw pi-eye', routerLink: ['/blocks'], badge: 'NEW' },
                    /*{ label: 'All Blocks', icon: 'pi pi-fw pi-globe', url: ['https://www.primefaces.org/primeblocks-ng'], target: '_blank' },*/
               // ]
           // },
           // {
              //  label: 'Utilities',
               // items: [
                //    { label: 'PrimeIcons', icon: 'pi pi-fw pi-prime', routerLink: ['/utilities/icons'] },
                    /*{ label: 'PrimeFlex', icon: 'pi pi-fw pi-desktop', url: ['https://www.primefaces.org/primeflex/'], target: '_blank' },*/
               // ]
          //  },
            {
                label: 'Autre',
                icon: 'pi pi-fw pi-briefcase',
                items: [
                    {
                        label: 'WIND-ERP',
                        icon: 'pi pi-fw pi-globe',
                        routerLink: ['']
                    },
                    
                  //  { label: ' Contrat Commercants', icon: 'pi pi-fw pi-download', routerLink: ['/dashboard/uikit/file'] },
                    {
                        label: 'Compte',
                        icon: 'pi pi-fw pi-user',
                        items: [
                           /* {
                                label: 'Login',
                                icon: 'pi pi-fw pi-sign-in',
                                routerLink: ['/auth/login']
                            },*/
                            { label: 'Profile', icon: 'pi pi-fw pi-user-edit', routerLink: ['/dashboard/blocks'], badge: 'NEW' },
                            {
                                label: 'Logout',
                                icon: 'pi pi-fw pi-sign-out',
                                routerLink: ['/auth/login']
                            },
                          /* {
                                label: 'Register',
                                icon: 'pi pi-fw pi-times-circle',
                                routerLink: ['/auth/error']
                            },*/
                           /* {
                                label: 'Access Denied',
                                icon: 'pi pi-fw pi-lock',
                                routerLink: ['/auth/access']
                            }*/
                        ]
                    },

                   /* {
                        label: 'Commercants',
                        icon: 'pi pi-fw pi-pencil',
                        routerLink: ['/pages/crud']
                    },*/
                   /*{
                        label: 'Timeline',
                        icon: 'pi pi-fw pi-calendar',
                        routerLink: ['/pages/timeline']
                    },*/
                   /*{
                        label: 'Not Found',
                        icon: 'pi pi-fw pi-exclamation-circle',
                        routerLink: ['/notfound']
                    },*/
                    
                    
                ]
            },
           
           /* {
                label: 'Hierarchy',
                items: [
                    {
                        label: 'Submenu 1', icon: 'pi pi-fw pi-bookmark',
                        items: [
                            {
                                label: 'Submenu 1.1', icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    { label: 'Submenu 1.1.1', icon: 'pi pi-fw pi-bookmark' },
                                    { label: 'Submenu 1.1.2', icon: 'pi pi-fw pi-bookmark' },
                                    { label: 'Submenu 1.1.3', icon: 'pi pi-fw pi-bookmark' },
                                ]
                            },
                            {
                                label: 'Submenu 1.2', icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    { label: 'Submenu 1.2.1', icon: 'pi pi-fw pi-bookmark' }
                                ]
                            },
                        ]
                    },
                    {
                        label: 'Submenu 2', icon: 'pi pi-fw pi-bookmark',
                        items: [
                            {
                                label: 'Submenu 2.1', icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    { label: 'Submenu 2.1.1', icon: 'pi pi-fw pi-bookmark' },
                                    { label: 'Submenu 2.1.2', icon: 'pi pi-fw pi-bookmark' },
                                ]
                            },
                            {
                                label: 'Submenu 2.2', icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    { label: 'Submenu 2.2.1', icon: 'pi pi-fw pi-bookmark' },
                                ]
                            },
                        ]
                    }
                ]
            },*/
            /*{
                label: 'Get Started',
                items: [
                    {
                        label: 'Documentation', icon: 'pi pi-fw pi-question', routerLink: ['/documentation']
                    },
                   {
                        label: 'View Source', icon: 'pi pi-fw pi-search', url: ['https://github.com/primefaces/sakai-ng'], target: '_blank'
                    }
                ]
            }*/
        ];
    }}
    logOut(){
        this.layoutService.logOut();
      }
    isAdmin():any{
        if(this.dataUser.role=="ADMIN"){
          return this.Admin=true;
        }
        else{
          return this.Admin=false;
        }
      }
      isSadmin():any{
        if(this.dataUser.role=="SADMIN"){
          return this.SAdmin=true;
        }
        else{
          return this.SAdmin=false;
        }
      }
      isCommercant():any{
        if(this.dataUser.role=="COMMERCANT"){
          return this.Commercant=true;
        }
        else{
          return this.Commercant=false;
        }
      }
      isClient():any{
        if(this.dataUser.role=="CLIENT"){
          return this.client=true;
        }
        else{
          return this.client=false;
        }
      }
}
