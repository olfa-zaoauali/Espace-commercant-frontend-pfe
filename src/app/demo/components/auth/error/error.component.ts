import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { Admin2 } from 'src/app/models/admin2';


@Component({
    selector: 'app-error',
    templateUrl: './error.component.html',
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
    selectedFiles?: FileList;
    currentFile?: File;
    progress = 0;
    message = '';
  
    fileInfos?: Observable<any>;
    users:any ;
    admin :  Admin2= new Admin2(1,"","","","","","","","","","",false);
    file : any;
    logo:any;
    userFile : any;
    logoFile:any;
    imageURL : any;
    logoURL : any;
    constructor(public layoutService: LayoutService, private builder: FormBuilder, private router: Router){}
    
      registerform=this.builder.group({
        firstname:this.builder.control('', Validators.required),
        lastname:this.builder.control('',Validators.required),
        password:this.builder.control('',Validators.compose([Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')])),
        email:this.builder.control('',Validators.compose([Validators.required,Validators.email])),
        telephone:this.builder.control('', Validators.required),
        company:this.builder.control('', Validators.required),
        domain:this.builder.control('', Validators.required),
        matricule:this.builder.control(''),
        batinda:this.builder.control(''),
        logo:this.builder.control(''),
        role:this.builder.control(''),
        isactive:this.builder.control(false)
      });
    
      //add sans files 
      proceedregisteration(){
        if (this.registerform.valid) {
          this.layoutService.Procedeedregister(this.registerform.value).subscribe( 
            (response: Admin2) => {
            console.log(response);
            //this.listofusers();
            this.router.navigate(['login'])
          });
        } else {
            console.log("erreur");
        }
      }
      selectFile(event: any): void {
        this.selectedFiles = event.target.files;
      }
      //add avec files
    
      saveAdmin(){
        var Dataadmin = JSON.stringify(this.admin);
        this.layoutService.addAdmin(Dataadmin, this.file, this.logo ).subscribe(res=>{console.log(res);
          alert('Votre demande est bien reçu, Vérifier votre email');
          this.router.navigate(['login'])
            
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
    
      onSelectedImage(e: any){
        this.logoFile = e.target.files[0];
        // @ts-ignore
        this.logo = document.querySelector("div.olfa input[type=file]").files[0];
        var readerlogo = new FileReader();
        readerlogo.readAsDataURL(this.logo);
        readerlogo.onload = (res=>{this.logoURL= readerlogo.result})
        console.log(this.logoFile); 
       }
  
}