const expres = require("express");
const bodyParser = require("body-parser");
const request = require("request");


const app = expres();

app.use(expres.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html")
});

app.post("/", function(req, res){
    var firstName = req.body.fName;
    var lastName = req.body.lName;
    var email = req.body.email;
    var phone = req.body.phone;
    

    var data = {
        members: [
            {   
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName,
                    PHONE: phone,
                }
            }
        ]
    };

    var jsonData = JSON.stringify(data);

    var options = {
        url: "https://us17.api.mailchimp.com/3.0/lists/a9b5641819",
        method: "POST",
        headers: {
            "Authorization": "Purple 188dd2755158910e95a925df3be384f6-us17"
        },
        //body: jsonData,
    };

    request(options, function(error, response, body){
        if (error){
            res.sendFile(__dirname + "/failure.html");
        } else {
            if(response.statusCode === 200){
                res.sendFile(__dirname + "/success.html");
            }else{
                res.sendFile(__dirname + "/failure.html");
            }
        } 
    });

});

app.post("/failure", function(req, res){
    res.redirect("/signup.html");
});

app.listen(3000, function(){
    console.log("Voom! it's live and running")
});