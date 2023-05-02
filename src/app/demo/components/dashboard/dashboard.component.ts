import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Product } from '../../api/product';
import { ProductService } from '../../service/product.service';
import { Subscription } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { StatistiqueService } from '../../service/statistique.service';
import { Commercant } from 'src/app/models/commercant';
import { SAdmin } from 'src/app/models/s-admin';
import { Admin2 } from 'src/app/models/admin2';

@Component({
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit, OnDestroy {

    items!: MenuItem[];

    products!: Product[];

    chartData: any;

    chartOptions: any;

    subscription!: Subscription;
    dataUser : any ;
    imageUrl: any;
    role: any;
    tenant_id:any;
    commercant: Commercant= new Commercant(0,"","","","","","","",0,0,0,0,0,false,"","");
    commission:any ;
    revenu:any;
    nbadmins:any;
    nbclients:any;
    sadmin: SAdmin= new SAdmin(0,"","","","",0,0,0,0,true);
    revenuSadmin:any;
    Admin:Boolean=true; 
    SAdmin:Boolean=true; 
    Commercant:Boolean=true; 
    client:Boolean=true;
    nbclientwind:any;
    nbadminwind:any; 
    revenuNet:any;
    admin: Admin2=new Admin2(0,"","","","","","","",0,"","","","","","",[],0,0,0,0,"",false);
    revenuNetadmin:any;
    revenutotaladmin:any;
    nbclientadmin:any;
    pay:any;
    constructor(private productService: ProductService, public layoutService: LayoutService, public statistiqueService : StatistiqueService) {
        this.subscription = this.layoutService.configUpdate$.subscribe(() => {
            this.initChart();
        });
    }
    ngOnInit() {
        this.initChart();
        this.productService.getProductsSmall().then(data => this.products = data);
        this.dataUser = this.layoutService.getDataFromToken();
        this.role = this.dataUser.role;
        this.imageUrl=this.dataUser.image;
        this.tenant_id=this.dataUser.tenant_id;
        if(this.isSadmin()){
            this.revenuWind();
            this.nbClientsWind();
            this.nbAdminsWind();
            this.revenuNetWind()
            
              }
        if(this.isCommercant()){
            this.commissionCommercant();
            this.revenuSociete();
            this.nbAdmins();
            this.nbClients();
        }
        if(this.isAdmin()){
            this.RevenuTotalAdmin();
            this.RevenuNetAdmin();
            this.nbClientadmin();
            this.PayParmois();
        }
        this.items = [
            { label: 'Add New', icon: 'pi pi-fw pi-plus' },
            { label: 'Remove', icon: 'pi pi-fw pi-minus' }
        ];
    }
    commissionCommercant(){
        this.statistiqueService.calculcommission(this.dataUser.tenant_id).subscribe(
          data=> {
            this.commission=data;
            this.commercant.pay=this.commission
            console.log("commissionpay",this.commercant.pay)
          }
        )
      }
      revenuSociete(){
        this.statistiqueService.calculchiffraffaire(this.dataUser.tenant_id).subscribe(
          data=> {
            this.revenu=data;
            this.commercant.revenu=this.revenu
            console.log("revenusociete",this.commercant.revenu)
          }
        )
      }
      revenuWind(){
        this.statistiqueService.calculRevenuWind(this.dataUser.tenant_id).subscribe(
          data=> {
            this.revenuSadmin=data;
            this.sadmin.revenu=this.revenuSadmin;
            console.log("revenuwind",this.sadmin.revenu)
          }
        )
      }
      revenuNetWind(){
        this.statistiqueService.RevenuNetWind(this.dataUser.tenant_id).subscribe(
          data=> {
            this.revenuNet=data;
            this.sadmin.revenuNet=this.revenuNet;
            console.log("revenuwindNet",this.sadmin.revenuNet)
          }
        )
      }
      ;
      //admin
      PayParmois(){
        this.statistiqueService.prixparmois(this.dataUser.tenant_id).subscribe(
          data=> {
            this.pay=data;
            this.admin.apayer=this.pay;
            console.log("pay",this.admin.apayer)
          }
        )
      }
      RevenuTotalAdmin(){
        this.statistiqueService.RevenuTotalAdmin(this.dataUser.tenant_id).subscribe(
          data=> {
            this.revenutotaladmin=data;
            this.admin.revenuTotal=this.revenutotaladmin;
            console.log("revenuadminNet",this.admin.revenuTotal)
          }
        )
      }
      RevenuNetAdmin(){
        this.statistiqueService.RevenuNetAdmin(this.dataUser.tenant_id).subscribe(
          data=> {
            this.revenuNetadmin=data;
            this.admin.revenuNet=this.revenuNetadmin;
            console.log("revenuadminNet",this.admin.revenuNet)
          }
        )
      }
      nbClientadmin(){
        this.statistiqueService.nbClientadmin(this.dataUser.tenant_id).subscribe(
          data=> {
            this.nbclientadmin=data;
            this.admin.nbClients=this.nbclientadmin;
            console.log("clientsAdmin",this.admin.nbClients)
          }
        )
      }

      nbAdmins(){
        this.statistiqueService.calculNbAdmins(this.dataUser.tenant_id).subscribe(
          data=> {
            this.nbadmins=data;
            this.commercant.admins=this.nbadmins
            console.log("admins",this.commercant.admins)
          }
        )
      }
      nbClients(){
        this.statistiqueService.calculNbClients(this.dataUser.tenant_id).subscribe(
          data=> {
            this.nbclients=data;
            this.commercant.clients=this.nbclients
            console.log("clients",this.commercant.clients)
          }
        )
      }
      nbClientsWind(){
        this.statistiqueService.clientsWind(this.dataUser.tenant_id).subscribe(
          data=> {
            this.nbclientwind=data;
            this.sadmin.nbClients=this.nbclientwind
            console.log("nbClientswind",this.sadmin.nbClients)
          }
        )
      }
      nbAdminsWind(){
        this.statistiqueService.adminWind().subscribe(
          data=> {
            this.nbadminwind=data;
            this.sadmin.nbAdmins=this.nbadminwind
            console.log("nbadminswind",this.sadmin.nbAdmins)
          }
        )
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

    initChart() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        this.chartData = {
            labels: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet','Août','Septembre','Octobre','Novembre','Décembre'],
            datasets: [
                {
                    label: '2022',
                    data: [65, 59, 80, 81, 56, 55, 90,82,60,44,50,80],
                    fill: false,
                    backgroundColor: documentStyle.getPropertyValue('--bluegray-700'),
                    borderColor: documentStyle.getPropertyValue('--bluegray-700'),
                    tension: .4
                },
              {
                    label: '2023',
                    data: [28, 48, 40, 19, 86, 27, ],
                    fill: false,
                    backgroundColor: documentStyle.getPropertyValue('--green-600'),
                    borderColor: documentStyle.getPropertyValue('--green-600'),
                    tension: .4
                }
            ]
        };

        this.chartOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                }
            }
        };
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
