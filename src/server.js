import dotenv from 'dotenv';
import connectDB from './config/db.js';
import app from './app.js';
import './jobs/cryptoJob.js';

dotenv.config();

connectDB();

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
