import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { SandboxPageComponent } from './sandbox-page/sandbox-page.component';


const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'sandbox', component: SandboxPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
