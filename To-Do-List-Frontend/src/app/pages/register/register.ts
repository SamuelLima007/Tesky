import { Component } from '@angular/core';
import { Icon } from '../../Components/icon/icon';
import { Userinterface } from '../../interfaces/userinterface';
import { FormsModule } from "@angular/forms";
import { RouterLink,  RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [Icon, FormsModule, RouterLink, RouterModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {


  onSubmit()
  {

  }

}
