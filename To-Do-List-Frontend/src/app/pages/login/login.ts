import { Component } from '@angular/core';
import { Icon } from '../../Components/icon/icon';
import { Userinterface } from '../../interfaces/userinterface';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { Authservice } from '../../services/Auth/authservice';

@Component({
  selector: 'app-login',
  imports: [Icon, FormsModule, RouterLink, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  User: Userinterface = { email: '', password: '' };

  constructor(private _authservice: Authservice, private router: Router) {}

  onSubmit() {}

  login() {
    this._authservice.Login(this.User.email, this.User.password).subscribe({
      next: (res) => {
        this._authservice.Savetoken(res.token);
        this.router.navigate(['/main']);
      },
      error: () => '',
    });
  }
}
