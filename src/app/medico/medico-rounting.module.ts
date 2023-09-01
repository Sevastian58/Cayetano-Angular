import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MedicoComponent } from './pages/medico/medico.component';

const routes: Routes = [{
  path: 'medico',
  children: [
    { path: 'medico', component: MedicoComponent },
    // Otras rutas si es necesario
    { path: '', redirectTo: 'medico', pathMatch: 'full' }, // Ruta por defecto
    { path: '**', redirectTo: 'medico' } // Ruta genérica
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MedicoRountingModule { }
