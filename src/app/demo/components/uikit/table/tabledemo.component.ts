import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CustomerService } from 'src/app/demo/service/customer.service';
import { Table } from 'primeng/table';
import { MessageService, ConfirmationService } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';
import { Admin } from 'src/app/models/Admin';
import { Admin2 } from 'src/app/models/admin2';
import { StatistiqueService } from 'src/app/demo/service/statistique.service';
import { Facture } from 'src/app/models/facture';
import { Modules } from 'src/app/models/modules';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { environment } from 'src/environments/environment';


interface expandedRows {
    [key: string]: boolean;
}

@Component({
    templateUrl: './tabledemo.component.html',
    providers: [MessageService, ConfirmationService]
})
export class TableDemoComponent implements OnInit {
    modules:Modules[]=[];
    pay:any;
    content :any = [];
    idFrozen: boolean = false;
    Dialog: boolean = false;
    loading: boolean = true;
    valSwitch: boolean = false;
    checked:boolean=true
    facture: Facture= new Facture(0,"",0,0,0,"","","","","","","");
    facture2: Facture= new Facture(0,"",0,0,0,"","","","","","","");
    module:Modules=new Modules(0,"","","")
    @ViewChild('filter') filter!: ElementRef;
    admins:Admin2[]=[];
    admin1:Admin[]=[];
    admin: Admin2=new Admin2(0,"","","","","","","",0,"","","","","","","","",[],0,0,0,0,"",false);
    name:any;
    id:any;
    tenantId:any;

    constructor(private customerService: CustomerService,private statistiqueService:StatistiqueService) { }

    ngOnInit() {
        this.listAdmin(); 
        this.loading = false;
    }
    valide(admin: Admin2) {
      this.Dialog = true;
      this.name= admin.firstname+' '+admin.lastname;
      this.id=admin.id;
      this.tenantId=admin.tenantId;
  }
    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    clear(table: Table) {
        table.clear();
        this.filter.nativeElement.value = '';
    }
    listAdmin(){
        this.customerService.getAdminList().subscribe(
          data=> {
            this.admins=data;
            console.log("admins",this.admins);
          }
        )
      }
      public validationcompte(id:number,tenantId:string):void{
        this.Dialog=false;
        this.saveFacture(tenantId,id);
        // this.getFacture(tenantId);
        console.log("test",this.getFacture(tenantId))
      }
      public UpdateAdmin(admin:Admin2,id:number): void {
        this.customerService.updateAdmin(this.admin,id).subscribe(
          (response: Admin2) => {
            console.log('response',response);
            this.listAdmin();
          },
          (error: HttpErrorResponse) => {
            alert(error.message);
          }
        );
      }
      public updateenabled(id:number):void{
        this.customerService.updateenabled(id,this.admin.enabled).subscribe(
          (response: Admin2) => {
            console.log('response',response);
            this.listAdmin();
          },
          (error: HttpErrorResponse) => {
            alert(error.message);
          }
        );
      }
      public updatenotenabled(id:number):void{
        this.checked=false;
        this.customerService.updatenotenabled(id,this.admin.enabled).subscribe(
          (response: Admin2) => {
            console.log('response',response);
            this.listAdmin();
          },
          (error: HttpErrorResponse) => {
            alert(error.message);
          }
        );
      }
      handleChange(e : any) {
        let isChecked = e.checked;
    }
    saveFacture(tenantId: string,id:number){
      console.log("id", tenantId)
      this.facture.adminId=tenantId;
      console.log("tenaniid", this.facture.adminId)
        this.statistiqueService.AddFacture(tenantId,this.facture).subscribe(
          data=> {
            this.facture=data;
            this.facture2=data;
            this.getAdmin(tenantId,id);
          
            console.log("facture",this.facture);
          }
        )
    }
    getAdmin(tenantId: string,id:number){
      this.statistiqueService.getAdmin(tenantId).subscribe(
        data=> {
          this.admin=data;
          this.listModules(tenantId,id);

          console.log("admin",this.admin)
        }
      )
    }
    listModules(tenantId: string,id:number){
      this.content = []
      this.statistiqueService.getmodules(tenantId).subscribe(
        data=> {
          this.modules=data;
          data.forEach(item=>{
            this.content.push(
              [item.reference,item.nom,item.prix,item.prix+'DT',item.prix+'DT']
            )
          })
          this.openPDF(tenantId);
            this.customerService.validation(id).subscribe(
              data=> {
                location.reload();
                console.log(data);
                this.listAdmin();
              }
            );
          console.log("Our content",this.content)
          console.log("modules",this.modules)
  
        }
      )
    }
    getFacture(tenantId: string){
      this.statistiqueService.getFacture(tenantId).subscribe(
        data=> {
          this.facture2=data;
          console.log("facturee",this.facture2)

        }
      )
    }
    public openPDF(tenantId :string): void {
      
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
          ['Facture N° :', this.facture2.reference],
          ['Date :',  this.facture2.dateFacture[2]+'/'+this.facture2.dateFacture[1]+'/'+this.facture2.dateFacture[0]]],
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
          ['Total HT', this.admin.apayer +'DT'],
          ['Total TVA', this.facture2.tva+'%'],
          ['Total TTC', this.facture2.ttc+'DT'],
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
          ['19%',  this.facture2.ttc-this.facture2.ht+'DT'],
        ],
        theme: 'grid',
      });
      doc.setFontSize(15);
      const testText3 = 'ARRÊTER LA PRÉSENTE FACTURE À LA SOMME :\n' +
        this.facture2.totalLettre;
        doc.text(testText3, 25, (doc as any).lastAutoTable.finalY + 40, {align: 'left'});
        doc.setFontSize(15);
        const testText5 = 'Signature et cachet  ';
        doc.text(testText5, 25, (doc as any).lastAutoTable.finalY + 120, {align: 'left'});
        const testText6 = 'Notes:\n' +
        'Payée';
        doc.text(testText6, doc.internal.pageSize.width / 2, (doc as any).lastAutoTable.finalY + 120, {align: 'left'});
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
      doc.save('FactureAdmin.pdf');
    }
    formatCurrency(value: number) {
      return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  }
  getModulesAdmin(tenantId:string){
    this.statistiqueService.getModulesByAdmin(tenantId).subscribe(
      data=> {
        this.modules=data;
        console.log("modules",this.modules);
      }
    )
  }
    
}