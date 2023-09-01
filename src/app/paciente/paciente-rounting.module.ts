import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PacienteComponent } from './pages/paciente/paciente.component';

const routes: Routes = [{
  path: 'paciente',
  children: [
    { path: 'paciente', component: PacienteComponent },
    // Otras rutas si es necesario
    { path: '', redirectTo: 'paciente', pathMatch: 'full' }, // Ruta por defecto
    { path: '**', redirectTo: 'paciente' } // Ruta genérica
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PacienteRountingModule { }
