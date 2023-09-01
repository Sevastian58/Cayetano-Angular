import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { TituloComponent } from './components/titulo/titulo.component';
import { MaterialModule } from '../material/material.module';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  // Define tus rutas aquí
];

@NgModule({
  declarations: [
    NavBarComponent,
    TituloComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    [RouterModule.forRoot(routes)]
  ],
  exports:[
    NavBarComponent,
    TituloComponent,
    RouterModule
  ]
})
export class SharedModule { }
