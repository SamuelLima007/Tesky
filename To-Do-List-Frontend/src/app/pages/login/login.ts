import { Component } from '@angular/core';
import { Icon } from '../../Components/icon/icon';
import { Userinterface } from '../../interfaces/userinterface';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { Authservice } from '../../services/Auth/authservice';
import { CommonModule } from '@angular/common';
import { MessageModule } from 'primeng/message';
import { ChangeDetectorRef } from '@angular/core';
import { Showmessage } from '../../services/Showmessage/showmessage';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  imports: [Icon, FormsModule, RouterLink, RouterModule, CommonModule, MessageModule, ToastModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  User: Userinterface = { email: '', password: '' };
  LoginMensagemErro = false

  constructor(private _authservice: Authservice, private router: Router, private cdr : ChangeDetectorRef, private _messageservice : Showmessage) {}

  

  login(form : NgForm) {
     
    if(form.valid)
    {
       this._authservice.Login(this.User.email, this.User.password).subscribe({
      next: (res) => {
        this._authservice.Savetoken(res.token);
       
        this.router.navigate(['/main']);
        
        this.LoginMensagemErro = false;
        this.cdr.detectChanges();
      },

      error: (err) => {if (form.valid) {

        this.LoginMensagemErro = true;
        this.cdr.detectChanges();

      }},

    });
    }

  }

  
}
