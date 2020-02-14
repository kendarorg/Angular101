In this section we will be adding
 * Header
 * Footer
 * Menu

Then we will connect the application to a "real" rest api, using the material DataSource and finally a basic authentication

 * [Installation](#l001)
 * [Header and footer](#l002)
 * [Toolbar](#l003)
 * [Adding the submenu](#l004)
 * [Using a real REST Api](#l005)
 * [The Material Data Source](#l006)

The rest:

 * [Setup](README.md)
 * [Chapter 1: Basic addressbook app](demo001mat.md)
 * [Chapter 2 preparation: Rest API with express](demo002srv.md)


## <a name="l001"></a> Installation

Copy the project demo001mat to demo002mat

## <a name="l002"></a> Header and footer

First generate the stubs for the components

	ng generate component header
	ng generate component footer

And we can then modify the app.component.html file to include them. It will become like

	<link href="https://fonts.googleapis.com/icon?family=Material+Icons"
	      rel="stylesheet">
	<app-header></app-header>
	<router-outlet></router-outlet>
	<app-footer></app-footer>

And starting the app with "ng serve" the new parts will magically appear inside the view! Note that the path for the two modules is src/**app**/**footer** and we are using the name "app-footer" and "app-header" to use them!

Navigating through the app will always show them

## <a name="l003"></a> Toolbar

### Global configuration

First we will import a bunch of modules to app.module.ts. This are for the toolbar, the menu to show when the view is narrow and the animation to show the menu and submenus, and the flex layout to adapt to view

	import { MatToolbarModule } from '@angular/material/toolbar';
	import { MatMenuModule } from '@angular/material/menu';
	import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
	import { FlexLayoutModule } from '@angular/flex-layout';

And
	  imports: [
	    ...
	    MatToolbarModule,
	    MatMenuModule,
	    BrowserAnimationsModule,
		FlexLayoutModule,
	  ],

Inside the global style.less we then add a theme for angular material

	@import "~@angular/material/prebuilt-themes/deeppurple-amber.css";

### Inside the header

Adding the title to show for the application 

	export class HeaderComponent implements OnInit {
	  title:string = "My Demo App";

Then we can finally add the menus. First with the simple "home" button and the application title. Notice the mat-menu inside the mat-toolbar. This is to show the menu when the toolbar is narrowed.

We even assign a name to the matMenu to use it later "#menu".

	<mat-toolbar color="primary">
		<button mat-button routerLink="/">{{title}}</button>
		<div fxLayout="row" fxShow="false" fxShow.gt-sm>
			<button mat-button routerLink="/"><mat-icon>home</mat-icon></button>			
		</div>
		<button mat-button [mat-menu-trigger-for]="menu" fxHide="false" fxHide.gt-sm><mat-icon>menu</mat-icon></button>
		<mat-menu x-position="before" #menu="matMenu">
			<button mat-menu-item routerLink="/"><mat-icon>home</mat-icon> Home</button>
		</mat-menu>
	</mat-toolbar>

## <a name="l004"></a> Adding the submenu

Now i want to add a section for the addresses that contains the list of addresses and the addition of a new one. Various things had been added.

	<mat-toolbar color="primary">
		<button mat-button routerLink="/">{{title}}</button>
		<div fxLayout="row" fxShow="false" fxShow.gt-sm>
			<button mat-button routerLink="/"><mat-icon>home</mat-icon></button>
			<button mat-menu-item [matMenuTriggerFor]="addresses">Addresses Manager</button>
			<mat-menu #addresses="matMenu">
				<button mat-menu-item routerLink="/address"> Addresses</button>
				<button mat-menu-item routerLink="/address/-1">Add Address</button>
			</mat-menu>
		</div>
		<button mat-button [mat-menu-trigger-for]="menu" fxHide="false" fxHide.gt-sm><mat-icon>menu</mat-icon></button>
		<mat-menu x-position="before" #menu="matMenu">
			<button mat-menu-item routerLink="/"><mat-icon>home</mat-icon> Home</button>
				<button mat-menu-item [matMenuTriggerFor]="addressesMenu" >Addresses Manager</button>
				<mat-menu #addressesMenu="matMenu">
					<button mat-menu-item routerLink="/address"> Addresses</button>
					<button mat-menu-item routerLink="/address/-1">Add Address</button>
				</mat-menu>
		</mat-menu>
	</mat-toolbar>

A new button "Addresses Manager is added inside the mat toolbar, the button before it has the **matMenuTriggerFor** attribute set, and refers to the following mat-menu, named **addresses**

The same happens inside the "main" mat menu

The result is the following when collapsed

![mat-menu-collapsed](angular101.mat-menu-coll.png)

Or when expanded

![mat-menu-expanded](angular101.mat-menu-exp.png)


## <a name="l005"></a> Using a real REST Api

Before this step you should follow the [2 part preparation](demo002srv.md)

### Global files

Should import the http client inside the app.module

	import { HttpClientModule } from '@angular/common/http';

Adding it to the imports

	  imports: [
	    ...
	    HttpClientModule,
	  ],

### The data service

Now we modify the data service adding the dependency from httpClient (of course importing HttpClient) and a variable with the base url for the api, with it we add the Observable and the Subject (or subscriber for observable). This is part of reactive Js (rxjs) and is needed to handle the notification of the result of the call to the services

	import { HttpClient } from '@angular/common/http';
	import { Observable, Subject } from 'rxjs';
	...
		baseUrl:string = 'http://localhost:4201/api/address';
		constructor(private http: HttpClient) { } 

Let's start with the getAddresses. It returns an Observable. NOT the result data but a promise to fulfill the request. Notice the return value added! (:Observable<AddressElement>)
	
	  public getAddresses():Observable<AddressElement>{
	  	return this.http.get<AddressElement>(this.baseUrl);
	  }


We can remove the list of pre-filled addresses and the "clone" stuff.

### The addresses component

Now that the return value of getAddresses is changed, we need to setup how the observable is handled. Inside the onIniti we need to give to subscribe with a callback (data:{}) to the promise. We know that the content will be an array of AddressElement thus it needs to be casted!

	  ngOnInit(): void {
	  	this.dataService.getAddresses().subscribe((data: {}) => {
	      this.addresses = data as AddressElement[];
	    }); 
	  }

When the request of items will be completed, the addresses array will be filled

Now running (and filling) the REST server and running the app will let us see the list of items!

### Get by id

Let's change first the service. Notice the return value added! (:Observable<AddressElement>)

	  public getById(id:number):Observable<AddressElement>{
	  	return this.http.get<AddressElement>(this.baseUrl+"/"+id);
	  }

And then the single-address.component.ts. Notice that we are still casting the item, and in case of a new item nothing is changed! 

Another special thing is the initialization of an empty object. This is needed to have some "real" value shown before the REST call result.

	ngOnInit(): void {
		...
		}else{
			this.address = {} as AddressElement;
			this.dataService.getById(this.addressId).subscribe((data: {}) => {
		      this.address = data as AddressElement;
		    });
		}
	}

Same goes for the cancel path

	cancel(path:string){
		...
		}else{
			this.dataService.getById(this.addressId).subscribe((data: {}) => {
		      this.address = data as AddressElement;
		    });
		}
	}

When a call to getById is made the system waits for the response and invoke the callback with a generic object passed, that is then cast to AddressElement

You can verify all of this editing an item, modifying it and canceling: the item will be put in the previous state

Another way to verify the behavior is adding a new item

Now the save and delete are missing

### Save

As before, inside the service. Notice the return value added! (:Observable<AddressElement>)

	  public save(item:AddressElement):Observable<AddressElement>{
	  	this.http.post<AddressElement>(this.baseUrl,item);
	  }

A bit more has to be changed inside the controller. The whole part after the save() must be moved inside the callback!

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

## <a name="l006"></a> The Material Data Source

Let's start adding a new method to the service to handle the DataSource. The data source is nice because it handles all the pagination, ordering, filtering and sorting. For our example we will handle only the pagination, that was implemented via http headers on the server.

First we need to import globally the paginator on app.module.ts

	import { MatPaginatorModule } from '@angular/material/paginator';

And load it in the imports

	  imports: [
	    ...
	    MatPaginatorModule,
	  ],

### Modify the service

We need to import the HttpHeaders and rxjs. The latter is needed to map the result from the request to a consistent object 

	import { HttpClient, HttpHeaders } from '@angular/common/http';
	import { map } from 'rxjs/operators'; 

We add a new type to return, containing the data for the pagination (this could be placed in a common part since its "type agnostic"

	export interface AddressResult {
		body: Object;
		pageCount: number;
		totalCount: number;
		pageIndex:number;
	}

We will not use sorting and filter. Just the pagination. We are reading the data from the API that tells us the specification of the data, like the total count and the page index returned


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
	        	var pageCount =parseInt(res.headers.get('X-PageCount'));
	        	var pageIndex =parseInt(res.headers.get('X-PageIndex'));
	        	var totalCount =parseInt(res.headers.get('X-Count'));
	        	return {
	        		body:res.body as AddressElement[],
	        		pageCount:pageCount,
	        		totalCount:totalCount,
	        		pageIndex:pageIndex} as AddressResult;
	        })
	    );
	}


### Changes in the controller

We need to import 

* AddressResult: the new class added
* MatPaginator, PageEvent: The paginator object and the event produced
* MatTableDataSource: The data source that we will use to show the results

	import { AddressesDataService, AddressElement, AddressResult } from '../addresses-data.service';
	import { MatPaginator, PageEvent } from '@angular/material/paginator';
	import { MatTable, MatTableDataSource } from '@angular/material/table';

We setup a new variable for the paginator. The annotation tells angular to initialize the item only when everything is ready

	@ViewChild(MatPaginator, { static: false }) 
	paginator: MatPaginator;

Then setup the data source and all the paginator variables

	dataSource = new MatTableDataSource();
	length: number;
	pageIndex: number =0;
	pageSize: number=3;
	pageSizeOptions = [1, 5, 10, 50];

And an event. That will be monitored and will update the paginator

	pageEvent: PageEvent;

Let's rewrite the getAddresses. It receives an event from paginator. If nothing is passed an empty object casted as an event is created filling the blanks with the default values.

Then a subscription to findAddresses is created that updates the values shown. 

Finally the event is returned. Prettu straightforward for now. Notice the cast to Array of AddressElement of the AddressResult

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

The onInit will be greatly simplified. Just call getAddresses

	ngOnInit(): void {
		this.getAddresses(null);
	}


	dataSource: AddressesDs;
	constructor(public dataService: AddressesDataService) {}
	
	ngOnInit(): void {
		this.dataSource = new AddressesDs(this.dataService);
		this.dataSource.loadAddresses(-1);
	}

### The html presentation

The dataSource will be changed to dataSource

	<mat-table [dataSource]="dataSource" class="mat-elevation-z1" >

We will add after the mat-table the following. #paginator tells Angular that a variable exists inside the controller with that value. The most interesting thing is the (page). This means that when the page is changed on the paginator an event is intercepted and sent to the controller!

	<mat-paginator  #paginator
	                [length]="length"
	                [pageSize]="pageSize"
	                [pageIndex]="pageIndex"
	                [pageSizeOptions]="pageSizeOptions"
	                (page)="pageEvent = getAddresses($event)">
	</mat-paginator>

The controller will then call the service to get the data and it will be shown :D