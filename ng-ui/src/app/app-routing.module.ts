import { CastReceiverComponent } from './pages/cast-receiver/cast-receiver.component';
import { CastComponent } from './pages/cast/cast.component';
import { GridMainComponent } from './grid/grid-main/grid-main.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "",
    redirectTo: "sharing",
    pathMatch: "full"
  },
  {
    path: "sharing",
    component: GridMainComponent
  },
  {
    path: "cast",
    component: CastComponent
  },
  {
    path: "cast-receiver",
    component: CastReceiverComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
