// jshint esversion: 6

const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){

    res.sendFile(__dirname + "/index.html");
        
    
    //res.send("Server is up and running");
});

app.post("/", function(req,res){

    //console.log(req.body.cityName);
    //console.log("Post request received");

    const query = req.body.cityName;
    const apiKey = "0582caf2ba797f537d8b341735ab23ec";
    const unit = "metric";
    
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appId="+ apiKey +"&units=" + unit;
    
    https.get(url,function(response){
        console.log(response.statusCode);
        response.on("data",function(data){
            const weatherData = JSON.parse(data);
            console.log(weatherData);
            const weatherdescription = weatherData.weather[0].description;
            const temp = weatherData.main.temp;

            const icon = weatherData.weather[0].icon;
            const imageURL = "https://openweathermap.org/img/wn/" + icon +"@2x.png";

            res.write("<P>The current weather is " + weatherdescription + "</P>");
            res.write("<h1>The temperature in " + query + " is: "+ temp + " degrees celsius.</h1>");
            res.write("<img src="+imageURL+" >")
            res.send();
           
            // WE CAN ONLY HAVE ONE RES.SEND
            console.log(weatherdescription);
        });

    });
});



app.listen(3000, function(){
    console.log("Server running on port 3000...");
});