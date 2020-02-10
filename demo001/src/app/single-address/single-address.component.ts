import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AddressesDataService, AddressElement } from '../addresses-data.service';

@Component({
  selector: 'app-single-address',
  templateUrl: './single-address.component.html',
  styleUrls: ['./single-address.component.less']
})
export class SingleAddressComponent implements OnInit {

	status = 'showing';
	address: AddressElement;
  	addressId: number;
	constructor(private activatedRoute: ActivatedRoute,
			public dataService: AddressesDataService) { 
		this.addressId = this.activatedRoute.snapshot.params.id;
		this.address = this.dataService.getById(this.addressId);
	}

  ngOnInit(): void {
  }
  
  edit(){
  	this.status='editing';
  }

  
  cancelEdit(){
  	this.status='showing';
  }

}
