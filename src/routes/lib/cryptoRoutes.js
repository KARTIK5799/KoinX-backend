import { Router } from "express";
import { controller } from "../../controllers/index.js";

const router = Router();


router.get('/stats', controller.GetStats);
router.get('/deviation',controller.GetDeviation);

export { router as CryptoRoutes };
