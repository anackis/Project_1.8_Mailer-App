//jshint esversion: 6
const express = require("express");
// const https = require("https");
// body parser needed for form post data recive 
const bodyParser = require("body-parser");
const request = require("request");
const app = express();


// helped with problem of style.css error text/html 
app.use(express.static(__dirname + '/'));

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.post("/", function(req, res) {

	const firstName = req.body.fName ;
	const lastName = req.body.lName  ;
	const	email = req.body.email ;

	// js object 
	const data = {
		members: [
			{
				email_address: email,
				status: "suscribed",
				merge_fields: {
					FNAME:  firstName,
					LNAME: lastName
				}
			}
		]
	};

	// converting js to json 
	const jsonData = JSON.stringify(data);

});


app.get("/", function(req, res) {
	res.sendFile(__dirname + "/index.html");
});



app.listen(3000, function() {
	console.log("Server has just started on port 3000");
});
















