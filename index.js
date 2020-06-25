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



