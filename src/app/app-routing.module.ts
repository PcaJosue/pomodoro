import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AplicationComponent } from './component/app/app.component';
import { InfoComponent } from './component/info/info.component';

const routes: Routes = [
  { path: '', component: AplicationComponent },
  { path: 'info', component: InfoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
