import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TreeDemoComponent } from './treedemo.component';
import { TreeDemoRoutingModule } from './treedemo-routing.module';
import { TreeModule } from 'primeng/tree';
import { TreeTableModule } from 'primeng/treetable';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';


@NgModule({
	imports: [
		CommonModule,
		TreeDemoRoutingModule,
		FormsModule,
		TreeModule,
		TreeTableModule,
		DialogModule,
		TableModule,
		ButtonModule

	],
	declarations: [TreeDemoComponent],
})
export class TreeDemoModule { }
