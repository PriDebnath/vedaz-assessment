import { Router } from "express";
import {  getUsersController } from "./controller";
import { validateJwt } from "../../middleware/validate-jwt";

const router =  Router()

/**
 * @swagger
 *   /api/v1/users/:
 *   get:
 *     responses: #@important to see response in ui.
 *       200:
 *         description: success
 */
router.get("/", getUsersController )
   
export { router }