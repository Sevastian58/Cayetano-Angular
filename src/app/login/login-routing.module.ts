import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

const routes: Routes = [{
  path: '',
  children: [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent},
    // Otras rutas si es necesario
    { path: '', redirectTo: 'login', pathMatch: 'full' }, // Ruta por defecto
    { path: '**', redirectTo: 'login' } // Ruta genérica
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
