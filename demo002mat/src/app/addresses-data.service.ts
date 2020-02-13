import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

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
}

export interface AddressElement {
  name: string;
  id: number;
  address: string;
  email: string;
}
