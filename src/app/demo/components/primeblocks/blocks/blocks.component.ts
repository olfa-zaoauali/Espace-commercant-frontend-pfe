import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { StatistiqueService } from 'src/app/demo/service/statistique.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { Admin2 } from 'src/app/models/admin2';
import { Client } from 'src/app/models/client';
import { Commercant } from 'src/app/models/commercant';
import { Compte } from 'src/app/models/compte';
import { SAdmin } from 'src/app/models/s-admin';

@Component({
    templateUrl: './blocks.component.html',
    providers: [MessageService]
})
export class BlocksComponent implements OnInit{
    dataUser : any ;
    imageUrl: any;
    role: any;
    commercant: Commercant= new Commercant(0,"","","","","","","","",0,0,0,0,0,0,false,"","");
    sadmin:SAdmin=new SAdmin(0,"","","","","","","","","",0,0,0,0,true);   
    client: Client= new Client(1,"","","","","","","","",0,"","","",false,false,"","","");
    admin: Admin2=new Admin2(0,"","","","","","","",0,"","","","","","",[],0,0,0,0,"",false);

    compte:Compte= new Compte("","","");
    Resultat:any;
    tenant_id:any
    Admin:Boolean=true; 
    SAdmin:Boolean=true;
    emails:any[]=[];
    email:any
    Commercant:Boolean=true; 
    Image:any;
    imageURL:any;
    image:any;
    imageFile:any;
    Client:Boolean=true;

      constructor(private messageService: MessageService,public layoutService: LayoutService,private statistiqueService:StatistiqueService,) { }
      ngOnInit(): void {
          this.dataUser = this.layoutService.getDataFromToken();
          this.role = this.dataUser.role;
          this.imageUrl=this.dataUser.image;
          this.tenant_id=this.dataUser.tenant_id;
          console.log("user",this.dataUser);
          console.log("image",this.imageUrl);
          console.log("role",this.role);
          if(this.isCommercant()){
            this.getcommercant();
          }
          if(this.isSadmin()){
           this.getSadmin();
          }
          if(this.isClient()){
            this.getClient();
           }
           if(this.isAdmin()){
            this.getAdmin();
           }
      }
      getcommercant(){
        this.statistiqueService.getInfoCommerçant(this.tenant_id).subscribe(
          data=> {
            this.commercant=data;
            console.log("commercant",this.commercant)
          }
        )
      }
      updateCommercant(){
        this.statistiqueService.updateComtpecommercant(this.dataUser.tenant_id, this.commercant).subscribe(res=>{console.log(res);
          //this.close.emit();
          this.ngOnInit();
          location.reload();
          console.log("object",this.commercant)
         });
      }
      ChangerMotDePasse(){
        this.statistiqueService.changerMotDePasse(this.tenant_id,this.compte).subscribe(
          data=> {
            this.Resultat=data;
            console.log("commercant",this.Resultat);
            console.log("2",this.compte);
            this.ngOnInit();
            location.reload(); 
             
          }
        )
      }
      changerImage(){
        this.statistiqueService.changerImage(this.tenant_id,this.Image).subscribe(
          data=> {
            this.commercant=data;
            console.log("commercant",this.commercant);
          }
        )
      }
      onBasicUpload() {
        this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded with Basic Mode' });
    }
    onSelectedImage(e: any){
      this.imageFile = e.target.files[0];
      // @ts-ignore
      this.image = document.querySelector("p-fileUpload").files[0];
      var readerimage = new FileReader();
      readerimage.readAsDataURL(this.image);
      readerimage.onload = (res=>{this.imageURL= readerimage.result})
      console.log(this.imageFile); 
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
          return this.Client=true;
        }
        else{
          return this.Client=false;
        }
      }
      //Sadmin
      getSadmin(){
        this.statistiqueService.getInfoSAdminCompte(this.tenant_id).subscribe(
          data=> {
            this.sadmin=data;
            console.log("sadmin",this.sadmin)
          }
        )
      }
      updateSadmin(id:number){
        this.statistiqueService.updateComtpeAdmin(id, this.sadmin).subscribe(res=>{console.log(res);
          //this.close.emit();
          this.ngOnInit();
          location.reload();
          console.log("object",this.sadmin)
         });
      }
      ChangerMotDePasseSadmin(){
        this.statistiqueService.changerMotDePasseSadmin(this.tenant_id,this.compte).subscribe(
          data=> {
            this.Resultat=data;
            console.log("2",this.Resultat);
            this.ngOnInit();
            location.reload(); 
             
          }
        )
      }
      //client
      getClient(){
        this.statistiqueService.getInfoClientCompte(this.tenant_id).subscribe(
          data=> {
            this.client=data;
            console.log("client",this.client)
          }
        )
      }
      updateClient(){
        this.statistiqueService.updateComtpeClient(this.tenant_id, this.client).subscribe(res=>{console.log(res);
          //this.close.emit();
          this.ngOnInit();
          location.reload();
          console.log("object",this.client)
         });
      }
      ChangerMotDePasseClient(){
        this.statistiqueService.changerMotDePasseClient(this.tenant_id,this.compte).subscribe(
          data=> {
            this.Resultat=data;
            console.log("2",this.Resultat);
            this.ngOnInit();
            location.reload(); 
             
          }
        )
      }
      //admin
      getAdmin(){
        this.statistiqueService.getInfoAdminCompte(this.tenant_id).subscribe(
          data=> {
            this.admin=data;
            console.log("admin",this.admin)
          }
        )
      }
      updateadmin(id:number){
        this.statistiqueService.updateAdmin(id, this.admin).subscribe(res=>{console.log(res);
          //this.close.emit();
          this.ngOnInit();
          location.reload();
          console.log("object",this.admin)
         });
      }
      ChangerMotDePasseAdmin(){
        this.statistiqueService.changerMotDePasseAdmin(this.tenant_id,this.compte).subscribe(
          data=> {
            this.Resultat=data;
            console.log("2",this.Resultat);
            this.ngOnInit();
            location.reload(); 
             
          }
        )
      }

}