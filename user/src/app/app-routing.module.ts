import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccommodationsComponent } from './components/accommodations/accommodations.component';

const routes: Routes = [
  { path: 'accommodations', component: AccommodationsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const RoutingComponents = [AccommodationsComponent];
