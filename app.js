//jshint esversion: 6
const express = require("express");
// const https = require("https");
// body parser needed for form post data recive 
const bodyParser = require("body-parser");
const request = require("request");
const app = express();
const https = require("https");
const mailchimp = require("@mailchimp/mailchimp_marketing");
const client = require("@mailchimp/mailchimp_marketing");



// helped with problem of style.css error text/html 
app.use(express.static(__dirname + '/'));

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));


app.post("/", function(req, res) {
	client.setConfig({apiKey: "26d8ce00606059f75a3bf961e8150de0-us13",  server: "us13",});
	const subscribingUser = {firstName: req.body.fName, lastName: req.body.lName, email: req.body.email};
	
	


	const run = async () => {
		const response = await client.lists.addListMember("bd928c4dce", {
			email_address: subscribingUser.email,
			status: "subscribed",
			merge_fields: {
				FNAME: subscribingUser.firstName,
				LNAME: subscribingUser.lastName
        	}
		});

		res.sendFile(__dirname + "/success.html");

		

		console.log(response.status)
		// console.log(response);

		
	};

	run();
	
	
		
	


});






app.get("/", function(req, res) {
	res.sendFile(__dirname + "/index.html");
});



app.listen(3000, function() {
	console.log("Server has just started on port 3000");
});
















