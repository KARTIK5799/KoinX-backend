import { Router } from "express";
import { controller } from "../../controllers/index.js";

const router = Router();

router.get('/give-msg', controller.GiveMsg);

export { router as CryptoRoutes };
