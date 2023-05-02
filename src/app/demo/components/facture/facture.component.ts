import { Component, OnInit } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { Admin2 } from 'src/app/models/admin2';
import { StatistiqueService } from '../../service/statistique.service';
import { Modules } from 'src/app/models/modules';
import { Facture } from 'src/app/models/facture';

@Component({
  selector: 'app-facture',
  templateUrl: './facture.component.html',
  styleUrls: ['./facture.component.scss']
})
export class FactureComponent implements OnInit {
  admin: Admin2=new Admin2(0,"","","","","","","",0,"","","","","","",[],0,0,0,0,"",false);
  modules:Modules[]=[];
  pay:any;
  facture: Facture= new Facture("",0,0,0,"","","");
  constructor(public layoutService: LayoutService, public statistiqueService : StatistiqueService) {
    
}
  ngOnInit(): void {
        this.getAdmin(); 
        this.listModules();
        this.getFacture();
}

  getAdmin(){
    this.statistiqueService.getAdmin("e7fc637b-20cb-4244-961d-592ffdf8f232").subscribe(
      data=> {
        this.admin=data;
        console.log("admin",this.admin)
      }
    )
  }
  listModules(){
    this.statistiqueService.getmodules("e7fc637b-20cb-4244-961d-592ffdf8f232").subscribe(
      data=> {
        this.modules=data;
        console.log("modules",this.modules)

      }
    )
  }
  getFacture(){
    this.statistiqueService.getFacture("e7fc637b-20cb-4244-961d-592ffdf8f232").subscribe(
      data=> {
        this.facture=data;
        console.log("facture",this.facture)
      }
    )
  }
  

}
