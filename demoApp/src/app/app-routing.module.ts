import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddressesComponent } from './addresses/addresses.component';


const routes: Routes = [
	{path: "", component: AddressesComponent}, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
