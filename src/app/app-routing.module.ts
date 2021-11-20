import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CanActivateRoute} from './core/route.guard';
import {WraperComponent} from "./mainpage/wraper/components/wraper.component";
import {LoginComponent} from "./login/login.component";
import {BlogComponent} from "./mainpage/main/components/blog/blog.component";
import {CocktailsComponent} from "./mainpage/main/components/cocktails/cocktails.component";
import {EventsComponent} from "./mainpage/main/components/events/events.component";
import {FriendsComponent} from "./mainpage/main/components/friends/friends.component";
import {SettingsComponent} from "./mainpage/main/components/settings/settings.component";
import {AccountComponent} from "./mainpage/main/components/account/account.component";
import { IngredientComponent } from './mainpage/main/components/ingredients/ingredient.component';
import {ModeratorsComponent} from "./mainpage/main/components/moderators/moderators.component";
import {Roles} from "./core/models/roles";
import {user} from "./core/models/user";
import {AddModeratorComponent} from "./mainpage/main/components/moderators/add-moderator/add-moderator.component";
import {ModeratorsMainComponent} from "./mainpage/main/components/moderators/moderators-main/moderators-main.component";
import { IngredientMainComponent } from './mainpage/main/components/ingredients/ingredient-main/ingredient-main.component';
import { AddIngredientComponent } from './mainpage/main/components/ingredients/add-ingredient/add-ingredient.component';


const BASE_URL = getBaseUrl()

const routes: Routes = [
  {
    path: '',
    component: WraperComponent,
    children: [
      { path: '', redirectTo: BASE_URL, pathMatch: 'full' },
      { path: 'blog', component: BlogComponent, canActivate: [CanActivateRoute] },
      { path: 'cocktails', component: CocktailsComponent, canActivate: [CanActivateRoute] },
      { path: 'events', component: EventsComponent, canActivate: [CanActivateRoute] },
      { path: 'friends', component: FriendsComponent, canActivate: [CanActivateRoute] },
      { path: 'settings', component: SettingsComponent, canActivate: [CanActivateRoute] },
      { path: 'account', component: AccountComponent, canActivate: [CanActivateRoute] },
      { path: 'login', component: LoginComponent, canActivate: [CanActivateRoute] },

      { path: 'moderators', component: ModeratorsComponent, children: [
          { path: '', component: ModeratorsMainComponent, canActivate: [CanActivateRoute] },
          { path: 'add', component: AddModeratorComponent, canActivate: [CanActivateRoute] }
        ]
      },

      { path: 'ingredients', component: IngredientComponent, children: [
          { path: '', component: IngredientMainComponent, canActivate: [CanActivateRoute] },
          { path: 'add', component: AddIngredientComponent, canActivate: [CanActivateRoute] }
        ]
      },
    ]
  },
  // { path: 'login', component: LoginComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

function getBaseUrl() {
  switch (user.role) {
    case Roles.Admin:
    case Roles.Moderator:
      return 'account'
    case Roles.User:
      return 'blog'
    case Roles.Anonymous:
      return 'cocktails'

  }
}
