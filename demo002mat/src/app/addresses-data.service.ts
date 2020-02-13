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
  
  	public findAddresses(
        addressId:number, filter = '', sortOrder = 'asc',
        pageNumber = 0, pageSize = 3):  Observable<AddressElement> {

		var headers = new HttpHeaders();
		    	
    	var address = this.baseUrl;
    	if(addressId>=0){
    		address+="/"+addressId;
    	}else{
    		headers = headers.set('X-Page',pageNumber.toString());
    		headers = headers.set('X-PageSize',pageSize.toString());
    	}
    	
        return this.http.get(address, {headers:headers}).pipe(
            map(res =>  {var t=res["payload"];return res;}) 
        );
    }
}

export interface AddressElement {
  name: string;
  id: number;
  address: string;
  email: string;
}
