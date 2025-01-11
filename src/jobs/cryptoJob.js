import cron from 'node-cron';
import axios from 'axios';
import { CryptoStats } from '../models/lib/cryptoModel.js';

async function fetchCryptoData() {
  try {
    const coins = ['bitcoin', 'matic-network', 'ethereum'];

    for (const coin of coins) {
      const existingCrypto = await CryptoStats.findOne({ coin }).sort({ timestamp: -1 }); // Get the most recent data

      if (!existingCrypto) {
        const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${coin}&vs_currencies=usd&include_market_cap=true&include_24hr_change=true`);
        const data = response.data[coin];

        await CryptoStats.create({
          coin,
          price: data.usd,
          marketCap: data.usd_market_cap,
          change24h: data.usd_24h_change,
          priceHistory: [data.usd],
          timestamp: new Date(), 
        });

        console.log(`${coin} data saved as a new entry`);
      } else {
        const currentTime = new Date();
        const lastUpdateTime = new Date(existingCrypto.timestamp);
        const timeDifference = (currentTime - lastUpdateTime) / (1000 * 60 * 60);

        if (timeDifference >= 2) {
          const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${coin}&vs_currencies=usd&include_market_cap=true&include_24hr_change=true`);
          const data = response.data[coin];

          existingCrypto.priceHistory.push(data.usd);
          if (existingCrypto.priceHistory.length > 100) {
            existingCrypto.priceHistory.shift();
          }

          existingCrypto.price = data.usd;
          existingCrypto.marketCap = data.usd_market_cap;
          existingCrypto.change24h = data.usd_24h_change;
          existingCrypto.timestamp = new Date();

          await existingCrypto.save();
          // console.log(`${coin} data updated with new price history`);
        } else {
          console.log(`${coin} data not updated, last update was less than 2 hours ago`);
        }
      }
    }
  } catch (error) {
    console.error('Error fetching crypto data:', error);
  }
}


fetchCryptoData();


cron.schedule('0 */2 * * *', fetchCryptoData);

console.log('Crypto job scheduled to run every 2 hours');
