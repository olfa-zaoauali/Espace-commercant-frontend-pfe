import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { ProductService } from './demo/service/product.service';
import { CountryService } from './demo/service/country.service';
import { CustomerService } from './demo/service/customer.service';
import { EventService } from './demo/service/event.service';
import { IconService } from './demo/service/icon.service';
import { NodeService } from './demo/service/node.service';
import { PhotoService } from './demo/service/photo.service';
import {AccordionModule} from 'primeng/accordion';     //accordion and accordion tab
import {AvatarModule} from 'primeng/avatar';
import { ChipModule } from 'primeng/chip';
import { FactureComponent } from './demo/components/facture/facture.component';
import { CommonModule } from '@angular/common';


@NgModule({
    declarations: [
        AppComponent, NotfoundComponent, FactureComponent
    ],
    imports: [
        AppRoutingModule,
        AppLayoutModule,
        AccordionModule ,
        AvatarModule ,
        ChipModule,
        CommonModule  
    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        CountryService, CustomerService, EventService, IconService, NodeService,
        PhotoService, ProductService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
