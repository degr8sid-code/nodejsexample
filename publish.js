//imp MAM stuff
const Mam = require('../../Downloads/IOTAProject/mam.client.js-master/mam.client.js-master/lib/mam.client.js')
const { asciiToTrytes, trytesToAscii } = require('@iota/converter')
const mode = 'restricted'
const secretKey = 'VERYSECRETKEY'
const provider = 'https://nodes.devnet.iota.org'

//import express from 'express';
//var express = require('express')
//var app = express()
//var bodyParser = require("body-parser")
//const moment = require('moment');
//const mamExplorerLink = `https://mam-explorer.firebaseapp.com/?provider=${encodeURIComponent(provider)}&mode=${mode}&key=${secretKey.padEnd(81, '9')}&root=`

let numberofSteps;
let kilometersWalked;
let timestamp;
//const TIMEINTERVAL  = 30; 
// Initialise MAM State
let mamState = Mam.init(provider)
// Set channel mode
mamState = Mam.changeMode(mamState, mode, secretKey)
// Publish to tangle
const publish = async packet => {
    
    //console.log(packet.kilometersWalked);
    //console.log(packet.numberofSteps);
    //console.log(packet.message);
    //console.log(packet.timestamp);
    // Create MAM Payload - STRING OF TRYTES
    const trytes = asciiToTrytes(JSON.stringify(packet))
    const message = Mam.create(mamState, trytes)

    // Save new mamState
    mamState = message.state

    // Attach the payload
    //await Mam.attach(message.payload, message.address, 3, 9)
    await Mam.attach(message.payload, message.address)

    console.log('Published', packet, '\n');
    console.log (message.root);
    return message.root
}

const generateJSON = function() {
  numberOfSteps= Math.floor((Math.random()*89)+10);
  kilometersWalked= Math.floor(990/9);
  timestamp= (new Date()).toLocaleString();
  const json = {"Number of Steps": numberOfSteps, "kilometers walked" : kilometersWalked, "dateTime": timestamp};
  return json;
}

const publishAll = async () => {
  const json = generateJSON()
  const root = await publish(json)
    //numberOfSteps: Math.floor((Math.random()*89)+10),
    //kilometersWalked: Math.floor(990/9),
    //timestamp: (new Date()).toLocaleString()
  
  
  
  return root
}

// Callback used to pass data out of the fetch
//const logData = data => console.log('Fetched and parsed', JSON.parse(trytesToAscii(data)), '\n')
//let x = 0
//while(x!=3){
publishAll()
//setInterval(publishAll, TIMEINTERVAL*100);
//x++
//}
  //.then(async root => {

 // Output asyncronously using "logData" callback function
  //await Mam.fetch(root, mode, secretKey, logData)

    // Output syncronously once fetch is completed
   //const result = await Mam.fetch(root, mode, secretKey)
   //result.messages.forEach(message => console.log('Fetched and parsed', JSON.parse(trytesToAscii(message)), '\n'))

    //console.log(`Verify with MAM Explorer:\n${mamExplorerLink}${root}\n`);
 //})

  

//Set view engine to ejs
//app.set("view engine", "ejs")

//Tell Express where we keep our index.ejs
//app.set("views", __dirname + "/views") 

//Use body-parser
//app.use(bodyParser.urlencoded({ extended: false }))

//Instead of sending Hello World, we render index.ejs
//app.get("/", (req, res) => { res.render("index", {kilometers: kilometersWalked, time: timestamp, steps: numberOfSteps }) }) 

//app.listen(8080, () => { console.log("Server online on http://localhost:8080"); }); 
