// jshint esversion: 6

const express = require("express");
const https = require("https");

const app = express();

app.get("/",function(req,res){
    
    const url = "https://api.openweathermap.org/data/2.5/weather?q=Pune&appId=0582caf2ba797f537d8b341735ab23ec&units=metric";
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
            res.write("<h1>The temperature in Pune is: "+ temp + " degrees celsius.</h1>");
            res.write("<img src="+imageURL+" >")
            res.send();
           
            // WE CAN ONLY HAVE ONE RES.SEND
            console.log(weatherdescription);
        });
        
    });
    //res.send("Server is up and running");
});

app.listen(3000, function(){
    console.log("Server running on port 3000...");
});