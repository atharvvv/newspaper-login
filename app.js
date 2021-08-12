const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https")


const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}))

app.get("/", function(req , res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/" ,function(req ,res){

  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email =  req.body.email;

  const data ={
    members:[
      {
        email_address: email,
        status: "subscribed",
        merge_fields:{
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]


  };

  const jsonData = JSON.stringify(data);

  const url = `https://us6.api.mailchimp.com/3.0/lists/0188230367`;

  const options ={
    method: "POST",
    body: data,
    auth: "atharva1:ed03685f09a4dd6b051858405cfc6782-us6"
  };




  const request = https.request(url, options, function(reponse){
    if(reponse.statusCode===200){
      res.send("successfully subscribed");
    }
    else{
      res.send("There was an error in signup , Please try again!");
    }

    reponse.on("data" , function(data){
      console.log(JSON.parse(data));
    });

  });
  request.write(jsonData);
  request.end();

``


});


app.listen(3000, function(){
  console.log("server is running on Prt 3000");
});

//ed03685f09a4dd6b051858405cfc6782-us6

//0188230367
