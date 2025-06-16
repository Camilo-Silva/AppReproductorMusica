import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

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
    if (this.formLogin.valid) {
      const values = this.formLogin.value;
      console.log('Valores del formulario:', values);
      // Aquí se agrega la lógica para enviar los datos al backend o servicio de autenticación
    } else {
      this.errorSession = true;
      console.warn('Formulario inválido');
    }
  }

}
