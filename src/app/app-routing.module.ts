import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {WraperComponent} from "./mainpage/wraper/components/wraper.component";

const routes: Routes = [
  { path: '', component: WraperComponent},
  // { path: '/login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
