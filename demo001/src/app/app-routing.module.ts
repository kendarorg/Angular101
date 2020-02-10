import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddressesComponent } from './addresses/addresses.component';
import { SingleAddressComponent } from './single-address/single-address.component'; 


const routes: Routes = [
	{path: "", component: AddressesComponent}, 
	{path: "address", component: AddressesComponent}, 
	{path: "address/:id", component: SingleAddressComponent}, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
