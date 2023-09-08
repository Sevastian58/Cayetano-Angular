import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CitaComponent } from './pages/cita/cita.component';
import {SearchCitaComponent} from "./pages/search-cita/search-cita.component";

const routes: Routes = [
  {
    path: 'cita',
    children: [
      { path: 'cita', component: CitaComponent },
      {path:'search', component: SearchCitaComponent },
      // Otras rutas si es necesario
      { path: '', redirectTo: 'cita', pathMatch: 'full' }, // Ruta por defecto
      { path: '**', redirectTo: 'cita' } // Ruta genérica
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CitaRoutingModule { }
