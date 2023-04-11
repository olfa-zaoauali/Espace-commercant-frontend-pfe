import { Component, ElementRef } from '@angular/core';
import { LayoutService } from "./service/app.layout.service";

@Component({
    selector: 'app-sidebar',
    templateUrl: './app.sidebar.component.html'
})
export class AppSidebarComponent {
    dataUser : any ;
  imageUrl: any;
  role: any;

  constructor(public layoutService: LayoutService, public el: ElementRef) { }
  ngOnInit(): void {
        this.dataUser = this.layoutService.getDataFromToken();
        this.role = this.dataUser.role;
        this.imageUrl=this.dataUser.image;
       
    }
    logOut(){
        this.layoutService.logOut();
      }
    

}

