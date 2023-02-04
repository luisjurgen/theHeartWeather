import { Router } from "express";
import { refresh_token } from "../controllers/refresh_token.js";

const router = Router();

router.get('/',refresh_token)


export {router}