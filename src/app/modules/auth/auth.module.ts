import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    LoginPageComponent,
    ReactiveFormsModule// Formularios reactivos de angular
  ]
})
export class AuthModule { }
