/*import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AddressDsService {

  constructor() { }
}*/


import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import { AddressesDataService, AddressElement } from './addresses-data.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { of } from 'rxjs'; 
import { catchError, finalize } from 'rxjs/operators'; 

export class AddressesDs /*implements DataSource<AddressElement>*/ {

    /*private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();
    private addressSubject = new BehaviorSubject<AddressElement[]>([]);

    constructor(private addressesService: AddressesDataService) {}

    connect(collectionViewer: CollectionViewer): Observable<AddressElement[]> {
        return this.addressSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.addressSubject.complete();
        this.loadingSubject.complete();
    }
  
  	pageCount:number;
  	totalCount:number;
	loadAddresses(addressId: number, filter = '',
	            sortDirection = 'asc', pageIndex = 0, pageSize = 3) {
		
	    this.loadingSubject.next(true);

	    this.addressesService.findAddresses(addressId, filter, sortDirection,
	        pageIndex, pageSize).pipe(
	        catchError(() => of([])),
	        finalize(() => this.loadingSubject.next(false))
	    )
	    .subscribe(addresses => {
	    	this.pageCount=this.addressesService.pageCount;
	    	this.totalCount=this.addressesService.totalCount;
	    	this.addressSubject.next(addresses);
	    });
	}*/
}