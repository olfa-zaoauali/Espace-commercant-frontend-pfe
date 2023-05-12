import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmptyDemoRoutingModule } from './emptydemo-routing.module';
import { EmptyDemoComponent } from './emptydemo.component';
import { ToolbarModule } from 'primeng/toolbar';

@NgModule({
    imports: [
        CommonModule,
        EmptyDemoRoutingModule,
        ToolbarModule
    ],
    declarations: [EmptyDemoComponent]
})
export class EmptyDemoModule { }
