import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AddressesDataService {

  constructor() { } 
  
  addresses: AddressElement[] = [
    {id: 1, name: "Contact A", address: "A road", email: "a@b.com"},
    {id: 2, name: "Contact B", address: "B road", email: "b@c.com"},
    {id: 3, name: "Contact C", address: "C road", email: "c@d.com"},
    {id: 4, name: "Contact D", address: "D road", email: "d@e.com"},
    {id: 5, name: "Contact E", address: "A road", email: "e@b.com"},
    {id: 6, name: "Contact F", address: "B road", email: "f@c.com"},
    {id: 7, name: "Contact G", address: "C road", email: "g@d.com"},
    {id: 8, name: "Contact H", address: "D road", email: "h@e.com"}
  ];
  
  private clone<T>(a: T): T {
	  return JSON.parse(JSON.stringify(a));
	}
	
  public getAddresses():Array<AddressElement>{
  	var result= [] as AddressElement[];
  	for(var  i=0;i< this.addresses.length;i++){
  		result.push(this.clone(this.addresses[i]));
  	}
    return result;
  }
  
  public getById(id:number){
  	for(var  i=0;i< this.addresses.length;i++){
  		if(this.addresses[i].id==id){
  			return this.clone(this.addresses[i]);
  		}
  	}
  	return null;
  }
  
  private getLastIndex(){
  	var maxIndex = 0;
  	for(var  i=0;i< this.addresses.length;i++){
  		if(this.addresses[i].id>maxIndex){
  			maxIndex= this.addresses[i].id;
  		}
  	}
  	return maxIndex+1;
  }
  
  public save(item:AddressElement){
  	if(item.id==undefined){
  		item.id=this.getLastIndex();
  		this.addresses.push(this.clone(item));
  	}else{
  		for(var  i=0;i< this.addresses.length;i++){
	  		if(this.addresses[i].id==item.id){
	  			this.addresses[i]=this.clone(item);
	  		}
	  	}
  	}
  }
}

export interface AddressElement {
  name: string;
  id: number;
  address: string;
  email: string;
}
