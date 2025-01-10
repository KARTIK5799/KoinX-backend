import { CryptoRoutes } from './lib/cryptoRoutes.js';  
import { Router } from 'express';

const router = Router();

router.use('/api', CryptoRoutes);

export default router;
