import { Component, OnInit } from '@angular/core';
import { NodeService } from 'src/app/demo/service/node.service';
import { TreeNode} from 'primeng/api';
import { Cashout } from 'src/app/models/cashout';
import { Commercant } from 'src/app/models/commercant';
import { Facture } from 'src/app/models/facture';
import { StatistiqueService } from 'src/app/demo/service/statistique.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { environment } from 'src/environments/environment';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
    templateUrl: './treedemo.component.html'
})
export class TreeDemoComponent implements OnInit {

    files1: TreeNode[] = [];

    files2: TreeNode[] = [];

    files3: TreeNode[] = [];

    selectedFiles1: TreeNode[] = [];

    selectedFiles2: TreeNode[] = [];

    selectedFiles3: TreeNode = {};

    cols: any[] = [];
    cashout: Cashout=new Cashout(0,"","",0,0,true,"","","","","");
    cashouts:Cashout[]=[];
    commercant: Commercant= new Commercant(0,"","","","","","","","","",0,0,0,0,0,0,false,"","");
    commission:any ;
    pay:any;
    dataUser : any ;
    role: any;
    revenu:any;
    cashoutValid:boolean=false;
    facture: Facture= new Facture(0,"",0,0,0,"","","","","","","");
    id:any;
    Dialog: boolean = false;
    tenanId:any;
    Com:any;


    constructor(private nodeService: NodeService,private statistiqueService: StatistiqueService,public layoutService: LayoutService) {}

    ngOnInit() {
        this.dataUser = this.layoutService.getDataFromToken();
        this.role = this.dataUser.role;
        this.getCashouts();
        this.getCommercant();
        this.nodeService.getFiles().then(files => this.files1 = files);
        this.nodeService.getFilesystem().then(files => this.files2 = files);
        this.nodeService.getFiles().then(files => {
            this.files3 = [{
                label: 'Root',
                children: files
            }];
        });

        this.cols = [
            { field: 'name', header: 'Name' },
            { field: 'size', header: 'Size' },
            { field: 'type', header: 'Type' }
        ];
    }
    open(cashout : Cashout){
        this.cashout = { ...cashout };
        this.Dialog=true;
        this.id=cashout.id;

    }
    getFacture(Id : number , tenantId:string){
      this.statistiqueService.getFactureCommeracnt(Id).subscribe(
        data=> {
          this.facture=data;
          console.log("facture",this.facture);
          
          this.Dialog=false;
          this.statistiqueService.getCommercant(tenantId).subscribe(
            data=> {
              this.commercant=data;
              console.log("Commercant",this.commercant)
              this.openPDF(Id);
            }
          )
        }
      )
      
    }
      getCommercant(){
        this.statistiqueService.getCommercant("4a818ae7-b70d-4227-b3f9-1d06dc3a1359").subscribe(
          data=> {
            this.commercant=data;
            console.log("Commercant",this.commercant)
          }
        )
      }
      getCashouts(){
        this.statistiqueService.getCashoutsOfCommercants(this.dataUser.tenant_id).subscribe(
          data=> {
            this.cashouts=data;
            console.log("object",this.cashouts)
          }
        )
      }
      validerCashout(id:number){
        this.statistiqueService.validerCashout(id,this.cashout).subscribe(
            data=> {
              this.cashout=data;
              this.tenanId=this.cashout.tenantId;
              console.log("3",this.tenanId)
              console.log("object2",this.cashout);
              location.reload();

            }
          )
      }
      public openPDF(Id : number): void {
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
            ['doc N° :', this.facture.reference],
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
            1: {cellWidth: 150, textColor: 0}
          },
          head: [[{content: 'Commerçant', colSpan: 4, styles: {halign: 'center'}}]],
          body: [
            ['Nom', this.commercant.firstname+' '+this.commercant.lastname],
            ['Email', this.commercant.email],
            ['Ville', this.commercant.adresse],
            ['Télephone', this.commercant.telephone]
          ],
          theme: 'striped',
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
            ['Total HT', this.facture.ht],
          ],
          theme: 'grid',
        });
        
        doc.setFontSize(15);
        const testText3 = 'ARRÊTER LA PRÉSENTE FACTURE À LA SOMME :\n' +
          this.facture.totalLettre;
          doc.text(testText3, 60, (doc as any).lastAutoTable.finalY + 40, {align: 'left'});
          doc.setFontSize(15);
          const testText5 = 'Signature et cachet  ';
          doc.text(testText5, 60, (doc as any).lastAutoTable.finalY + 120, {align: 'left'});
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
        doc.save('Cashout.pdf');
      } 
    }