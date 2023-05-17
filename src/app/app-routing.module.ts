import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './MyComponents/home-page/home-page.component';
import { LoginComponent } from './MyComponents/login/login.component';
import { SyncPageComponent } from './MyComponents/sync-page/sync-page.component';

const routes: Routes = [
{path:'',redirectTo:'/login',pathMatch:'full'},
{path:'Home',component:HomePageComponent},
{path:'login',component:LoginComponent},
{path:'sync',component:SyncPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
