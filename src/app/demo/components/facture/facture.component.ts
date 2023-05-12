import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { Admin2 } from 'src/app/models/admin2';
import { StatistiqueService } from '../../service/statistique.service';
import { Modules } from 'src/app/models/modules';
import { Facture } from 'src/app/models/facture';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-facture',
  templateUrl: './facture.component.html',
  styleUrls: ['./facture.component.scss']
})
export class FactureComponent implements OnInit {
  @ViewChild('facturee')
  facturee!: ElementRef;

  admin: Admin2=new Admin2(0,"","","","","","","",0,"","","","","","",[],0,0,0,0,"",false);
  modules:Modules[]=[];
  pay:any;
  facture: Facture= new Facture(0,"",0,0,0,"","","","","","","");
  content :any = [];

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
        data.forEach(item=>{
          this.content.push(
            [item.reference,item.nom,item.prix,item.prix+'DT',item.prix+'DT']
          )
        })
        console.log("Our content",this.content)
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
  public openPDF(): void {
    const font = environment.fontA;
    const doc = new jsPDF('p', 'pt', 'a4');
    doc.addFileToVFS('Amiri-Regular.ttf', font);
    doc.addFont('Amiri-Regular.ttf', 'Amiri', 'normal');
    doc.setFont('Amiri'); // set font
    doc.setFontSize(20);
    autoTable(doc, {
      styles: {font: 'Amiri', fontSize: 14, halign: 'left'},
      startY: 45,
      columnStyles: {
        0: {cellWidth: 50, textColor: 0, cellPadding: 0},
        1: {cellWidth: 65, textColor: 0, cellPadding: 0}
      },
      body: [
        ['Facture N° :', this.facture.reference],
        ['Date :',  this.facture.dateFacture[2]+'/'+this.facture.dateFacture[1]+'/'+this.facture.dateFacture[0]]],
      theme: 'plain',
      tableWidth: 'wrap'
    });
    doc.addImage('assets/layout/images/windlogo.jpg', 'png', doc.internal.pageSize.width - 120, 25, 80, 80);
    doc.line(30, 85, 560, 85); // horizontal line
    autoTable(doc, {
      styles: {font: 'Amiri', fontSize: 14, halign: 'left'},
      startY: 100,
      margin: {left : 50},
      headStyles: { fillColor: [102, 102, 102], textColor : [255,255,255]},
      columnStyles: {
        0: {cellWidth: 120, textColor: 0},
        1: {cellWidth: 110, textColor: 0}
      },
      head: [[{content: 'Client', colSpan: 2, styles: {halign: 'center'}}]],
      body: [
        ['Nom', this.admin.firstname+' '+this.admin.lastname],
        ['Adresse', this.admin.adresse],
       ['Ville', this.admin.ville],
        ['Matricule Fiscale', this.admin.matricule]
      ],
      theme: 'striped',
    });
    let tab : any= []
    this.modules.forEach(elem => {
      tab.push([elem.reference , elem.nom, '1', elem.prix+'DT',elem.prix+'DT'])

    })
    
    autoTable(doc, {
      // styles: {font: 'Amiri', fontSize: 12, halign: 'right', lineColor: 1, lineWidth: 1},
      styles: {font: 'Amiri', fontSize: 15, halign: 'left', textColor : 1},
      // headStyles: {fillColor: [128, 128, 128]},
      startY: 280,
      columnStyles: {
        0: {cellWidth: 100},
        1: {cellWidth: 100},
        2: {cellWidth: 100},
        3: {cellWidth: 100},
        4: {cellWidth: 100},
        5: {cellWidth: 100},
      },
      headStyles: { fillColor: [102, 102, 102], textColor : [255,255,255]},
      head: [['Code ', 'Désignation ', 'Quantité ', 'P.U HT ', 'Total HT']],
      body: [ 
        ...this.content
      //  [this.modules[0].id,this.modules[0].id,this.modules[0].id,this.modules[0].id],
      //  [this.modules[1].id,this.modules[0].id,this.modules[0].id,this.modules[0].id]

      ],
      theme: 'striped',
      tableWidth: 'auto',
      

    });
    
    
    const y = (doc as any).lastAutoTable.finalY + 20;
    autoTable(doc, {
      styles: {font: 'Amiri', fontSize: 15, halign: 'left', overflow: 'linebreak'},
      margin: {left: 375},
      startY: y,
      columnStyles: {
        0: {cellWidth: 80, fillColor: [245, 245, 245], textColor: [0, 0, 0]},
        1: {cellWidth: 80}
      },
      body: [
        ['Total HT', this.admin.apayer],
        ['Total TVA', this.facture.tva],
        ['Total TTC', this.facture.ttc],
      ],
      theme: 'grid',
    });
    autoTable(doc, {
      styles: {font: 'Amiri', fontSize: 15, halign: 'left', textColor: 1},
      //  styles: {font: 'Amiri', fontSize: 12, halign: 'right', lineColor: 1, lineWidth: 2, overflow: 'linebreak'},
      // margin: {right: 375},
      startY: y,
      headStyles: { fillColor: [102, 102, 102], textColor : [255,255,255]},
      margin: {left: 50},
      columnStyles: {
        0: {cellWidth: 80},
        1: {cellWidth: 80, }
      },
      head: [[ 'Base TVA', 'Total TVA']],
      body: [
        ['19%',  this.facture.ttc-this.facture.ht+'DT'],
      ],
      theme: 'grid',
    });
    doc.setFontSize(15);
    const testText3 = 'ARRÊTER LA PRÉSENTE FACTURE À LA SOMME :\n' +
      this.facture.totalLettre;
    doc.text(testText3, 25, (doc as any).lastAutoTable.finalY + 40, {align: 'left'});
    
    const pages = doc.getNumberOfPages();
    doc.setFontSize(10);
    for (let j = 1; j < pages + 1; j++) {
      doc.setPage(j);
      const str = '  Rue Chaanbi MAHDIA, TUNISIE - Téléphone:  73 671 986 - E-mail: administration@wind-consulting-tunisia.com ';
      doc.setFontSize(10);
      doc.text(str, doc.internal.pageSize.width / 2, doc.internal.pageSize.height - 25, {align: 'center'});   //key is the interal pageSize function
      doc.setDrawColor(0, 0, 0);  // draw red lines
      doc.line(30, doc.internal.pageSize.height - 35, 560, doc.internal.pageSize.height - 35); // horizontal line
      const stra = 'au Capital: - C.D: -Code TVA: 1234567/M/A/B/000';
      doc.setFontSize(10);
      doc.text(stra, doc.internal.pageSize.width / 2, doc.internal.pageSize.height - 15, {align: 'center'});
    }
    doc.save('FacturefR_v2.pdf');
  }

}
