import { Component, ElementRef, Inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {



  windowWidth: number=0;
  navBarWidth:number=200;
  navBarDisplay:string="block";
  constructor(private elRef: ElementRef, private router:Router) {
    this.windowWidth = window.innerWidth;

    window.addEventListener('resize', this.onResize.bind(this));
  }

  sidebarItems=[{label:'Paciente', icon:'personal_injury', url:'./paciente'},
                {label:'Medico', icon:'med', url:'./medico'},
                {label:'Topico', icon:'emergency', url:'./topico'},
                {label:'Cita', icon:'date', url:'./cita'},
                {label:'Historia Clinica', icon:'history', url:'./historial'}]


  ngOnInit(){
   // this.resizeNavBar();
  }
  onResize() {
    //this.windowWidth = window.innerWidth;

    //this.resizeNavBar();
  }

  /*resizeNavBar(){
    const navBarElement:HTMLElement=this.elRef.nativeElement.querySelector('#nav-Bar');
    if(navBarElement){
      console.log('hola')
      if(this.windowWidth<1500){
        this.navBarWidth=70;
        this.navBarDisplay="none";
      }else{
        this.navBarWidth=200;
        this.navBarDisplay="block"
      }
    }

  }*/

  onRedirectPaciente():void{
    this.router.navigate(['paciente/paciente'])
  }
}
