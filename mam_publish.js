//const Mam = require('./lib/mam.client.js');
const Mam = require('@iota/mam')
const { asciiToTrytes } = require('@iota/converter')
const IOTA = require('iota.lib.js');
//const moment = require('moment');
//const iota = new IOTA({ provider: 'https://nodes.devnet.iota.org:443'});
//const { asciiToTrytes, trytesToAscii } = require('@iota/converter')
const mode = 'restricted'
const secretKey = 'VERYSECRETKEY'
const provider = 'https://nodes.devnet.iota.org'
//const provider = 'https://nodes.devnet.thetangle.org:443'
//const MODE = 'restricted'; // public, private or restricted
//const SIDEKEY = 'mysecret'; // Enter only ASCII characters. Used only in restricted mode
//const SECURITYLEVEL = 1; // 1, 2 or 3
//const TIMEINTERVAL  = 30; // seconds
let numberofSteps;
let kilometersWalked;
// Initialise MAM State
//takes node, seed and security level
//let mamState = Mam.init(iota, undefined, SECURITYLEVEL);
//const key = iota.utils.toTrytes(SIDEKEY);
//mamState = Mam.changeMode(mamState, MODE, key);
let mamState = Mam.init(provider)
// Set channel mode
mamState = Mam.changeMode(mamState, mode, secretKey)
// Set channel mode
//setting it to restricted mode
//if (MODE == 'restricted') {
//    const key = iota.utils.toTrytes(SIDEKEY);
 //   mamState = Mam.changeMode(mamState, MODE, key);
//} //else {
   // mamState = Mam.changeMode(mamState, MODE);
//}

// Publish data to the tangle
//const publish = async function(packet) {
const publish = async packet => {
        // Create MAM Payload - STRING OF TRYTES
        const trytes = asciiToTrytes(packet)
        const message = Mam.create(mamState, trytes)
         // Save new mamState
        mamState = message.state
         // Attach the payload
        await Mam.attach(message.payload, message.address, 3, 9)
        //await Mam.attach(message.payload, message.address)    
        console.log('Published', packet, '\n');
        console.log ('Root', message.root);
        console.log('Address', message.address);
        return message.root
    }

const generateJSON = function() {
 
    const dateTime = moment().utc().format('DD/MM/YYYY hh:mm:ss');
   // const numberofSteps = Math.floor((Math.random()*89)+10);
    //const kilometersWalked = numberofSteps/1312.3359580;
    //const json = {"Number of Steps": numberofSteps, "Kilometers Walked": kilometersWalked, "Date" : dateTime};
    return json;
}

const publishAll = async () => {
  const root = await publish({
    numberofSteps: Math.floor((Math.random()*89)+10),
    kilometersWalked: (9/81),
    message: 'Message from Alice',
    timestamp: (new Date()).toLocaleString()
  })

  await publish({
    numberofSteps: Math.floor((Math.random()*89)+10),
    kilometersWalked: (9/81),
    message: 'Message from Alice',
    timestamp: (new Date()).toLocaleString()
  })
  return root
}
//const publishAll = async () => {
  //  const root = await publish({
    //    numberofSteps: Math.floor((Math.random()*89)+10),
      //  kilometersWalked: (numberofSteps/1312.335),
        //message: 'Message from Alice',
        //timestamp: (new Date()).toLocaleString()
      //})

      //await publish({
        //numberofSteps: Math.floor((Math.random()*89)+10),
        //kilometersWalked: Math.floor(990/9),
        //message: 'Message from Alice',
        //timestamp: (new Date()).toLocaleString()
      //})

      //await publish({
//        numberofSteps: Math.floor((Math.random()*89)+10),
        //kilometersWalked: Math.floor(990/9),
        //message: 'Message from Alice',
        //timestamp: (new Date()).toLocaleString()
      //})

      //return root
    //const json = generateJSON();
    //console.log("json=",json);
    //const root = await publish(json);
    
    //const logData = data => console.log('Fetched and parsed', JSON.parse(trytesToAscii(data)), '\n')
    //console.log(`Number of Steps: ${json.numberofSteps}, Kilometers Walked: ${json.kilometersWalked}, root: ${root}`);
//}

publishAll()
// Start it immediately
//executeDataPublishing()
//setting interval
//setInterval(executeDataPublishing, TIMEINTERVAL*1000);
//console.log(`Verify with MAM Explorer:\n${mamExplorerLink}${root}\n`);
//setInterval(executeDataPublishing, TIMEINTERVAL);
