import { Routes } from '@angular/router';
import { sessionGuard } from '@core/guards/session.guard';
import { HomePageComponent } from '@modules/home/pages/home-page/home-page.component';

// Rutas principales de la aplicación
export const routes: Routes = [
  {
    path: 'auth', // (Público) Login, Registro, Olvidé mi contraseña, etc.
    loadChildren: () => import(`./modules/auth/auth.module`).then(m => m.AuthModule)
  },
  {
    path: '', // (Privado) Solo accesible si hay sesión iniciada
    component: HomePageComponent,
    loadChildren: () => import(`./modules/home/home.module`).then(m => m.HomeModule),
    canActivate: [sessionGuard] // Proteger esta ruta con el guard de sesión
  }
];
