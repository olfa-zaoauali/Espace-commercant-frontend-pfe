import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmptyDemoRoutingModule } from './emptydemo-routing.module';
import { EmptyDemoComponent } from './emptydemo.component';
import { ToolbarModule } from 'primeng/toolbar';
import { TabViewModule } from 'primeng/tabview';
import { FieldsetModule } from 'primeng/fieldset';
import { ToggleButtonModule } from 'primeng/togglebutton';

import { CalendarModule } from "primeng/calendar";

@NgModule({
    imports: [
        CommonModule,
        EmptyDemoRoutingModule,
        ToolbarModule,
        TabViewModule,
        FieldsetModule,
        ToggleButtonModule,
        CalendarModule,
        
    ],
    declarations: [EmptyDemoComponent]
})
export class EmptyDemoModule { }
