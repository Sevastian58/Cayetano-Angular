import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginRoutingModule } from './login/login-routing.module';
import { PacienteRountingModule } from './paciente/paciente-rounting.module';
import { MedicoRountingModule } from './medico/medico-rounting.module';
import { HistorialRoutingModule } from './hitorial-medico/historial-routing.module';
import { CitaRoutingModule } from './cita/cita-routing.module';

const routes: Routes = [{
  path: 'login',
  loadChildren: () => import('./login/login.module').then(modulo => modulo.LoginModule)
},
{
  path: 'paciente',
  loadChildren: () => import('./paciente/paciente.module').then(modulo => modulo.PacienteModule)
},
{
  path: 'cita',
  loadChildren: () => import('./cita/cita.module').then(modulo => modulo.CitaModule)
},
{
  path: 'historial',
  loadChildren: () => import('./hitorial-medico/hitorial-medico.module').then(modulo => modulo.HitorialMedicoModule)
},
{
  path: 'medico',
  loadChildren: () => import('./medico/medico.module').then(modulo => modulo.MedicoModule)
},
{
  path: 'topico',
  loadChildren: () => import('./topico/topico.module').then(modulo => modulo.TopicoModule)
},
{
  path: '', // Ruta por defecto, cargar componente o página de inicio si es necesario
  pathMatch: 'full', // Asegura que solo coincida con la ruta vacía
  redirectTo: 'paciente' // Redirigir a 'byName' por defecto
},
{
  path: '**',
  redirectTo: 'paciente' // Redirigir rutas desconocidas a 'byName'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash:true}),
  CitaRoutingModule,
  HistorialRoutingModule,
  MedicoRountingModule,
  PacienteRountingModule,
  LoginRoutingModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
