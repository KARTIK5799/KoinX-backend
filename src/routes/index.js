import { CryptoRoutes } from './lib/cryptoRoutes.js';  
import { Router } from 'express';

const router = Router();

router.use('/', CryptoRoutes);

export default router;
