import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from "@angular/material/button";
import {FormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";

import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './mainpage/header/components/header.component';
import { MainSideComponent } from './mainpage/main/components/main-side.component';
import { ToolbarComponent } from './mainpage/toolbar/components/toolbar.component';
import { WraperComponent } from './mainpage/wraper/components/wraper.component';
import { BlogComponent } from './mainpage/main/components/blog/blog.component';
import { CocktailsComponent } from './mainpage/main/components/cocktails/cocktails.component';
import { EventsComponent } from './mainpage/main/components/events/events.component';
import { FriendsComponent } from './mainpage/main/components/friends/friends.component';
import { SettingsComponent } from './mainpage/main/components/settings/settings.component';
// import { IngredientsComponent } from './mainpage/main/components/ingredients/ingredients.component';
import { ModeratorsComponent } from './mainpage/main/components/moderators/moderators.component';
import { AccountComponent } from './mainpage/main/components/account/account.component';
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    MainSideComponent,
    ToolbarComponent,
    WraperComponent,
    BlogComponent,
    CocktailsComponent,
    EventsComponent,
    FriendsComponent,
    SettingsComponent,
    // IngredientsComponent,
    ModeratorsComponent,
    AccountComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatTabsModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatIconModule,
    MatTableModule,
    MatSortModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
