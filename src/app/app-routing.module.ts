import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {WraperComponent} from "./mainpage/wraper/components/wraper.component";
import {LoginComponent} from "./login/login.component";
import {BlogComponent} from "./mainpage/main/components/blog/blog.component";
import {CocktailsComponent} from "./mainpage/main/components/cocktails/cocktails.component";
import {EventsComponent} from "./mainpage/main/components/events/events.component";
import {FriendsComponent} from "./mainpage/main/components/friends/friends.component";
import {IngredientsComponent} from "./mainpage/main/components/ingredients/ingredients.component";
import {SettingsComponent} from "./mainpage/main/components/settings/settings.component";

const routes: Routes = [
  {
    path: '',
    component:
    WraperComponent,
    redirectTo: "/blog",
    children: [
      { path: '/blog', component: BlogComponent },
      { path: '/cocktails', component: CocktailsComponent },
      { path: '/events', component: EventsComponent },
      { path: '/friends', component: FriendsComponent },
      { path: '/ingredients', component: IngredientsComponent },
      { path: '/settings', component: SettingsComponent }
    ]
  },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
