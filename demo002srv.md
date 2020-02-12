We will create a small REST Api with express

 * [Setup](#l001)
 * [Simple handler](#l002)

## <a name="l001"></a> Setup

First let's install the library a project

	npm install -g express-generator

Then create the dir demo002srv enter it and then the following to create the project and install express in the app 

	npm init
	npm install express --save

Finally you can create a new file index.js that contains the listener

	var express = require("express");
	var port = 4201;
	var app = express();
	app.listen(port, () => {
		console.log("Server running on " + port);
	});

And then you can start listening. But going to [http://localhost:4201](http://localhost:4201) will return an error since no handler had been set!

	node index.js

## <a name="l002"></a> Simple handler

Simply add the following after the express(). This will answer with pong whenever we touch the [http://localhost:4201/api/ping](http://localhost:4201/api/ping) address. Remember that you should restart the server!! "Send" means that the content will be sent back as raw

    ...
	var app = express();
	
	app.get("/api/ping", (req, res, next) => {
	 	res.send("pong");
	});
    ...

## A crud service for an address!

### List the objects

We need a variable to store all the data and a get function to retrieve those data!

	var addresses = [];

	app.get("/api/address", (req, res, next) => {
	 	res.json(addresses);
	});


This of course will return an empty json array! "[]"

### Add an object

First we have to add support for json

	app.use(express.json())

First i try to understand what is sent (and restart the server!!) This will log the body and return a 200. Notice that the response.end() is needed to complete the request!

	app.post("/api/address", (req, res, next) => {
	 	console.log(req.body);
	 	res.status(200).end();
	});

Then with curl (is in the sources of the demo002srv project, curl.exe if you are on windows)

	curl -d "{\"key\":\"value\"}" -H "Content-Type:application/json" -X POST http://localhost:4201/api/address

Then you will see on the log

	{ key: 'value' }

Let's suppose that the structure is the following :

	  name: string;
	  id: number;
	  address: string;
	  email: string;

Then. When an address with the same id had been found, update it. Meanwhile calculate the greatest id to use when there will be an insert!

	app.post("/api/address", (req, res, next) => {
	 	var newAddress= req.body;
	 	var maxId=0;
		for(var i=0;i< addresses.length; i++){
			if(addresses[i]==newAddress.id){
				addresses[i]=newAddress;
	 			res.status(200).end();
	 			return;
			}
			maxId = Math.max(maxId,addresses[i].id);
		}
		newAddress.id=maxId+1;
		addresses.push(newAddress);
	 	res.status(200).end();
	});
	
And we can now add an item

	curl -d "{\"name\":\"A\",\"address\":\"A road\",\"email\":\"a@b.com\"}" -H "Content-Type:application/json" -X POST http://localhost:4201/api/address

And show it!

	curl http://localhost:4201/api/address

### Get a single object

We should add a parameter then the following will add the "id" field inside the request parameters. We seek the item and then return the json

	app.get("/api/address/:id", (req, res, next) => {
		var id = parseInt(req.params.id);
	 	for(var i=0;i< addresses.length; i++){
			if(addresses[i].id==id){
				res.json(addresses[i]);
	 			return;
			}
		}
	 	res.status(404).end();
	});

Now adding items with curl and getting them with the following will return the correct data

	curl http://localhost:4201/api/address/1

### Delete an item

Will be similar to the get

	app.delete("/api/address/:id", (req, res, next) => {
		var id = parseInt(req.params.id);
	 	for(var i=0;i< addresses.length; i++){
			if(addresses[i].id==id){
				list.splice(i, 1)
	 			res.status(200).end();
	 			return;
			}
		}
	 	res.status(200).end();
	});

That can then be called like

	curl http://localhost:4201/api/address/2 -X DELETE

## Handling pagination

### Fill with data

Under the demo002srv there is a batch file, fill.bat that loads a bunch of data to test the feature

	curl -d "{\"name\":\"a\",\"address\":\"a road\",\"email\":\"a@test.com\"}" -H "Content-Type:application/json" -X POST http://localhost:4201/api/address
	curl -d "{\"name\":\"b\",\"address\":\"b road\",\"email\":\"b@test.com\"}" -H "Content-Type:application/json" -X POST http://localhost:4201/api/address
	curl -d "{\"name\":\"c\",\"address\":\"c road\",\"email\":\"c@test.com\"}" -H "Content-Type:application/json" -X POST http://localhost:4201/api/address
	curl -d "{\"name\":\"d\",\"address\":\"d road\",\"email\":\"d@test.com\"}" -H "Content-Type:application/json" -X POST http://localhost:4201/api/address
	curl -d "{\"name\":\"e\",\"address\":\"e road\",\"email\":\"e@test.com\"}" -H "Content-Type:application/json" -X POST http://localhost:4201/api/address
	curl -d "{\"name\":\"f\",\"address\":\"f road\",\"email\":\"f@test.com\"}" -H "Content-Type:application/json" -X POST http://localhost:4201/api/address
	curl -d "{\"name\":\"g\",\"address\":\"g road\",\"email\":\"g@test.com\"}" -H "Content-Type:application/json" -X POST http://localhost:4201/api/address
	curl -d "{\"name\":\"h\",\"address\":\"h road\",\"email\":\"h@test.com\"}" -H "Content-Type:application/json" -X POST http://localhost:4201/api/address
	curl -d "{\"name\":\"i\",\"address\":\"i road\",\"email\":\"i@test.com\"}" -H "Content-Type:application/json" -X POST http://localhost:4201/api/address
	curl -d "{\"name\":\"j\",\"address\":\"j road\",\"email\":\"j@test.com\"}" -H "Content-Type:application/json" -X POST http://localhost:4201/api/address
	curl -d "{\"name\":\"k\",\"address\":\"k road\",\"email\":\"k@test.com\"}" -H "Content-Type:application/json" -X POST http://localhost:4201/api/address
	curl -d "{\"name\":\"l\",\"address\":\"l road\",\"email\":\"l@test.com\"}" -H "Content-Type:application/json" -X POST http://localhost:4201/api/address
	curl -d "{\"name\":\"m\",\"address\":\"m road\",\"email\":\"m@test.com\"}" -H "Content-Type:application/json" -X POST http://localhost:4201/api/address
	curl -d "{\"name\":\"n\",\"address\":\"n road\",\"email\":\"n@test.com\"}" -H "Content-Type:application/json" -X POST http://localhost:4201/api/address

### Add some header

The idea is to use the request headers to paginate. In the request

 * X-Page: the page number
 * X-PageSize: the items per page

And in the response

 * X-Count: the total count of objects
 * X-PageCount: the number of items returned

	app.get("/api/address", (req, res, next) => {
		var page=0;
		var pageSize=9999;
		if(req.header('X-Page')!=undefined){
			page=parseInt(req.header('X-Page'));
		}
		if(req.header('X-PageSize')!=undefined){
			pageSize=parseInt(req.header('X-PageSize'));
		}
		var start = page*pageSize;
		var end =(page+1)*pageSize;
		var result =[];
		for(;start< addresses.length && start<end;start++){
			result.push(addresses[start]);
		}
		res.set('X-Count',addresses.length);
		res.set('X-PageCount',result.length);
	 	res.json(result);
	});

### Running everything

Restart and fill with data. Then you can play with curl

	curl -H "X-Page:1" -H "X-PageSize:3" http://localhost:4201/api/address -i

This will return the following, note the X-Count and X-PageCount data!

	HTTP/1.1 200 OK
	X-Powered-By: Express
	X-Count: 14
	X-PageCount: 3
	Content-Type: application/json; charset=utf-8
	Content-Length: 181
	ETag: W/"b5-0cJvnL+wdxDw84xhX1z6yPoVDJ0"
	Date: Wed, 12 Feb 2020 08:34:04 GMT
	Connection: keep-alive
	
	[{"name":"d","address":"d road","email":"d@test.com","id":4},
		{"name":"e","address":"e road","email":"e@test.com","id":5},
		{"name":"f","address":"f road","email":"f@test.com","id":6}]

You can get everything working calling fillandrun.bat

	start cmd /c node index.js
	echo Waiting 5 seconds
	ping localhost -n 5 >NUL
	call fill.bat