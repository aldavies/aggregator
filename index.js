const exchanges = require("./cctx/ccxt.js"),
  fs = require("fs");

// const hi = (async () => {
//   let kraken = new exchanges.coinbasepro();
//   let markets = await kraken.load_markets();
//   console.log(kraken.id, markets);
//   fs.writeFile("exchanges.json", JSON.stringify(markets), () => {
//     console.log(exchanges);
//   });
// })();
let exchangeList = exchanges
fs.writeFile("exchanges.json", JSON.stringify(exchangeList), () => {
  console.log(exchangeList);
});

const CoinbasePro = require('coinbase-pro');
const publicClient = new CoinbasePro.PublicClient();
const websocket = new CoinbasePro.WebsocketClient(['BTC-USD', 'ETH-USD']);
let hi = []
websocket.on('message', data => {
  hi.push(data)
});
websocket.on('error', err => {
  /* handle error */
});
websocket.on('close', () => {

});

setInterval(() => {
  fs.writeFile("data.json", JSON.stringify(hi), () => {
    console.log('hi');
  });
}, 200);

console.log(JSON.stringify(exchanges));
