import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PeopleRoutingModule } from './people-routing.module';
import { PopularPeopleComponent } from './popular-people/popular-people.component';
import { CelebDetailComponent } from './celeb-detail/celeb-detail.component';
import { MaterialStuffModule } from '../material-stuff.module';
import { AppLoaderDirective } from '../directives/app-loader.directive';
import { ReactiveFormsModule } from '@angular/forms';
import { ImageLoaderDirective } from '../directives/image-loader.directive';
import { SharedModule } from '../shared.module';


@NgModule({
  declarations: [
    PopularPeopleComponent,
    CelebDetailComponent,
  ],
  imports: [
    CommonModule,
    PeopleRoutingModule,
    MaterialStuffModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class PeopleModule { }
