import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { User } from 'src/app/models/user';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `]
})
export class LoginComponent implements OnInit {

    valCheck: string[] = ['remember'];

    password!: string;
    token: any;

    constructor(public layoutService: LayoutService,private builder: FormBuilder,private router: Router) { }
    ngOnInit(): void {
        throw new Error('Method not implemented.');
    }
    user: User={};
    userdata: any
   
    proceedlogin(){
  
        this.layoutService.login((this.user))
        .subscribe(
          res=>{
             this.token = res;
             console.log(this.token.token)
      
             localStorage.setItem('token',this.token.token);  
             sessionStorage.setItem('username',this.token.token);  
             sessionStorage.setItem('role',this.token.token); 
             this.router.navigate(['/dashboard']); 
             console.log(res); 
          },
          err=>{
            console.log(err);
            this.router.navigate(['/auth/access']); 

           
          }) 
          }
}
