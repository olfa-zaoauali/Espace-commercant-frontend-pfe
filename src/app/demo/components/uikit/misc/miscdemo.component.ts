import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Product } from 'src/app/demo/api/product';
import { CountryService } from 'src/app/demo/service/country.service';
import { ProductService } from 'src/app/demo/service/product.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { Client } from 'src/app/models/client';
import { Commercant } from 'src/app/models/commercant';

@Component({
    templateUrl: './miscdemo.component.html',
    providers: [MessageService]

})
export class MiscDemoComponent implements OnInit, OnDestroy {

    value = 0;

    interval: any;
    dataUser : any ;
    imageUrl: any;
    role: any;
    tenant_id:any;

    productDialog: boolean = false;
    DialogAdd:boolean=false;

    deleteProductDialog: boolean = false;

    deleteProductsDialog: boolean = false;

    products: Product[] = [];

    product: Product = {};

    selectedProducts: Product[] = [];
    selectedCommercant:Commercant[]=[];

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];
    clients: Client[]=[];
    client: Client= new Client(1,"","","","","","","","",0,false,"","","");
    comm:any
    image:any
    imageFile:any
    imageURL:any
    uploadedFiles: any[] = [];
    checked:boolean=true;
    Admin:Boolean=true; 
    SAdmin:Boolean=true;
    emails:any[]=[];
    email:any
    Commercant:Boolean=true; 

    


    constructor(public layoutService: LayoutService, private clientservice: CountryService , private productService: ProductService, private messageService: MessageService,private router: Router) { }
    ngOnDestroy(): void {
        throw new Error('Method not implemented.');
    }

    ngOnInit() {
        this.dataUser = this.layoutService.getDataFromToken();
      this.email=this.dataUser.sub;
        this.role = this.dataUser.role;
        this.imageUrl=this.dataUser.image;
        this.tenant_id=this.dataUser.tenant_id;
        console.log("id",this.tenant_id);
        console.log("sub",this.email);
        if(this.isSadmin()){                this.listClientsOfSAdmin();

        }
        if(this.isCommercant()){        this.listClientsOfCommercant();
        }
        if(this.isAdmin()){        this.listClientsOfAdmin();
        }
        
       
    }
    listClients(){
        this.clientservice.getClientList().subscribe(
            data=> {
              this.clients=data;
             
            }
          );
      }
      listClientsOfSAdmin(){
        this.clientservice.getClientListOfSadmin(this.dataUser.tenant_id).subscribe(
            data=> {
              this.clients=data;
             
            }
          );
      }
      listClientsOfAdmin(){
        this.clientservice.getClientListOfAdmin(this.dataUser.tenant_id).subscribe(
            data=> {
              this.clients=data;
             
            }
          );
      }
      listClientsOfCommercant(){
        this.clientservice.getClientListOfCommercant(this.dataUser.tenant_id).subscribe(
            data=> {
              this.clients=data;
             
            }
          );
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
//timplate ts
      onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
    hideDialog() {
        this.productDialog = false;
        this.submitted = false;
    }
    hideDialogadd() {
      this.DialogAdd = false;
      this.submitted = false;
  }
  confirmDeleteSelected() {
    this.deleteProductsDialog = false;
    this.products = this.products.filter(val => !this.selectedProducts.includes(val));
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Client Deleted', life: 3000 });
    this.selectedProducts = [];
}

confirmDelete() {
    this.deleteProductDialog = false;
    this.products = this.products.filter(val => val.id !== this.product.id);
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Client Deleted', life: 3000 });
    this.product = {};
}
deleteSelectedProducts() {
    this.deleteProductsDialog = true;
}

editProduct(client: Client) {
    this.client = { ...client };
    this.productDialog = true;
}

deleteProduct(product: Product) {
    this.deleteProductDialog = true;
    this.product = { ...product };
}
openNew() {
    // this.product = {};
    // this.submitted = false;
     this.DialogAdd = true;
 }
 //client service
 onSelectedImage(e: any){
    this.imageFile = e.target.files[0];
    // @ts-ignore
    this.image = document.querySelector("input[type=file]").files[0];
    var readerimage = new FileReader();
    readerimage.readAsDataURL(this.image);
    readerimage.onload = (res=>{this.imageURL= readerimage.result})
    console.log(this.imageFile); 
   }
   //enbaled et notenabled

   public updateenabled(id:number):void{
    this.clientservice.updateenabledcomm(id,this.client.enabled).subscribe(
      (response: Client) => {
        console.log('response',response);
       this.listClients();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

 
  public updatenotenabled(id:number):void{
    this.clientservice.updatenotenabled(id,this.client.enabled).subscribe(
      (response: Client) => {
        console.log('response',response);
        this.listClients();
    },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );

}
//delete
public onDeletclient(id:number): void {
    this.deleteProductDialog = false;
    this.clientservice.delete(id).subscribe(
      (response: void) => {
        console.log(response);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Client Deleted', life: 3000 });
        this.ngOnInit();
        this.hideDialog();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  //Sadmin
  saveClient(response:any){
    this.client.emailCommercant=this.dataUser.sub;
    this.client.sadminId=this.dataUser.tenant_id;
    console.log("test",this.dataUser.tenant_id)
    var Datacommercant = JSON.stringify(this.client);
    this.clientservice.addclient(Datacommercant , this.image ).subscribe(res=>{console.log(res);
      this.ngOnInit();
      this.hideDialogadd();
      location.reload();
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'client ajouté avec succé', life: 3000 });

     });
  }
  //Commercant
  saveClientCommercant(response:any){
    
    this.client.emailCommercant=this.dataUser.sub;
    this.client.commercantId=this.dataUser.tenant_id;
    console.log("test",this.dataUser.tenant_id)
    var Datacommercant = JSON.stringify(this.client);
    this.clientservice.addclientcommercant(Datacommercant , this.image ).subscribe(res=>{console.log(res);
      this.ngOnInit();
      this.hideDialogadd();
      location.reload();
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'client ajouté avec succé', life: 3000 });

     });
  }
   //update
   update(response:any){
    this.client.emailCommercant=this.dataUser.sub;
    this.client.commercantId=this.dataUser.tenant_id;
    var Datacommercant = JSON.stringify(this.client);
    const commerceId = this.client.id;
    this.clientservice.updateclient(Datacommercant , this.image, commerceId ).subscribe(res=>{console.log(res);
      //this.close.emit();
      this.ngOnInit();
      this.hideDialog();
      location.reload();
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Commercant modifiée avec succé', life: 3000 });
     });
  }
  //update
  updateSadmin(response:any){
    this.client.emailCommercant=this.dataUser.sub;
    this.client.sadminId=this.dataUser.tenant_id;
    var Datacommercant = JSON.stringify(this.client);
    const commerceId = this.client.id;
    this.clientservice.update(Datacommercant , this.image,commerceId).subscribe(res=>{console.log(res);
      //this.close.emit();
      this.ngOnInit();
      this.hideDialog();
      location.reload();
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Commercant modifiée avec succé', life: 3000 });
     });
  }
  clientde(tenantId:String){
    this.clientservice.clientde(tenantId)
    .subscribe(
        data=> {
          this.email=data.email;
          console.log(this.email)
        }

      );
  }
  public validationcompte(id:Number):void{
    this.clientservice.validation(id).subscribe(
      (response: void) => {
        console.log(response);
        this.listClients();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
    
}
