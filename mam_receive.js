'use strict';
const Mam = require('../../Downloads/IOTAProject/mam.client.js-master/mam.client.js-master/lib/mam.client.js')
const { asciiToTrytes, trytesToAscii } = require('@iota/converter')
const mode = 'restricted'
const secretKey = 'VERYSECRETKEY'
//const provider = 'https://nodes.devnet.iota.org'
const IOTA = require('iota.lib.js');
const iota = new IOTA({ provider: 'https://nodes.devnet.iota.org:443'});
let root;
let key;
//let root;
// Check the arguments
const args = process.argv;
if(args.length !=3) {
  console.log('Missing root as argument: node mam_receive.js <root>');
  process.exit();
} else if(!iota.valid.isAddress(args[2])){
  console.log('You have entered an invalid root: '+ args[2]);
  process.exit(); } 
   else {
    root = args[2];
}
// Initialise MAM State
let mamState = Mam.init(iota)
mamState = Mam.changeMode(mamState, mode, secretKey)
// Set channel mode
//if (MODE == 'restricted') {
    //key = iota.utils.toTrytes(SIDEKEY);
  //  mamState = Mam.changeMode(mamState, MODE, key);
//} else {
  //  mamState = Mam.changeMode(mamState, MODE);
//}
const logData = data => console.log('Fetched and parsed', JSON.parse(trytesToAscii(data)), '\n')
// Receive data from the tangle
//const logData = data => console.log(trytesToAscii(data))

const execute = async (root) => {
    //await Mam.fetch(root, mode, secretKey, logData)
    const result = await Mam.fetch(root, mode, secretKey)
   result.messages.forEach(message => console.log('Fetched and parsed', JSON.parse(trytesToAscii(message)), '\n'))
    }
//const receiveall = async function(rootVal, secretKeyVal) {
    // Output asyncronously using "logData" callback function
  //    let resp = await Mam.fetch(rootVal, mode, secretKeyVal, function(data) {
        //await Mam.fetch(root, mode, secretkey, logData)
    //    result.messages.forEach(message => console.log('Fetched and parsed', JSON.parse(trytesToAscii(message)), '\n'))
      //})
    // Output syncronously once fetch is completed
      //const result = await Mam.fetch(root, mode, secretKey)
      //result.messages.forEach(message => console.log('Fetched and parsed', JSON.parse(trytesToAscii(message)), '\n'))
      //receiveall(resp.nextRoot, secretKeyVal);
    //}
//const executeDataRetrieval = async function(rootVal, keyVal) {
  //  let resp = await Mam.fetch(rootVal, MODE, keyVal, function(data) {
    //    await Mam.fetch(root, mode, secretKey, logData)

    // Output syncronously once fetch is completed
      //  const result = await Mam.fetch(root, mode, secretKey)
        //result.messages.forEach(message => console.log('Fetched and parsed', JSON.parse(trytesToAscii(message)), '\n'))
        //let json = JSON.parse(iota.utils.fromTrytes(data));
        //console.log(`Number of Steps: ${json.numberofSteps}, Kilometers Walked: ${json.kilometersWalked}`);
    //});

    //executeDataRetrieval(resp.nextRoot, keyVal);
//}

//receiveall(root, secretKey);
console.log('\n\nFETCHING DATA!!\n\n')
execute(root)
