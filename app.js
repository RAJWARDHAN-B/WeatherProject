// jshint esversion: 6

const express = require("express");
const https = require("https");

const app = express();

app.get("/",function(req,res){
    
    const url = "https://api.openweathermap.org/data/2.5/weather?q=Pune&appId=0582caf2ba797f537d8b341735ab23ec&units=metric";
    https.get(url,function(response){
        console.log(response.statusCode);
        
    });
    res.send("Server is up and running");
})

app.listen(3000, function(){
    console.log("Server running on port 3000...");
});