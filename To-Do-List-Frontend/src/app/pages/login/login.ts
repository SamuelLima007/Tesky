import { Component } from '@angular/core';
import { Icon } from '../../Components/icon/icon';
import { Userinterface } from '../../interfaces/userinterface';
import { FormsModule } from "@angular/forms";
import { RouterLink,  RouterModule } from '@angular/router';


@Component({
  selector: 'app-login',
  imports: [Icon, FormsModule, RouterLink, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  User : Userinterface  = {email : '', password : ''}
  
 onSubmit()
 {

 }
  
 
   

}
