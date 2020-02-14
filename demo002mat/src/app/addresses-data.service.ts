import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators'; 


@Injectable({
  providedIn: 'root'
})
export class AddressesDataService {

	baseUrl:string = 'http://localhost:4201/api/address';
	constructor(private http: HttpClient) { } 

	public getAddresses():Observable<AddressElement>{
	return this.http.get<AddressElement>(this.baseUrl);
	}

	public getById(id:number):Observable<AddressElement>{
	return this.http.get<AddressElement>(this.baseUrl+"/"+id);
	}
  
  
	public save(item:AddressElement):Observable<AddressElement>{
	return this.http.post<AddressElement>(this.baseUrl,item);
	}
  
  	pageCount:number;
  	totalCount:number;
	public findAddresses(
	    addressId:number = -1, filter = '', sortOrder = 'asc',
	    pageNumber = 0, pageSize = 3):Observable<AddressResult> {

		var headers = new HttpHeaders();
		    	
		var address = this.baseUrl;
		if(addressId>=0){
			address+="/"+addressId;
		}else{
			headers = headers.set('X-Page',pageNumber.toString());
			headers = headers.set('X-PageSize',pageSize.toString());
		}
		
	    return this.http.get(address, {headers:headers, observe: "response"}).pipe(
	        map(res =>  {
	        	this.pageCount =parseInt(res.headers.get('X-PageCount'));
	        	var pageIndex =parseInt(res.headers.get('X-PageIndex'));
	        	this.totalCount =parseInt(res.headers.get('X-Count'));
	        	return {
	        		body:res.body as AddressElement[],
	        		pageCount:this.pageCount,
	        		totalCount:this.totalCount,
	        		pageIndex:pageIndex} as AddressResult;
	        })
	    );
	}
}

export interface AddressElement {
  name: string;
  id: number;
  address: string;
  email: string;
}

export interface AddressResult {
  body: Object;
  pageCount: number;
  totalCount: number;
  pageIndex:number;
}
