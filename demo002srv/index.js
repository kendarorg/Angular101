	var express = require("express");
	const cors = require('cors');
	var port = 4201;
	var app = express();
	
	app.get("/api/ping",cors(), (req, res, next) => {
	 	res.send("pong");
	});
	
	
	var addresses = [];

	
	
	app.use(express.json())
	
	app.post("/api/address",cors(), (req, res, next) => {
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
	
	app.get("/api/address/:id",cors(), (req, res, next) => {
		var id = parseInt(req.params.id);
	 	for(var i=0;i< addresses.length; i++){
			if(addresses[i].id==id){
				res.json(addresses[i]);
	 			return;
			}
		}
	 	res.status(404).end();
	});
	
	app.delete("/api/address/:id",cors(), (req, res, next) => {
		var id = parseInt(req.params.id);
	 	for(var i=0;i< addresses.length; i++){
			if(addresses[i].id==id){
				addresses.splice(i, 1)
	 			res.status(200).end();
	 			return;
			}
		}
	 	res.status(200).end();
	});
	
	app.get("/api/address", cors(),(req, res, next) => {
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
	
	app.listen(port, () => {
		console.log("Server running on " + port);
	});
	//req.header('User-Agent')
	//res.set('Content-Type', 'text/html')