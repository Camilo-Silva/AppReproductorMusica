import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@modules/auth/services/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent implements OnInit {
  formLogin: FormGroup = new FormGroup({
    
  });
  errorSession: boolean = false;

  constructor(private authService: AuthService, private cookieService: CookieService, private router: Router) { }

  ngOnInit(): void {
    this.formLogin = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(20)
      ])
    });
  }

  sendLogin(): void {
    const { email, password } = this.formLogin.value;

    this.authService.sendCredentials(email, password).subscribe({
      next: (response) => {
        console.log('sesion iniciada correctamente');
        const { tokenSession, data } = response;
        this.cookieService.set('token', tokenSession, 4, '/');

      },
      error: (error) => {
        console.error('Ocurrio un error con tu email o contraseña');
        this.errorSession = true;
      },
      complete: () => {
        // Opcional: lógica al completar la suscripción
        this.router.navigate(['/', 'tracks']);
      }
    });
  }

}
