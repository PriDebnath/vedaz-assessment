
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
import { Request, Response} from "express"
import { errorHandler } from "../../utils/error-handler"
import { createUserShema, userSignInSchema } from "../user/schema"
import { getUsers } from "../user/service"

export const getUsersController = async (req: Request, res:Response)=>{
    try {
        const users = await getUsers()
        res.status(200).json(users)
    } catch (error) {        
        errorHandler({ response: res, error})
    }
}