import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from "@angular/material/button";
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";

import { LoginComponent } from './login/login.component';

import { RecoverPasswordComponent } from './recover-password/recover-password.component';
import {HttpClientModule} from "@angular/common/http";
import {LoginService} from "./login/login.service";




import { HeaderComponent } from './mainpage/header/components/header.component';
import { MainSideComponent } from './mainpage/main/components/main-side.component';
import { ToolbarComponent } from './mainpage/toolbar/components/toolbar.component';
import { WraperComponent } from './mainpage/wraper/components/wraper.component';
import { BlogComponent } from './mainpage/main/components/blog/blog.component';
import { CocktailsComponent } from './mainpage/main/components/cocktails/cocktails.component';
import { EventsComponent } from './mainpage/main/components/events/events.component';
import { FriendsComponent } from './mainpage/main/components/friends/friends.component';
import { SettingsComponent } from './mainpage/main/components/settings/settings.component';
import { IngredientComponent } from './mainpage/main/components/ingredients/ingredient.component';
import {KitchenwareComponent } from './mainpage/main/components/kitchenware/kitchenware.component';
import { ModeratorsComponent } from './mainpage/main/components/moderators/moderators.component';
import { AccountComponent } from './mainpage/main/components/account/account.component';
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import { ModeratorsMainComponent } from './mainpage/main/components/moderators/moderators-main/moderators-main.component';
import { AddModeratorComponent } from './mainpage/main/components/moderators/add-moderator/add-moderator.component';
import { IngredientMainComponent } from './mainpage/main/components/ingredients/ingredient-main/ingredient-main.component';
import { AddIngredientComponent } from './mainpage/main/components/ingredients/add-ingredient/add-ingredient.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import {EditIngredientComponent} from "./mainpage/main/components/ingredients/edit-ingredient/edit-ingredient.component";
import {KitchenwareMainComponent} from './mainpage/main/components/kitchenware/kitchenware-main/kitchenware-main.component';
import {AddKitchenwareComponent} from './mainpage/main/components/kitchenware/add-kitchenware/add-kitchenware.component';
import {EditKitchenwareComponent} from './mainpage/main/components/kitchenware/edit-kitchenware/edit-kitchenware.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RecoverPasswordComponent,
    HeaderComponent,
    MainSideComponent,
    ToolbarComponent,
    WraperComponent,
    BlogComponent,
    CocktailsComponent,
    EventsComponent,
    FriendsComponent,
    SettingsComponent,
    IngredientComponent,
    KitchenwareComponent,
    ModeratorsComponent,
    AccountComponent,
    AddModeratorComponent,
    ModeratorsMainComponent,
    AddIngredientComponent,
    IngredientMainComponent,
    EditIngredientComponent,
    AddKitchenwareComponent,
    KitchenwareMainComponent,
    EditKitchenwareComponent
  ],
  imports: [
    HttpClientModule,
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
    MatSortModule,
    ReactiveFormsModule,
    MatPaginatorModule
  ],
  providers: [FormBuilder],

  bootstrap: [AppComponent]
})
export class AppModule { }
