import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { TituloComponent } from './components/titulo/titulo.component';



@NgModule({
  declarations: [
    NavBarComponent,
    TituloComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    NavBarComponent,
    TituloComponent
  ]
})
export class SharedModule { }
