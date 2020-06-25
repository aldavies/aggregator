const fs = require("fs"),
  bittrex = require('@givanse/node-bittrex-api');

let bittrexStream = []

bittrex.websockets.client(function () {
  console.log('Websocket connected');
  bittrex.websockets.subscribe(['BTC-ETH'], (data) => {
    if (data.M === 'updateExchangeState') {
      data.A.forEach((data_for) => {
        bittrexStream.push(data_for)

        console.log('Market Update for ' + data_for.MarketName, data_for);
      });
    }
  });
});

/////////////////// Write to json file as an example to see data for bittrex. Remove this later
setInterval(() => {
  fs.writeFile("bittrexData.json", JSON.stringify(bittrexStream), () => {
    console.log('hi');
  });
}, 200);
/////////////////////////////////////////////////