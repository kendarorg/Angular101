import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { AddressesDataService, AddressElement, AddressResult } from '../addresses-data.service';
import { AddressesDs } from '../address-ds.service';

import { MatPaginator,PageEvent } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.less']
})

export class AddressesComponent implements OnInit  {
	addresses: Array<AddressElement>;
	displayedColumns: string[] = ['name', 'address', 'email','view'];

	@ViewChild(MatPaginator, { static: false }) 
	paginator: MatPaginator;


	dataSource = new MatTableDataSource();
	length: number;
	pageIndex: number =0;
	pageSize: number=3;
	pageSizeOptions = [1, 5, 10, 50];
	pageEvent: PageEvent;

	constructor(public dataService: AddressesDataService) {}

	ngOnInit(): void {
		this.getAddresses(null);
	}
	getAddresses(event?:PageEvent){
		if(event==null){
			event ={pageIndex:0,pageSize:this.pageSize} as PageEvent;
		}
		
		this.dataService.findAddresses(-1,'','asc',event.pageIndex,event.pageSize).subscribe(
				addresses =>{
			      
			        var a = addresses as AddressResult;
					this.addresses=a.body as Array<AddressElement>;
					this.dataSource.data = this.addresses;
					this.length=a.totalCount;
					this.pageIndex = a.pageIndex;
			    },
				error => {
					console.log("error retrieving addresses");
				}
			);
		return event;
	}
}
