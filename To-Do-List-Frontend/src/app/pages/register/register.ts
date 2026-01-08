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
import { Authservice } from '../../services/Auth/authservice';
import { MessageService } from 'primeng/api';
import { Showmessage } from '../../services/Showmessage/showmessage';

@Component({
  selector: 'app-register',
  imports: [Icon, FormsModule, RouterLink, RouterModule, MessageModule, CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private ApiUrl: string = 'http://localhost:5195/register';
  LoginMensagemErro: boolean = false;
  errorMessage: string = '';
  emailTested: string = '';

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private _authservice: Authservice,
    private _messageservice: Showmessage
  ) {}

  User: Userinterface = { name: '', email: '', password: '' };

  register(form: NgForm) {
    if (form.valid) {
      this.http.post(this.ApiUrl, this.User).subscribe({
        next: (res) => {
          this.router.navigate(['/login']);
          this.LoginMensagemErro = false;
          this._messageservice.showMessageRegister();
        },
        error: (err) => {
          this.emailTested = this.User.email;
          this.LoginMensagemErro = true;
          this.errorMessage = err.error;
          this.cdr.detectChanges();
        },
      });
    }
  }
}
