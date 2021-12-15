import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from "@angular/material/button";
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";
import {MatDialogModule} from "@angular/material/dialog";


import {LoginComponent} from './modules/login/components/login.component';

import {RecoverPasswordComponent} from './modules/recover-password/components/recover-password.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";


import {HeaderComponent} from './modules/header/components/header.component';
import {MainSideComponent} from './modules/main-side/components/main-side.component';
import {ToolbarComponent} from './modules/toolbar/components/toolbar.component';
import {WraperComponent} from './modules/wraper/components/wraper.component';
import {BlogComponent} from './modules/blog/components/blog.component';
import {CocktailsComponent} from './modules/cocktails/components/cocktails.component';
import {EventsComponent} from './modules/events/components/events.component';
import {FriendsComponent} from './modules/friends/components/friends.component';
import {SettingsComponent} from './modules/settings/components/settings.component';
import {IngredientComponent} from './modules/ingredients/components/ingredient.component';
import {KitchenwareComponent} from './modules/kitchenware/components/kitchenware.component';
import {ModeratorsComponent} from './modules/moderators/components/moderators.component';
import {AccountComponent} from './modules/account/components/account.component';
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {ModeratorsMainComponent} from './modules/moderators/components/moderators-main/moderators-main.component';
import {AddModeratorComponent} from './modules/moderators/components/add-moderator/add-moderator.component';
import {IngredientMainComponent} from './modules/ingredients/components/ingredient-main/ingredient-main.component';
import {AddIngredientComponent} from './modules/ingredients/components/add-ingredient/add-ingredient.component';
import {MatPaginatorModule} from '@angular/material/paginator';
//import {EditIngredientComponent} from "./modules/ingredients/components/edit-ingredient/edit-ingredient.component";
import {KitchenwareMainComponent} from './modules/kitchenware/components/kitchenware-main/kitchenware-main.component';
import {AddKitchenwareComponent} from './modules/kitchenware/components/add-kitchenware/add-kitchenware.component';
//import {EditKitchenwareComponent} from './modules/kitchenware/components/edit-kitchenware/edit-kitchenware.component';
import {Interceptor} from "./utils/interceptor";
import {MatRadioModule} from "@angular/material/radio";
import {LogoutComponent} from './modules/logout/logout.component';
import {CocktailComponent} from './modules/cocktail/components/cocktail.component';
import {MatSelectModule} from "@angular/material/select";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {ChangePasswordComponent} from './modules/change-password/componets/change-password.component';
import {RecoverPasswordReceiveComponent} from './modules/recover-password-receive/components/recover-password-receive.component';
import {ErrorDialog, ErrorsPopupComponent} from './modules/errors-popup/errors-popup.component';
import {MatExpansionModule} from "@angular/material/expansion";

import {UsersComponent} from './modules/users/components/users.component';
import {MatCheckboxModule} from "@angular/material/checkbox";


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
    //EditIngredientComponent,
    AddKitchenwareComponent,
    KitchenwareMainComponent,
    //EditKitchenwareComponent,
    LogoutComponent,
    ChangePasswordComponent,
    CocktailComponent,
    RecoverPasswordReceiveComponent,
    ErrorsPopupComponent,
    ErrorDialog,
    UsersComponent
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
    MatPaginatorModule,
    MatDialogModule,
    MatPaginatorModule,
    MatRadioModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatExpansionModule,
    MatCheckboxModule
  ],
  providers: [FormBuilder,
    RecoverPasswordComponent,
    ErrorsPopupComponent,
    ErrorDialog,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true
    }],

  bootstrap: [AppComponent]
})
export class AppModule {
}
