import { Component, OnInit } from '@angular/core';
import { AddressesDataService, AddressElement } from '../addresses-data.service';
import { AddressesDs } from '../address-ds.service';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.less']
})
export class AddressesComponent implements OnInit {
  addresses: Array<AddressElement>;
  displayedColumns: string[] = ['name', 'address', 'email','view'];
  
  dataSource: AddressesDs;
  constructor(public dataService: AddressesDataService) {}

  ngOnInit(): void {
  	this.dataSource = new AddressesDs(this.dataService);
    this.dataSource.loadAddresses(-1);
  }
}
