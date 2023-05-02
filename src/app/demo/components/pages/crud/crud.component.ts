import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/demo/api/product';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ProductService } from 'src/app/demo/service/product.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Commercant } from 'src/app/models/commercant';
import { HttpErrorResponse } from '@angular/common/http';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
    templateUrl: './crud.component.html',
    providers: [MessageService]
})
export class CrudComponent implements OnInit {
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
    commercants: Commercant[]=[];
    commercant: Commercant= new Commercant(0,"","","","","","","",0,0,0,0,0,false,"","");
    comm:any
    image:any
    imageFile:any
    imageURL:any
    uploadedFiles: any[] = [];
    checked:boolean=true;
    Admin:Boolean=true; 
    SAdmin:Boolean=true; 

   

    constructor(public layoutService: LayoutService , private productService: ProductService, private messageService: MessageService,private builder: FormBuilder,private router: Router) { }

    ngOnInit() {
        this.dataUser = this.layoutService.getDataFromToken();
        this.role = this.dataUser.role;
        this.imageUrl=this.dataUser.image;
        this.tenant_id=this.dataUser.tenant_id;
        console.log("id",this.tenant_id);
        if(this.isAdmin()){        this.listCommercantadmin();
        }
        if(this.isSadmin()){        this.listCommercantsadmin();
        }


        //this.productService.getProducts().then(data => this.products = data);

      /* this.cols = [
            { field: 'product', header: 'Product' },
            { field: 'price', header: 'Price' },
            { field: 'category', header: 'Category' },
            { field: 'rating', header: 'Reviews' },
            { field: 'inventoryStatus', header: 'Status' }
        ];

        this.statuses = [
            { label: 'INSTOCK', value: 'instock' },
            { label: 'LOWSTOCK', value: 'lowstock' },
            { label: 'OUTOFSTOCK', value: 'outofstock' }
        ];*/
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
   
    //commercant
    registerform=this.builder.group({
        firstname:this.builder.control('', Validators.required),
        lastname:this.builder.control('',Validators.required),
        email:this.builder.control('',Validators.compose([Validators.required,Validators.email])),
        telephone:this.builder.control('', Validators.required),
        adresse:this.builder.control('', Validators.required),
        ville:this.builder.control('', Validators.required),
        image:this.builder.control(''),
        role:this.builder.control(''),
        isactive:this.builder.control(false)
    
      });
      

    listCommercant(){
        this.productService.getCommercantList().subscribe(
          data=> {
            this.commercants=data;
          }
        )
      }
      listCommercantadmin(){
        this.layoutService.chercherCommercantadmin(this.dataUser.tenant_id).subscribe(
          data=> {
            this.commercants=data;
          }
        )
      }
      listCommercantsadmin(){
        this.layoutService.chercherCommercantsadmin(this.dataUser.tenant_id).subscribe(
          data=> {
            this.commercants=data;
          }
        )
      }
      
      public GetElementByid(modal: any,commercant:any):void  {
        console.log("commercant",commercant);
        this.comm = commercant;
        this.productService.selectedCommerceId = commercant.id;
       }
     
    //add
      saveCommercant(response:any){
        this.commercant.admin=this.dataUser.tenant_id;
        console.log("test",this.dataUser.tenant_id)
        var Datacommercant = JSON.stringify(this.commercant);
        this.productService.addcommercant(Datacommercant , this.image ).subscribe(res=>{console.log(res);
          this.ngOnInit();
          this.hideDialogadd();
          location.reload();
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Commercant ajouté avec succé', life: 3000 });

         });
      }
       //addcomsadmin
       saveCommercantsadmin(response:any){
        this.commercant.sadminId=this.dataUser.tenant_id;
        console.log("test",this.dataUser.tenant_id)
        var Datacommercant = JSON.stringify(this.commercant);
        this.productService.addcommercantsadmin(Datacommercant , this.image ).subscribe(res=>{console.log(res);
          this.ngOnInit();
          this.hideDialogadd();
          location.reload();
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Commercant ajouté avec succé', life: 3000 });

         });
      }
      //update
      update(response:any){
        this.commercant.admin=this.dataUser.tenant_id;
        var Datacommercant = JSON.stringify(this.commercant);
        const commerceId = this.commercant.id;
        this.productService.updatecommercant(Datacommercant , this.image, commerceId ).subscribe(res=>{console.log(res);
          //this.close.emit();
          this.ngOnInit();
          this.hideDialog();
          location.reload();
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Commercant modifiée avec succé', life: 3000 });
         });
      }
       //updatesadmin
       updatesadmin(response:any){
        this.commercant.sadminId=this.dataUser.tenant_id;
        var Datacommercant = JSON.stringify(this.commercant);
        const commerceId = this.commercant.id;
        this.productService.updatecommercantsadmin(Datacommercant , this.image, commerceId ).subscribe(res=>{console.log(res);
          //this.close.emit();
          this.ngOnInit();
          this.hideDialog();
          location.reload();
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Commercant modifiée avec succé', life: 3000 });

         });
      }
      //enbaled et notenabled

      public updateenabled(id:number):void{
        this.productService.updateenabledcomm(id,this.commercant.enabled).subscribe(
          (response: Commercant) => {
            console.log('response',response);
            if(this.isAdmin()){        this.listCommercantadmin();
            }
            if(this.isSadmin()){        this.listCommercantsadmin();
            }
    
          },
          (error: HttpErrorResponse) => {
            alert(error.message);
          }
        );
      }
    
     
      public updatenotenabled(id:number):void{
        this.productService.updatenotenabledcomm(id,this.commercant.enabled).subscribe(
          (response: Commercant) => {
            console.log('response',response);
            if(this.isAdmin()){        this.listCommercantadmin();
            }
            if(this.isSadmin()){        this.listCommercantsadmin();
            }
    
          },
          (error: HttpErrorResponse) => {
            alert(error.message);
          }
        );
    
    }
    
    updatecommercant(response:any) {
      this.commercants.forEach((item,id) =>{
        if(item.email === response.email){
          this.commercants[id] = response;
        }
      })
    }
    
    
    onSelectedImage(e: any){
        this.imageFile = e.target.files[0];
        // @ts-ignore
        this.image = document.querySelector("input[type=file]").files[0];
        var readerimage = new FileReader();
        readerimage.readAsDataURL(this.image);
        readerimage.onload = (res=>{this.imageURL= readerimage.result})
        console.log(this.imageFile); 
       }
    openNew() {
       // this.product = {};
       // this.submitted = false;
        this.DialogAdd = true;
    }
//Product
    deleteSelectedProducts() {
        this.deleteProductsDialog = true;
    }

    editProduct(commercant: Commercant) {
        this.commercant = { ...commercant };
        this.productDialog = true;
    }

    deleteProduct(product: Product) {
        this.deleteProductDialog = true;
        this.product = { ...product };
    }

    confirmDeleteSelected() {
        this.deleteProductsDialog = false;
        this.products = this.products.filter(val => !this.selectedProducts.includes(val));
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Commerçants Deleted', life: 3000 });
        this.selectedProducts = [];
    }

    confirmDelete() {
        this.deleteProductDialog = false;
        this.products = this.products.filter(val => val.id !== this.product.id);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Commerçant Deleted', life: 3000 });
        this.product = {};
    }
  //delete
  public onDeletcommercant(id:number): void {
    this.deleteProductDialog = false;
    this.productService.delete(id).subscribe(
      (response: void) => {
        console.log(response);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Commerçant Deleted', life: 3000 });
        this.ngOnInit();
        this.hideDialog();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

    hideDialog() {
        this.productDialog = false;
        this.submitted = false;
    }
    hideDialogadd() {
      this.DialogAdd = false;
      this.submitted = false;
  }
    
 /*   saveProduct() {
        this.submitted = true;

        if (this.product.name?.trim()) {
            if (this.product.id) {
                // @ts-ignore
                this.product.inventoryStatus = this.product.inventoryStatus.value ? this.product.inventoryStatus.value : this.product.inventoryStatus;
                this.products[this.findIndexById(this.product.id)] = this.product;
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
            } else {
                this.product.id = this.createId();
                this.product.code = this.createId();
                this.product.image = 'product-placeholder.svg';
                // @ts-ignore
                this.product.inventoryStatus = this.product.inventoryStatus ? this.product.inventoryStatus.value : 'INSTOCK';
                this.products.push(this.product);
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
            }

            this.products = [...this.products];
            this.productDialog = false;
            this.product = {};
        }
    }

    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.products.length; i++) {
            if (this.products[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    createId(): string {
        let id = '';
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }*/

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
    
}
