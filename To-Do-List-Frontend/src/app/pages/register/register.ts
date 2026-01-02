import { Component } from '@angular/core';
import { Icon } from '../../Components/icon/icon';
import { Userinterface } from '../../interfaces/userinterface';
import { Form, FormsModule, NgForm } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ChangeDetectorRef } from '@angular/core';
import { Message, MessageModule } from 'primeng/message';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [Icon, FormsModule, RouterLink, RouterModule, MessageModule, CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private ApiUrl = 'http://localhost:5195/register';
  LoginMensagemErro = false

  constructor(private http : HttpClient, private cdr : ChangeDetectorRef, private router : Router){}

  User : Userinterface = {name: '', email: '', password: ''}

  register(form : NgForm)
  {
    if (form.valid)
{

        this.http.post(this.ApiUrl, this.User).subscribe(
      {
        next: (res) => 
        {
          this.router.navigate(['/login'])
          this.LoginMensagemErro = false;
          this.cdr.detectChanges()
        },
        error: (err) => 
        {
          this.LoginMensagemErro = true;
          this.cdr.detectChanges()
        }
      }
    )
        
 }
     

  }

  
}
