import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material'
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UsersComponent } from './components/users/users.component';
import { AgentsComponent } from './components/agents/agents.component';
import { AccommodationComponent } from './components/accommodation/accommodation.component';
import { SnackBar } from './utils';
import { AddAgentDialogComponent } from './components/add-agent-dialog/add-agent-dialog.component';
import { AddAdminDialogComponent } from './components/add-admin-dialog/add-admin-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomepageComponent,
    UsersComponent,
    AgentsComponent,
    AccommodationComponent,
    AddAgentDialogComponent,
    AddAdminDialogComponent
  ],
  entryComponents: [
    AddAgentDialogComponent,
    AddAdminDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    SnackBar
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
