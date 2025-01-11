import cron from 'node-cron';
import axios from 'axios';
import { CryptoStats } from '../models/lib/cryptoModel.js';

async function fetchCryptoData() {
  try {
    const coins = ['bitcoin', 'matic-network', 'ethereum'];
    for (const coin of coins) {
      const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${coin}&vs_currencies=usd&include_market_cap=true&include_24hr_change=true`);
      const data = response.data[coin];

      const cryptoStats = {
        coin,
        price: data.usd,
        marketCap: data.usd_market_cap,
        change24h: data.usd_24h_change,
      };

      await CryptoStats.findOneAndUpdate(
        { coin },
        { $set: cryptoStats },
        { upsert: true, new: true }
      );

      console.log(`${coin} data saved/updated`);
    }
  } catch (error) {
    console.error('Error fetching crypto data:', error);
  }
}

fetchCryptoData();

cron.schedule('0 */2 * * *', fetchCryptoData);
// cron.schedule('*/5 * * * *', fetchCryptoData);

console.log('Crypto job scheduled to run every 2 hours');
