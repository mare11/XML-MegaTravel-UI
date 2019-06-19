import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VerifyUserComponent } from './components/verify-user/verify-user.component';

const routes: Routes = [
  { path: 'registration/verify', component: VerifyUserComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
