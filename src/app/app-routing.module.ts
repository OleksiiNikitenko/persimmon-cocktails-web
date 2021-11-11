import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CanActivateRoute} from './core/route.guard';
import {WraperComponent} from "./mainpage/wraper/components/wraper.component";
import {LoginComponent} from "./login/login.component";
import {BlogComponent} from "./mainpage/main/components/blog/blog.component";
import {CocktailsComponent} from "./mainpage/main/components/cocktails/cocktails.component";
import {EventsComponent} from "./mainpage/main/components/events/events.component";
import {FriendsComponent} from "./mainpage/main/components/friends/friends.component";
import {IngredientsComponent} from "./mainpage/main/components/ingredients/ingredients.component";
import {SettingsComponent} from "./mainpage/main/components/settings/settings.component";
import {AccountComponent} from "./mainpage/main/components/account/account.component";
import {ModeratorsComponent} from "./mainpage/main/components/moderators/moderators.component";
import {Roles} from "./core/models/roles";
import {user} from "./core/models/user";

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
      { path: 'ingredients', component: IngredientsComponent, canActivate: [CanActivateRoute] },
      { path: 'settings', component: SettingsComponent, canActivate: [CanActivateRoute] },
      { path: 'account', component: AccountComponent, canActivate: [CanActivateRoute] },
      { path: 'moderators', component: ModeratorsComponent, canActivate: [CanActivateRoute] }

    ]
  },
  { path: 'login', component: LoginComponent }
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
    case Roles.Anonimus:
      return 'cocktails'

  }
}
