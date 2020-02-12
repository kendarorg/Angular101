import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddressesDataService {

  baseUrl:string = 'http://localhost:4201/api/address';
  constructor(private http: HttpClient) { } 
  
  
  private clone<T>(a: T): T {
	  return JSON.parse(JSON.stringify(a));
	}
	
  public getAddresses():Observable<AddressElement>{
  	return this.http.get<AddressElement>(this.baseUrl);
  }
  
  public getById(id:number){
  	
  	return null;
  }
  
  
  public save(item:AddressElement){
  	
  }
}

export interface AddressElement {
  name: string;
  id: number;
  address: string;
  email: string;
}
