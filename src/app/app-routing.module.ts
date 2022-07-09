import { ManageComponent } from './component/manage/manage.component';
import { RealLoginComponent } from './component/real-login/real-login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:"login",component:RealLoginComponent
  },
  {
    path:"manage",component:ManageComponent
  },
  {
    path:"",component:RealLoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
