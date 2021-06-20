import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CelebDetailComponent } from './celeb-detail/celeb-detail.component';
import { PopularPeopleComponent } from './popular-people/popular-people.component';

const routes: Routes = [
  {path: 'popular', component: PopularPeopleComponent},
  {path: ':id', component: CelebDetailComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PeopleRoutingModule { }
