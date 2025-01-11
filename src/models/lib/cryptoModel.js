import mongoose from 'mongoose';

const cryptoStatsSchema = new mongoose.Schema({
  coin: { type: String, required: true, enum: ['bitcoin', 'matic-network', 'ethereum'] },
  price: { type: Number, required: true },
  marketCap: { type: Number, required: true },
  priceHistory: { type: [Number], default: []},
  change24h: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now }
});


export const CryptoStats = mongoose.model('CryptoStats', cryptoStatsSchema);
