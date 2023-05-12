import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService, SelectItem } from 'primeng/api';
import { Observable } from 'rxjs';
import { CountryService } from 'src/app/demo/service/country.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { Admin2 } from 'src/app/models/admin2';
import { Client } from 'src/app/models/client';
import { Modules } from 'src/app/models/modules';

@Component({
    templateUrl: './inputdemo.component.html',
    providers: [MessageService]

})
export class InputDemoComponent implements OnInit {
    
    countries: any[] = [];

    filteredCountries: any[] = [];

    selectedCountryAdvanced: any[] = [];

    valSlider = 50;

    valColor = '#424242';

    valRadio: string = '';

    valCheck: string[] = [];

    valCheck2: boolean = false;

    valSwitch: boolean = false;

    cities: SelectItem[] = [];

    selectedList: SelectItem = { value: '' };

    selectedDrop: SelectItem = { value: '' };

    selectedMulti: any[] = [];

    valToggle = false;

    paymentOptions: any[] = [];

    valSelect1: string = "";

    valSelect2: string = "";
    fileInfos?: Observable<any>;
    users:any ;
    admin: Admin2=new Admin2(0,"","","","","","","",0,"","","","","","",[],0,0,0,0,"",false);
    file : any;
    logo:any;
    userFile : any;
    logoFile:any;
    imageURL : any;
    logoURL : any;
    modules: Modules[]=[];
    client: Client= new Client(1,"","","","","","","","",0,"","","",false,false,"","","");
    dataUser : any ;
    imageUrl: any;
    role: any;

    valueKnob = 20;
    uploadedFiles: any[] = [];
    selectedModuleIds: number[] = [];



    constructor(private router: Router,public layoutService: LayoutService, private countryService: CountryService, private messageService: MessageService) { }

    ngOnInit() {
        this.listModuless();
        this.dataUser = this.layoutService.getDataFromToken()
        this.getClientByEmail();
        this.countryService.getCountries().then(countries => {
            this.countries = countries;
        });

        this.cities = [
            { label: 'New York', value: { id: 1, name: 'New York', code: 'NY' } },
            { label: 'Rome', value: { id: 2, name: 'Rome', code: 'RM' } },
            { label: 'London', value: { id: 3, name: 'London', code: 'LDN' } },
            { label: 'Istanbul', value: { id: 4, name: 'Istanbul', code: 'IST' } },
            { label: 'Paris', value: { id: 5, name: 'Paris', code: 'PRS' } }
        ];

        this.paymentOptions = [
            { name: 'Option 1', value: 1 },
            { name: 'Option 2', value: 2 },
            { name: 'Option 3', value: 3 }
        ];
    }
    updateSelectedModules(moduleId: number) {
        const index = this.selectedModuleIds.indexOf(moduleId);
        if (index !== -1) {
          this.selectedModuleIds.splice(index, 1); // Supprimer l'ID du module de la liste
        } else {
          this.selectedModuleIds.push(moduleId); // Ajouter l'ID du module à la liste
        }
      }
    listModuless(){
        this.countryService.getModulesList().subscribe(
            data=> {
              this.modules=data;
             
            }
          );
      }
      getClientByEmail(){
        this.countryService.getClientByemail(this.dataUser.sub).subscribe(
            data=> {
              this.client=data;
              console.log("client",data)
            }
          );
      }
    onUpload(event: any) {
        for (const file of event.files) {
            this.uploadedFiles.push(file);
        }

        this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded' });
    }

    onBasicUpload() {
        this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded with Basic Mode' });
    }

    filterCountry(event: any) {
        const filtered: any[] = [];
        const query = event.query;
        for (let i = 0; i < this.countries.length; i++) {
            const country = this.countries[i];
            if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(country);
            }
        }

        this.filteredCountries = filtered;
    }
    saveAdmin(){
        this.admin.moduleId=this.selectedModuleIds;
        console.log(this.selectedModuleIds);
        console.log(this.client.id);
        var Dataadmin = JSON.stringify(this.admin);
        this.layoutService.addAdmin(Dataadmin, this.file, this.logo,this.client.id ).subscribe(res=>{console.log(res);
          alert('Votre demande est bien reçu, Vérifier votre email');
          this.router.navigate(['/dashboard'])
            
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
