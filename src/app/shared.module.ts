import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageLoaderDirective } from './directives/image-loader.directive';
import { AppLoaderDirective } from './directives/app-loader.directive';



@NgModule({
  declarations: [
    AppLoaderDirective,
    ImageLoaderDirective,
  ],
  imports: [
    CommonModule
  ],
  exports:[

    AppLoaderDirective,
    ImageLoaderDirective,
  ]
})
export class SharedModule { }
