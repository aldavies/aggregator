const exchanges = require("./cctx/ccxt.js"),
  fs = require("fs"),
  CoinbasePro = require('coinbase-pro'),
  bittrex = require('@givanse/node-bittrex-api');

// Grab all exchanges from cctx
let exchangeList = exchanges
fs.writeFile("exchanges.json", JSON.stringify(exchangeList), () => {
  console.log(exchangeList);
});
////////////////////////////////

//////////////////////////////// Coinbase
const websocket = new CoinbasePro.WebsocketClient(['BTC-USD', 'ETH-USD']);

let coinbaseproStream = []

websocket.on('message', data => {
  coinbaseproStream.push(data)
});
websocket.on('error', err => {
  /* handle error */
});
websocket.on('close', () => {

});
/////////////////////////////////////////////////

/////////////////// Write to json file as an example to see data for coinbasePro. Remove this later
setInterval(() => {
  fs.writeFile("coinBaseProData.json", JSON.stringify(coinbaseproStream), () => {
    console.log('hi');
  });
}, 200);
/////////////////////////////////////////////////

//////////////////// Bittrex
let bittrexStream = []

bittrex.websockets.client(function () {
  console.log('Websocket connected');
  bittrex.websockets.subscribe(['BTC-ETH'], (data) => {
    if (data.M === 'updateExchangeState') {
      data.A.forEach((data_for) => {
        bittrexStream.push()
        console.log('Market Update for ' + data_for.MarketName, data_for);
      });
    }
  });
});
//////////////////////////////////////////

/////////////////// Write to json file as an example to see data for bittrex. Remove this later
setInterval(() => {
  fs.writeFile("bittrexData.json", JSON.stringify(coinbaseproStream), () => {
    console.log('hi');
  });
}, 200);
/////////////////////////////////////////////////