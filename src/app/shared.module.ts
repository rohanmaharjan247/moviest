import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageLoaderDirective } from './directives/image-loader.directive';
import { AppLoaderDirective } from './directives/app-loader.directive';


import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppLoaderDirective,
    ImageLoaderDirective,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports:[

    AppLoaderDirective,
    ImageLoaderDirective,
    FontAwesomeModule
  ]
})
export class SharedModule { }
