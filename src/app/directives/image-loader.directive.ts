import { AfterViewInit, ComponentFactoryResolver, Directive, ElementRef, Host, HostListener, Input, OnChanges, OnInit, Renderer2, SimpleChanges, ViewContainerRef } from '@angular/core';
import { MatSpinner } from '@angular/material/progress-spinner';

@Directive({
  selector: '[appImageLoader]'
})
export class ImageLoaderDirective implements OnInit {

  loading = false;

  @HostListener('load', ['$event.target']) onLoad(event:any){
    const img = event as HTMLImageElement;

    img.decode().then((e)=>{
      this.renderer.setStyle(this.spinner._elementRef.nativeElement, 'display', 'none');
    }).catch(()=>{
      this.renderer.setStyle(this.spinner._elementRef.nativeElement, 'display', 'none');
    })
  }

  spinner!:MatSpinner;

  constructor(private el:ElementRef, private renderer:Renderer2, private viewContainerRef: ViewContainerRef, private componentFactory: ComponentFactoryResolver) { }

  ngOnInit(): void {

    const factory = this.componentFactory.resolveComponentFactory(MatSpinner);
    const viewer = this.viewContainerRef.createComponent(factory);
    this.spinner = viewer.instance;

    this.spinner.diameter = 24;
    this.spinner.strokeWidth = 3;

    this.renderer.addClass(this.spinner._elementRef.nativeElement, 'm-auto');
    this.renderer.addClass(this.spinner._elementRef.nativeElement, 'mt-5');
    this.renderer.addClass(this.spinner._elementRef.nativeElement, 'mb-5');

  }

}
