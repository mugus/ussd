const express= require('express')
const https=require('https')
const fs=require('fs')
const path=require('path')
const app=express();
require('dotenv').config()
const cors = require('cors');
app.use(cors());
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.post('/ussd', (req, res) => {
    const {
        sessionID,
        serviceCode,
        phoneNumber,
        text
    } = req.body;
    let response = "";

    if(text == ''){
        response = `What would you like to check ?
            1. My Account
            2. My phone Number`;
    }else if(text == "1"){
        response = `Choose account info you want to view?
            1. Account Number
            2. Account Balance`;
    }else if(text == "2"){
        response = `End Your phone number is not available`;
    }else if(text == "1*1"){
        response = `End Your account number is ${accountNumber}`;
    }else if(text == "1*2"){
        const balance = 'RWF 100,000';
        response = `End Your account number is ${balance}`;
    }
    res.set('Content-Type: text/plain')
    // res.set('Content-Type: application/x-www-form-urlencoded')
    res.send(response);
    })



const options = {
    key:fs.readFileSync(path.join(__dirname,'./cert/key.pem')),
    cert:fs.readFileSync(path.join(__dirname,'./cert/cert.pem'))
    }




const sslServer=https.createServer(options,app);
sslServer.listen(process.env.PORT,()=>{
console.log(`Secure server is listening on port ${process.env.PORT}`)
})