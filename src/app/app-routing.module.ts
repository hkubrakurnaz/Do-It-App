import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ThemeComponent } from './theme/theme.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { PageNotFoundComponentComponent } from './PageNotFoundComponent/PageNotFoundComponent.component';


const routes: Routes = [
  {path:'goal', component:ThemeComponent},
  {path:'confirm',component:ConfirmComponent},
  {path: '',   redirectTo: 'goal', pathMatch: 'full' },
  {path:'**',component:PageNotFoundComponentComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
