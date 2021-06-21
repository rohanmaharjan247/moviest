import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PeopleRoutingModule } from './people-routing.module';
import { PopularPeopleComponent } from './popular-people/popular-people.component';
import { CelebDetailComponent } from './celeb-detail/celeb-detail.component';
import { MaterialStuffModule } from '../material-stuff.module';
import { ReactiveFormsModule } from '@angular/forms';
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
