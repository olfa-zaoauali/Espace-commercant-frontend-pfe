import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent implements OnInit {

    items!: MenuItem[];

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;
    
  dataUser : any ;
  imageUrl: any;
  role: any;

    constructor(public layoutService: LayoutService) { }
    ngOnInit(): void {
        this.dataUser = this.layoutService.getDataFromToken();
        this.role = this.dataUser.role;
        this.imageUrl=this.dataUser.image;
        console.log("user",this.dataUser);
        console.log("image",this.imageUrl);
        console.log("role",this.role);
    }
    logOut(){
        this.layoutService.logOut();
      }
    
}
