import { PasswordManagerService } from './../password-manager.service';
import { Component } from '@angular/core';
import {Router} from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  isError: boolean = false;

  constructor(private passwordManagerService: PasswordManagerService, private router: Router){

  }

  async onSubmit(values: any){
    console.log(values)
    try{
        await this.passwordManagerService.login(values.email, values.password);
        console.log('login successful');
        this.router.navigate(['/site-list']);
      } catch (err) {
        this.isError = true;
      }

    
  }

 

}
