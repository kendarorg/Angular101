Aim of this tutorial is building a small app for an address book demonstrating a basic CRUD (Create Read Update Delete) application


## Installation

Download node js from [Kendar.org](http://www.kendar.org/?p=/system/portableservers) and extract the Nod 12.13.1 in your preferred directory. Starting pnodejs.bat will start the environment. Then go in you project dir to get started. I choose "C:\Angular101".

Then you can install the angular cli

	npm install -g @angular/cli

Now go into the dir and run

	ng new demo001

Choosing to add Routing and Less. This will create an application stub... and happily go to take a coffee break!

 * Routing: The client routing for angular
 * Less: A system to write css following an "Object oriented" approach

## The generated app

### Root

The directory demo001 is created, and contains several other subdirectories:

 * node_modules: all the node stuffs download for the project, that is added directly to the .gitignore file
 * src: containing the real source files
 * e2e: needed to run the angular application and the tests with Protractor

A bunch of file inside the root are created too:

 * angular.json: The angular project configuration
 * tsling.json: The TypeScript lint configuration, with the rules needed by the static check
 * tsconfig.*.json: The configurations for the transpiler from TypeScript to Javascript
 * package-lock.json: Autogenerated to contain the versions of the imported libraries
 * package.json: The package versions
 * karma.conf.js: Configuration for the karma test runners 
 * browserslist: To define how Less will generate css according to the compatibility with the listed browsers

### Sources

 * index.html: The main container (module) of the application
 * styles.less: The main css/less file
 * test.ts: The main tests runner
 * polyfill.ts: Functions needed to harmonize the browser's behaviors
 * main.ts: The main entry point for the application
 * assets: The static assets (like images etc)
 * environments: The specific settings for each environment. Here we have the development (default) and production
 * app: The application itself

### The App

This is the first module that will be instantiated after the main

 * app-routing.module.ts: Routing for the main application
 * app.component.css: Css specific for the main component
 * app.component.html: Html template (view) for the main component
 * app.component.ts: Component source 
 * app.component.spec.ts: Component tests
 * app.module.ts: The list of modules used by the app

### Further preparation

I choose to use the material library with flex layout

	npm i @angular/material @angular/cdk @angular/animations @angular/flex-layout

Now you can run the application typing 

	ng serve

And now you could see the "fancy" application in your browser going on [http://localhost:4200](http://localhost:4200). Ctrl+C to stop the server

To clean up all the mess the content of the app.component.html can be switched to the following. Equivalent to the old ng-view. This will contain all the result of the route choices

	<router-outlet></router-outlet>

Re-running the serve command will lead to an empty page! :D

## The list of addresses

Let's start showing the list of addresses

	ng generate component Addresses

And four new files are now created, describing the new component, adding them to the main app.module.ts

 * addresses/addresses.component.html
 * addresses/addresses.component.spec.ts
 * addresses/addresses.component.ts
 * addresses/addresses.component.less

### Routing 

Let's start the ng serve in backround. This will listen to file system changes and recompile everything accordingly showing errors too!

I assume that the first page will be the one showing all the addresses. But the default routing should point to the addresses component.

I need to modify the app-routing.module. Let's dissect it. First there is the import for the core of angular js, with a "node_modules" based path, denoted via the @ sign. It means, seek for the module core under the current angular version directory, and from the core angular stuffs import NgModule. The same for router

	import { NgModule } from '@angular/core';
	import { Routes, RouterModule } from '@angular/router';

Then an empty list of routes is exposed (that will be filled afterwards)

	const routes: Routes = [];

Finally the main application is initialized, exporting are initialized NgModule and AppRoutingModule

	@NgModule({
	  imports: [RouterModule.forRoot(routes)],
	  exports: [RouterModule]
	})
	export class AppRoutingModule { }

This will be used inside the app.module.ts file to start the application

First adding the import for the new component to the list of imports

	import { AddressesComponent } from './addresses/addresses.component';

Then adding the new default route to the list of routes:

	const routes: Routes = [
		{path: "", component: AddressesComponent},
	];

Now ,refreshing the page will return a catching text: **addresses works!** 

### Furnishing some "real" data

It is then possible to expose some data. We create a simple service

	ng generate service AddressesData

Generating two files

 * addresses-data.service.spec.ts: The data service test
 * addresses-data.service.ts: The data service itself



Now we can fill the latter  with some fake data inside the class declaration. Note the type declaration, array of AddressElement

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
	  
	  public getAddresses():Array<AddressElement>{
	    return this.addresses;
	  }

Let's examine a bit more. Before the class declaration there is an annotation. This is needed by all the services. It means that the service will be "stored" inside the root dependency injection context.

	@Injectable({
	  providedIn: 'root'
	})

Additionally the definition of the data is added

	export interface AddressElement {
	  name: string;
	  id: number;
	  address: string;
	  email: string;
	}

### The controller

First we need to import the data service. Notice the "**../**" part. We are setting a relative path for the import. The definition of AddressElement is imported too

	import { AddressesDataService, AddressElement } from '../addresses-data.service';

Then the constructor must be changed to include the data service just imported and will be changed to the following. Creating a variable data service, initialized with the instance just imported.

	constructor(public dataService: AddressesDataService) { }

We can now add the initialization with the onInit method and a function to select the...selected address, with the relative fields.

	addresses: Array<AddressElement>;
  
	ngOnInit(): void {
		this.addresses = this.dataService.getAddresses();
	}

Finally a variable containing the the columns to show is added

	displayedColumns: string[] = ['name', 'address', 'email'];

### Showing the table

We are using the "material" library for our application. Specifically we use the MatTableModule. It must first be imported inside the app.module.ts

	import { MatTableModule } from '@angular/material/table'; 

And added into the @NgModule

	@NgModule({
		...
		imports: [
			...
			MatTableModule,
		],

Now all the application will have access to this module!

The template of the addesses component, inside addresses.component.html, must now show the list! I add too the id cell of the object that will be useful in further explanations.

A "mat-table" is created using a "[dataSource]" **NOTE THE SQUARE BRACKETS**. Inside it are defined all the possible columns inside the ng-container. 

 * matColumnDefId: is only an identifier that will not be used further
 * mat-header-cell: The template for the header cell
 * mat-cell: The template for the content cell. 

The content cell use the standard Angular syntax. {{property}}. Angular automatically understand that one item of the addresses array should take the name "element"

At the end

 * mat-header-row: header template for the whole row, telling what cells must be shown
 * mat-row: template for a data row

		<table mat-table [dataSource]="addresses" class="mat-elevation-z1" >
			<ng-container matColumnDef="id">
				<th mat-header-cell *matHeaderCellDef> Id</th>
				<td mat-cell *matCellDef="let element"> {{element.id}} </td>
			</ng-container>
			...
		    
			<tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
			<tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
		</table>

Finally to add some style, inside the addresses.component.less set the width to 100%

	table {
		width: 100%;
	}

### The result

Now the result should be something like this:

![mat-table](angular101.mat-table.png)


## The detail

Now i would like to show a single item. First we setup the component stub inside the project root dir

	ng generate component SingleAddress

This will generate a directory single-address with the stub for the new component

### Components

Inside the app.module.ts we add two new Material modules, the button, the icon and the form, importing them

	import { MatButtonModule } from '@angular/material/button';
	import { MatIconModule } from '@angular/material/icon';
	import {FormsModule} from '@angular/forms';

And using them inside the @NgModule

	@NgModule({
		...
		imports: [
			...
			MatButtonModule,
			MatIconModule,
			FormsModule,
		],

Inside the app.component.html a new css is included to get all the Material icons

	<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

#### Self-hosting material icons

This part is copy pasted directly from [http://google.github.io](http://google.github.io/material-design-icons/#icon-font-for-the-web) no responsibility taken for this!

For those looking to self host the web font, some additional setup is necessary. Host the [icon font](https://github.com/google/material-design-icons/tree/master/iconfont) in a location, for example https://example.com/material-icons.woff and add the following CSS rule:

	@font-face {
	  font-family: 'Material Icons';
	  font-style: normal;
	  font-weight: 400;
	  src: url(https://example.com/MaterialIcons-Regular.eot); /* For IE6-8 */
	  src: local('Material Icons'),
	    local('MaterialIcons-Regular'),
	    url(https://example.com/MaterialIcons-Regular.woff2) format('woff2'),
	    url(https://example.com/MaterialIcons-Regular.woff) format('woff'),
	    url(https://example.com/MaterialIcons-Regular.ttf) format('truetype');
	}

In addition, the CSS rules for rendering the icon will need to be declared to render the font properly. These rules are normally served as part of the Google Web Font stylesheet, but will need to be included manually in your projects when self-hosting the font:

	.material-icons {
	  font-family: 'Material Icons';
	  font-weight: normal;
	  font-style: normal;
	  font-size: 24px;  /* Preferred icon size */
	  display: inline-block;
	  line-height: 1;
	  text-transform: none;
	  letter-spacing: normal;
	  word-wrap: normal;
	  white-space: nowrap;
	  direction: ltr;
	
	  /* Support for all WebKit browsers. */
	  -webkit-font-smoothing: antialiased;
	  /* Support for Safari and Chrome. */
	  text-rendering: optimizeLegibility;
	
	  /* Support for Firefox. */
	  -moz-osx-font-smoothing: grayscale;
	
	  /* Support for IE. */
	  font-feature-settings: 'liga';
	}


### Routing

First we need to be able to call the new component and we add therefore the component inside app-routing.module.ts

	import { SingleAddressComponent } from './single-address/single-address.component'; 

And then two new routes, one for the list (to respect the REST standard) and one for the single resulting in the following code


	const routes: Routes = [
		{path: "", component: AddressesComponent}, 
		{path: "address", component: AddressesComponent}, 
		{path: "address/:id", component: SingleAddressComponent}, 
	];

Noticed the **:id** this is to intend that the path will be in the form "address/123" to get exactly the required address

### Modifying the list

A new button is added to the table in addresses.component.html. This will follow the **routerLink** that we specified inside the routing. Note the slash in front of the address. This will make the address absolute!

	<ng-container matColumnDef="view">
      <th mat-header-cell *matHeaderCellDef></th>
      <td mat-cell *matCellDef="let element">
        <button mat-icon-button routerLink="/address/{{element.id}}">
          <mat-icon>view</mat-icon>
        </button>
      </td>
    </ng-container>

Now clicking on the link you will be redirected to a fantastic "single-address works!"

### Retrieving the data from the route

Inside the SingleAddressComponent we need to retrieve the routed data, through the Activated Route service 

	import { ActivatedRoute } from '@angular/router';

That is injected inside the single-address.components.ts

	addressId: number;
	constructor(private activatedRoute: ActivatedRoute) { 
		this.addressId = this.activatedRoute.snapshot.params.id;
	}

At this point we can show it inside the single-address.component.html. The message now contains the id of the clicked element

	<p>single-address {{addressId}} works!</p>

### Preparing the service

The service will have a new method getById with a number parameters
  
	public getById(id:number){
		var addresses = this.getAddresses();
		for(var  i=0;i<addresses.length;i++){
			if(addresses[i].id==id){
				return addresses[i];
			}
		}
		return null;
	}

### Showing the data

We need then to import the data service and add it to the constructor

	import { AddressesDataService, AddressElement } from '../addresses-data.service';

	...
	address:AddressElement;

	constructor(private activatedRoute: ActivatedRoute,
			public dataService: AddressesDataService) { 
		this.addressId = this.activatedRoute.snapshot.params.id;
		this.address = this.dataService.getById(this.addressId);
	}

Loading the page will load a new address! And we can change the text, but nothing changes :D

	<p>single-address {{address.id}} works!</p>

### The detail template

Now it's possible to show all item data

	<h2>Selected Address</h2>
	<label>Name
	  <input type="text" [(ngModel)]="address.name">
	</label>
	<label>SKU
	  <input type="text" [(ngModel)]="address.address">
	</label>
	<label>Description
	  <input type="text" [(ngModel)]="address.email">
	</label>

With a decent css

	.products {
	  padding: 2rem;
	}
	
	label, input {
	  display: block;
	}
	
	label {
	  margin-bottom: 1rem;
	}

Resulting in the following awesome screen

![detail](angular101.detail.png)


## Editing the detail

