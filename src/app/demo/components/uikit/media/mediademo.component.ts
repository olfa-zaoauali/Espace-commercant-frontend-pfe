import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/demo/service/product.service';
import { PhotoService } from 'src/app/demo/service/photo.service';
import { Product } from 'src/app/demo/api/product';
import { Modules } from 'src/app/models/modules';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { Client } from 'src/app/models/client';

@Component({
    templateUrl: './mediademo.component.html',
    providers: [MessageService]

})
export class MediaDemoComponent implements OnInit {

    products!: Product[];
    modules:Modules[]=[];
    module:Modules=new Modules(0,"","","");
    DialogAdd:boolean=false;
    productDialog: boolean = false;
    submitted: boolean = false;
    deleteProductsDialog: boolean = false;
    SelectedModule:Modules[]=[];
    Dialog:boolean=false;
    name:any
    id:any
    product: Product = {};
    deleteProductDialog:boolean=false;
    images!: any[];

    galleriaResponsiveOptions: any[] = [
        {
            breakpoint: '1024px',
            numVisible: 5
        },
        {
            breakpoint: '960px',
            numVisible: 4
        },
        {
            breakpoint: '768px',
            numVisible: 3
        },
        {
            breakpoint: '560px',
            numVisible: 1
        }
    ];

    carouselResponsiveOptions: any[] = [
        {
            breakpoint: '1024px',
            numVisible: 3,
            numScroll: 3
        },
        {
            breakpoint: '768px',
            numVisible: 2,
            numScroll: 2
        },
        {
            breakpoint: '560px',
            numVisible: 1,
            numScroll: 1
        }
    ];

    constructor(private messageService: MessageService,private productService: ProductService, private photoService: PhotoService) { }
    
    ngOnInit() {
        this.listmodules();
        this.productService.getProductsSmall().then(products => {
            this.products = products;
        });

        this.photoService.getImages().then(images => {
            this.images = images;
        });
    }
    update(response:any){
      
      const commerceId = this.module.id;
      this.photoService.update(this.module, commerceId ).subscribe(res=>{console.log(res);
        //this.close.emit();
        this.ngOnInit();
        this.hideDialog();
        location.reload();
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Module modifiée avec succé', life: 3000 });
       });
    }
    deleteopen(modulee:Modules) {
      this.deleteProductDialog = true;
      this.module = { ...modulee };
      this.name=modulee.nom;
      this.id=modulee.id;

  }

    confirmDeleteSelected() {
        this.deleteProductsDialog = false;
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Commerçants Deleted', life: 3000 });
        this.SelectedModule = [];
    }
    editProduct(module: Modules) {
      this.module = { ...module };
      this.productDialog = true;
  }

  
    public onDelet(id:number): void {
      this.deleteProductDialog = false;
        this.photoService.delete(id).subscribe(
          (response: void) => {
            console.log(response);
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Module Deleted', life: 3000 });
            this.ngOnInit();
            this.hideDialog();
          },
          (error: HttpErrorResponse) => {
            alert(error.message);
          }
        );
      }
    listmodules(){
        this.photoService.getModules().subscribe(
          data=> {
            this.modules=data;
          }
        )
      }
      AddModules(response:any){
        this.photoService.AddModules(this.module).subscribe(
          data=> {
            this.module=data;
          }

        )
        this.ngOnInit();
        this.hideDialogadd();
        location.reload();
      }
      openNew() {
        // this.product = {};
        this.submitted = false;
         this.DialogAdd = true;
     }
     hideDialog() {
        this.productDialog = false;
        this.submitted = false;
    }
    hideDialogadd() {
      this.DialogAdd = false;
      this.submitted = false;
  }
    
}
