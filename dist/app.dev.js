"use strict";

// api key
// 188dd2755158910e95a925df3be384f6-us17
// {list_id}
// a9b5641819 
var express = require("express");

var bodyParser = require("body-parser");

var request = require("request");

var app = express();
app.use(express["static"]("public"));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});
app.post("/", function (req, res) {
  var firstName = req.body.fName;
  var lastName = req.body.lName;
  var email = req.body.email;
  var option = {
    url: "https://us17.api.mailchimp.com/3.0/lists/a9b5641819",
    method: "POST"
  };
});
request(option, function (error, response, body) {
  if (error) {
    console.log(error);
  } else {
    console.log(response.statusCode);
  }
});
app.listen(3000, function () {
  console.log("Voom! it's running on 3000");
});