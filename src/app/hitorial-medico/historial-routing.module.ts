import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistorialComponent } from './pages/historial/historial.component';

const routes: Routes = [
  {
    path: 'historial',
    children: [
      { path: 'historial', component: HistorialComponent },
      // Otras rutas si es necesario
      { path: '', redirectTo: 'historial', pathMatch: 'full' }, // Ruta por defecto
      { path: '**', redirectTo: 'historial' } // Ruta genérica
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HistorialRoutingModule { }
