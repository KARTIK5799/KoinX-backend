import { CryptoStats } from "../../models/lib/cryptoModel.js"
import { GetStandardDeviation } from "../../utils/helpers.js";

const GetDeviation = async (req, res) => {
  const { coin } = req.query;

  if (!coin) {
    return res.status(400).json({ error: 'Coin parameter is required' });
  }

  try {
    const records = await CryptoStats.find({ coin }).sort({ timestamp: -1 }).limit(100);
    if (records.length === 0) {
      return res.status(404).json({ message: 'No records found for the requested coin' });
    }

    const prices = records.flatMap(record => record.priceHistory);
    
    if (prices.length === 0) {
      return res.status(404).json({ message: 'No price history found for the requested coin' });
    }

    if (prices.length < 2) {
      return res.status(400).json({ message: 'Not enough data to calculate standard deviation. Wait for some time and try again after 2 hours.' });
    }

    const deviation = GetStandardDeviation(prices);

    return res.json({ deviation });
  } catch (error) {
    return res.status(500).json({ message: 'Error calculating deviation' });
  }
};

export { GetDeviation };
