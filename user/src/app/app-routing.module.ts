import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccommodationsComponent } from './components/accommodations/accommodations.component';
import { VerifyUserComponent } from './components/verify-user/verify-user.component';

const routes: Routes = [
  { path: 'accommodations', component: AccommodationsComponent},
  { path: 'registration/verify', component: VerifyUserComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const RoutingComponents = [AccommodationsComponent,
                                  VerifyUserComponent];
