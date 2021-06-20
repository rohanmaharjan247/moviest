import {
  ComponentFactoryResolver,
  Directive,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  Renderer2,
  SimpleChanges,
  ViewContainerRef,
} from '@angular/core';
import { MatProgressBar } from '@angular/material/progress-bar';

@Directive({
  selector: '[appLoader]',
})
export class AppLoaderDirective implements OnInit, OnChanges {
  spinner!: MatProgressBar;

  @Input('appLoader') showSpinner!: boolean;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

  ngOnInit() {

    //Create spinner
    const factory =
      this.componentFactoryResolver.resolveComponentFactory(MatProgressBar);
    const componentRef = this.viewContainerRef.createComponent(factory);
    this.spinner = componentRef.instance;

    //configure spinner
    this.spinner.mode = 'indeterminate';

    //hide the spinner
    if (this.showSpinner)
      this.renderer.setStyle(
        this.spinner._elementRef.nativeElement,
        'display',
        'block'
      );
    else
      this.renderer.setStyle(
        this.spinner._elementRef.nativeElement,
        'display',
        'none'
      );
  }

  ngOnChanges(changes: SimpleChanges) {
    if (typeof changes.showSpinner === 'object' && this.spinner) {
      if (changes.showSpinner.currentValue === true) {
        this.renderer.appendChild(
          this.el.nativeElement,
          this.spinner._elementRef.nativeElement
        );

        this.renderer.setStyle(
          this.spinner._elementRef.nativeElement,
          'display',
          'block'
        );
      } else {
        this.renderer.setStyle(
          this.spinner._elementRef.nativeElement,
          'display',
          'none'
        );
      }
    }
  }
}
