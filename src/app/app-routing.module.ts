import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CanActivateRoute} from './core/route.guard';
import {WraperComponent} from "./modules/wraper/components/wraper.component";
import {LoginComponent} from "./modules/login/components/login.component";
import {BlogComponent} from "./modules/blog/components/blog.component";
import {CocktailsComponent} from "./modules/cocktails/components/cocktails.component";
import {EventsComponent} from "./modules/events/components/events.component";
import {FriendsComponent} from "./modules/friends/components/friends.component";
import {SettingsComponent} from "./modules/settings/components/settings.component";
import {AccountComponent} from "./modules/account/components/account.component";
import {IngredientComponent} from './modules/ingredients/components/ingredient.component';
import {KitchenwareComponent} from './modules/kitchenware/components/kitchenware.component';
import {ModeratorsComponent} from "./modules/moderators/components/moderators.component";
import {Roles} from "./core/models/roles";
import {getUser} from "./core/models/user";
import {AddModeratorComponent} from "./modules/moderators/components/add-moderator/add-moderator.component";
import {ModeratorsMainComponent} from "./modules/moderators/components/moderators-main/moderators-main.component";
import {IngredientMainComponent} from './modules/ingredients/components/ingredient-main/ingredient-main.component';
import {AddIngredientComponent} from './modules/ingredients/components/add-ingredient/add-ingredient.component';
//import {EditIngredientComponent} from './modules/ingredients/components/edit-ingredient/edit-ingredient.component';
import {KitchenwareMainComponent} from './modules/kitchenware/components/kitchenware-main/kitchenware-main.component';
import {AddKitchenwareComponent} from './modules/kitchenware/components/add-kitchenware/add-kitchenware.component';
//import {EditKitchenwareComponent} from './modules/kitchenware/components/edit-kitchenware/edit-kitchenware.component';
import {CocktailComponent} from "./modules/cocktail/components/cocktail.component";
import {RecoverPasswordReceiveComponent} from "./modules/recover-password-receive/components/recover-password-receive.component";
//import {EditKitchenwareComponent} from './modules/kitchenware/components/edit-kitchenware/edit-kitchenware.component';
import {StockComponent} from "./modules/stock/components/stock.component";
import {StockMainComponent} from "./modules/stock/components/stock-main/stock-main.component";
import {EditStockIngredientComponent} from "./modules/stock/components/edit-stock-ingredient/edit-stock-ingredient.component";

const BASE_URL = getBaseUrl()

const routes: Routes = [
  {
    path: '',
    component: WraperComponent,
    children: [
      { path: '', redirectTo: BASE_URL, pathMatch: 'full' },
      { path: 'blog', component: BlogComponent, canActivate: [CanActivateRoute] },
      { path: 'cocktails', children: [
          {path: ':id', component: CocktailComponent},
          {path: '', component: CocktailsComponent, canActivate: [CanActivateRoute]},
        ]
      },
      { path: 'events', component: EventsComponent, canActivate: [CanActivateRoute] },
      { path: 'friends', component: FriendsComponent, canActivate: [CanActivateRoute] },
      { path: 'settings', component: SettingsComponent, canActivate: [CanActivateRoute] },
      { path: 'account', component: AccountComponent, canActivate: [CanActivateRoute] },
      { path: 'login', component: LoginComponent, canActivate: [CanActivateRoute] },
      {path: 'recover-password/:id/:nn', component: RecoverPasswordReceiveComponent},
      {path: 'moderator/create-password/:id/:nn', component: RecoverPasswordReceiveComponent, data: {isModerator: true}},

      { path: 'moderators', component: ModeratorsComponent, children: [
          { path: '', component: ModeratorsMainComponent, canActivate: [CanActivateRoute] },
          { path: 'add', component: AddModeratorComponent, canActivate: [CanActivateRoute] },
          { path: 'edit/:id', component: AddModeratorComponent, canActivate: [CanActivateRoute] }
        ]
      },

      { path: 'ingredients', component: IngredientComponent, children: [
          { path: '', component: IngredientMainComponent, canActivate: [CanActivateRoute] },
          { path: 'add', component: AddIngredientComponent, canActivate: [CanActivateRoute] },
          { path: 'edit/:id', component: AddIngredientComponent, canActivate: [CanActivateRoute] }
        ]
      },

      { path: 'kitchenware', component: KitchenwareComponent, children: [
          { path: '', component: KitchenwareMainComponent, canActivate: [CanActivateRoute] },
          { path: 'add', component: AddKitchenwareComponent, canActivate: [CanActivateRoute] },
          { path: 'edit/:id', component: AddKitchenwareComponent, canActivate: [CanActivateRoute] }
        ]
      },

      { path: 'stock', component: StockComponent, children: [
          {path: '', component: StockMainComponent, canActivate: [CanActivateRoute]},
          {path: 'edit/:ingredientId', component: EditStockIngredientComponent, canActivate: [CanActivateRoute]}
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
  switch (getUser().role) {
    case Roles.Admin:
    case Roles.Moderator:
      return 'account'
    case Roles.User:
      return 'account'
    case Roles.Anonymous:
      return 'cocktails'

  }
}
