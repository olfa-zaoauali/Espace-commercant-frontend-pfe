import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorRoutingModule } from './error-routing.module';
import { ErrorComponent } from './error.component';
import { ButtonModule } from 'primeng/button';
import {PasswordModule} from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { FileUploadModule } from 'primeng/fileupload';
import { AutoCompleteModule } from "primeng/autocomplete";
import { MultiSelectModule } from "primeng/multiselect";





@NgModule({
    imports: [
        CommonModule,
        ErrorRoutingModule,
        ButtonModule,
        PasswordModule,
        CheckboxModule,
        FormsModule,
        InputTextModule,
        FileUploadModule,
        AutoCompleteModule,
        MultiSelectModule


    ],
    declarations: [ErrorComponent]
})
export class ErrorModule { }
