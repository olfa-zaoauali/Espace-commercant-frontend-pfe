import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { CountryService } from 'src/app/demo/service/country.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { Admin2 } from 'src/app/models/admin2';
import { Client } from 'src/app/models/client';


@Component({
    selector: 'app-error',
    templateUrl: './error.component.html',
    providers: [MessageService],

    styles: [`
    :host ::ng-deep .pi-eye,
    :host ::ng-deep .pi-eye-slash {
        transform:scale(1.6);
        margin-right: 1rem;
        color: var(--primary-color) !important;
    }
`]
})
export class ErrorComponent { 
    image:any
    selectedFiles?: FileList;
    currentFile?: File;
    progress = 0;
    message = '';
    dataUser : any ;
    imageUrl: any;
    role: any;
    tenant_id:any;
    fileInfos?: Observable<any>;
    users:any ;
    admin: Admin2=new Admin2(0,"","","","","","","",0,"","","","","","",[],0,0,0,0,"",false);
    file : any;
    logo:any;
    userFile : any;
    logoFile:any;
    imageURL : any;
    logoURL : any;
    imageFile:any
    clients: Client[]=[];
    client: Client= new Client(1,"","","","","","","","",0,"","","",false,"","","");
    selectedCountryAdvanced: any[] = [];
    

    constructor(private clientservice: CountryService ,private messageService: MessageService, public layoutService: LayoutService, private builder: FormBuilder, private router: Router){}
    //client
    saveClient(response:any){
      this.client.emailCommercant="olfaammari1@gmail.com";
      var Datacommercant = JSON.stringify(this.client);
      this.clientservice.addclient(Datacommercant , this.image ).subscribe(res=>{console.log(res);
        alert('Votre demande est bien reçu, Vérifier votre email');
        this.router.navigate(['/auth/login'])
        
       });
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
     //Admin
      //add avec files
    
      saveAdmin(){
        var Dataadmin = JSON.stringify(this.admin);
        this.layoutService.addAdmin(Dataadmin, this.file, this.logo,0 ).subscribe(res=>{console.log(res);
          alert('Votre demande est bien reçu, Vérifier votre email');
          this.router.navigate(['/auth/login'])
            
          // this.toastr.success("event Added Succesfully"); this.clearForm();this.refresh()
        });
      }
      
      onSelectedfile(e: any){
        this.userFile = e.target.files[0];
        // @ts-ignore
        this.file = document.querySelector('input[type=file]').files[0];
        var reader = new FileReader();
        reader.readAsDataURL(this.file);
        reader.onload = (res=>{this.imageURL = reader.result})
        console.log(this.userFile);
      }
    
      onSelectedImagee(e: any){
        this.logoFile = e.target.files[0];
        // @ts-ignore
        this.logo = document.querySelector("div.olfa input[type=file]").files[0];
        var readerlogo = new FileReader();
        readerlogo.readAsDataURL(this.logo);
        readerlogo.onload = (res=>{this.logoURL= readerlogo.result})
        console.log(this.logoFile); 
       }
  
}