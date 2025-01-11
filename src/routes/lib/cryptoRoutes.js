import { Router } from "express";
import { controller } from "../../controllers/index.js";

const router = Router();


router.get('/stats', controller.GetStats);


export { router as CryptoRoutes };
