import { Component, ElementRef, Inject } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {

  windowWidth: number=0;
  navBarWidth:number=200;
  navBarDisplay:string="block";
  constructor(private elRef: ElementRef) {
    this.windowWidth = window.innerWidth;

    window.addEventListener('resize', this.onResize.bind(this));
  }

  ngOnInit(){
    this.resizeNavBar();
  }
  onResize() {
    this.windowWidth = window.innerWidth;
    console.log(this.windowWidth)

    this.resizeNavBar();
  }

  resizeNavBar(){
    const navBarElement:HTMLElement=this.elRef.nativeElement.querySelector('#nav-Bar');
    console.log(navBarElement)
    if(navBarElement){
      console.log('hola')
      if(this.windowWidth<800){
        console.log('reajustar navbar')
        this.navBarWidth=70;
        this.navBarDisplay="none";
      }else{
        this.navBarWidth=200;
        this.navBarDisplay="block"
      }
    }

  }
}
