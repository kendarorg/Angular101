import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AddressesDataService, AddressElement } from '../addresses-data.service';
import { Router } from "@angular/router"
import { NgForm } from "@angular/forms"

@Component({
  selector: 'app-single-address',
  templateUrl: './single-address.component.html',
  styleUrls: ['./single-address.component.less']
})
export class SingleAddressComponent implements OnInit {

	address: AddressElement;
  	addressId: number;
	constructor(private activatedRoute: ActivatedRoute,
			public dataService: AddressesDataService,
			private router: Router) { 
		
	}

	ngOnInit(): void {
		this.addressId = this.activatedRoute.snapshot.params.id;
		if(this.addressId==-1){
			this.address = {} as AddressElement;
			this.readonly = false;
		}else{
			this.address = {} as AddressElement;
			this.dataService.getById(this.addressId).subscribe((data: {}) => {
		      this.address = data as AddressElement;
		    });
		}
	}
	
	readonly = true;
  
	edit(){
		this.readonly=false;
	}

	cancel(path:string){
		this.readonly=true;
		if(this.addressId==-1){
			this.router.navigateByUrl(path);
		}else{
			this.dataService.getById(this.addressId).subscribe((data: {}) => {
		      this.address = data as AddressElement;
		    });
		}
	}

	save(userForm:NgForm, path:string){
		if(!userForm.form.valid){
			return;
		}
		
		this.dataService.save(this.address).subscribe((data: {}) => {
			this.readonly=true;
			if(this.addressId==-1){
				this.router.navigateByUrl(path);
			}
		});
	}

}
