import { Component, OnInit, ViewChild } from '@angular/core';
import { AddressesDataService, AddressElement } from '../addresses-data.service';
import { AddressesDs } from '../address-ds.service';

import { MatPaginator } from '@angular/material/paginator';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.less']
})

export class AddressesComponent implements OnInit {
  addresses: Array<AddressElement>;
  displayedColumns: string[] = ['name', 'address', 'email','view'];
  @ViewChild(MatPaginator, { static: false }) 
  paginator: MatPaginator;
  @ViewChild(MatTable, { static: false }) 
  table:MatTable
  
  dataSource: AddressesDs;
  constructor(public dataService: AddressesDataService) {}

  ngOnInit(): void {
  	this.dataSource = new AddressesDs(this.dataService);
    this.dataSource.loadAddresses(-1);
    setTimeout(()=>this.table.paginator=this.paginator,1000);
  }
}
