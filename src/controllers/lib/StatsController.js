import { CryptoStats } from "../../models/lib/cryptoModel.js"

const GetStats =async(req,res)=>{
    const {coin}= req.query;

    if(!coin){
        return res.status(400).json({error:`coin parameter is required`});
    }

    try {
        const stats = await CryptoStats.findOne({ coin }).sort({ createdAt: -1 }).limit(1); // Get the latest data

        if (!stats) {
          return res.status(404).json({ message: 'Data not found for the requested coin' });
        }
    
        return res.json({
          price: stats.price,
          marketCap: stats.marketCap,
          "24hChange": stats.change24h,
        });
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching data' });
    }
}
export  { GetStats };