const fs = require("fs"),
  CoinbasePro = require('coinbase-pro'),
  { PubSub } = require('@google-cloud/pubsub');

const topicName = 'coinbase_pro';
// const data = JSON.stringify({ foo: 'bar' });

const websocket = new CoinbasePro.WebsocketClient(['BTC-USD', 'ETH-USD']);
const pubSubClient = new PubSub();

let coinbaseproStream = []

// Creates a client; cache this for further use

async function publishMessageWithCustomAttributes(data) {
  // Publishes the message as a string, e.g. "Hello, world!" or JSON.stringify(someObject)
  const dataBuffer = Buffer.from(data);

  // Add two custom attributes, origin and username, to the message
  const customAttributes = {
    origin: 'nodejs-sample',
    username: 'gcp',
  };

  const messageId = await pubSubClient
    .topic(topicName)
    .publish(dataBuffer, customAttributes);
  console.log(`Message ${messageId} published.`);
}

// publishMessageWithCustomAttributes().catch(console.error);
websocket.on('message', data => {
  publishMessageWithCustomAttributes(JSON.stringify(data)).catch(console.error);
});
websocket.on('error', err => {
  /* handle error */
});
websocket.on('close', () => {

});

// /////////////////// Write to json file as an example to see data for coinbasePro. Remove this later
// setInterval(() => {
//   fs.writeFile("coinBaseProData.json", JSON.stringify(coinbaseproStream), () => {
//     console.log('hi');
//   });
// }, 200);
// /////////////////////////////////////////////////


// // Creates a client
// const storage = new Storage();

// async function uploadFile() {
//   // Uploads a local file to the bucket
//   await storage.bucket(bucketName).upload(filename, {
//     // Support for HTTP requests made with `Accept-Encoding: gzip`
//     gzip: true,
//     // By setting the option `destination`, you can change the name of the
//     // object you are uploading to a bucket.
//     metadata: {
//       // Enable long-lived HTTP caching headers
//       // Use only if the contents of the file will never change
//       // (If the contents will change, use cacheControl: 'no-cache')
//       cacheControl: 'public, max-age=31536000',
//     },
//   });

//   console.log(`${filename} uploaded to ${bucketName}.`);
// }

// uploadFile().catch(console.error);