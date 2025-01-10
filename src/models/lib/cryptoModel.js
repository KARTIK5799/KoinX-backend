import mongoose from 'mongoose';



const cryptoSchema = new mongoose.Schema({
    coin:{
        type:String,
        required:true,
        enum:['bitcoin','matic-network','ethereum'],
    },
    price: {
        type: Number,
        required: true,
      },
      marketCap: {
        type: Number,
        required: true,
      },
      change24h: {
        type: Number,
        required: true,
      },
      timestamp: {
        type: Date,
        default: Date.now, 
      },
    });
    

    const Crypto = mongoose.model('Crypto',cryptoSchema);

    export default Crypto;