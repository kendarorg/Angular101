import { Component, OnInit } from '@angular/core';
import { AddressesDataService, AddressElement } from '../addresses-data.service';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.less']
})
export class AddressesComponent implements OnInit {
  addresses: Array<AddressElement>;
  selectedAddress: AddressElement;
  displayedColumns: string[] = ['name', 'address', 'email'];

  constructor(public dataService: AddressesDataService) { }

  ngOnInit(): void {
  	this.addresses = this.dataService.getAddresses(); 
  }

  public selectAddress(address){
    this.selectedAddress = address;
  }
}
