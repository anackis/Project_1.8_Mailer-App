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
client.setConfig({apiKey: "26d8ce00606059f75a3bf961e8150de0-us13",  server: "us13",});

app.post("/", function(req, res) {
	const subscribingUser = {firstName: req.body.fName, lastName: req.body.lName, email: req.body.email};
	
	const run = async () => {
		try {
			const response = await client.lists.addListMember("bd928c4dce", {
				email_address: subscribingUser.email,
				status: "subscribed",
				merge_fields: {
					FNAME: subscribingUser.firstName,
					LNAME: subscribingUser.lastName
				}
			});
			console.log(response.status)
			res.sendFile(__dirname + "/success.html");
		} catch (err) {
			console.log(err.status);
			res.sendFile(__dirname + "/failure.html");
		}
	};
	run();
});


app.post("/failure", function(req, res) {
	res.redirect("/")
})

app.post("/success", function(req, res) {
	res.redirect("/")
})


// 3000 -> process.env.PORT for heroku servers 
app.listen(process.env.PORT || 3000, function() {
	console.log("Server has just started on port 3000");
});
















