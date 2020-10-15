import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [ 
  { path: '', component: WelcomeComponent },
  { path: ':categoryType', component: WelcomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation:"reload"
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
