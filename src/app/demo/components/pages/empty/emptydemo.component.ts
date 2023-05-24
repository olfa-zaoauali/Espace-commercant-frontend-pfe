import { Component, OnInit } from '@angular/core';
import { StatistiqueService } from 'src/app/demo/service/statistique.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { Commercant } from 'src/app/models/commercant';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { environment } from 'src/environments/environment';
import html2canvas from 'html2canvas';
import { Admin2 } from 'src/app/models/admin2';

@Component({
    templateUrl: './emptydemo.component.html'
})
export class EmptyDemoComponent  implements OnInit {
    commercant: Commercant= new Commercant(0,"","","","","","","","","",0,0,0,0,0,0,false,"","");
    admin: Admin2=new Admin2(0,"","","","","","","",0,"","","","","","","","",[],0,0,0,0,"",false);

    dataUser : any ;
    tenant_id:any
    constructor(private statistiqueService:StatistiqueService,public layoutService: LayoutService ) { }
    ngOnInit(): void {
        this.dataUser = this.layoutService.getDataFromToken();
        this.tenant_id=this.dataUser.tenant_id;
        this.getcommercant();
        this.getAdmin();

    }
    getcommercant(){
        this.statistiqueService.getInfoCommerçant(this.tenant_id).subscribe(
          data=> {
            this.commercant=data;
            console.log("commercant",this.commercant)
          }
        )
      }
      getAdmin(){
        this.statistiqueService.getInfoAdmin(this.tenant_id).subscribe(
          data=> {
            this.admin=data;
            console.log("admin",this.admin)
          }
        )
      }
      generarPDF() {
        const div = document.getElementById('content');
        const options = {
          background: 'white',
          scale: 3
        };
      
        // Ajouter un délai de 500 ms avant la capture d'écran
        setTimeout(() => {
          html2canvas(div!, options).then((canvas) => {
            var img = canvas.toDataURL("image/PNG");
            var doc = new jsPDF('p', 'mm', 'a4', true);
      
            const bufferX = 5;
            const bufferY = 5;
            const imgProps = (<any>doc).getImageProperties(img);
            const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
            doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
      
            doc.save('contrat.pdf');
          });
        }, 500); // Délai de 500 ms
      }
      
    
 }
