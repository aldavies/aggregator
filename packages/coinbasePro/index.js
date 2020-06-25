const fs = require("fs"),
  CoinbasePro = require('coinbase-pro')

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

/////////////////// Write to json file as an example to see data for coinbasePro. Remove this later
setInterval(() => {
  fs.writeFile("coinBaseProData.json", JSON.stringify(coinbaseproStream), () => {
    console.log('hi');
  });
}, 200);
/////////////////////////////////////////////////