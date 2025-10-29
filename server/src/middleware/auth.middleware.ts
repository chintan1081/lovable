import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const AuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if(!token){
        res.status(411).json({
            success: false,
            data: null,
            message: "token doesn't exist"
        });
        return
    }

    const verify = jwt.verify(token, process.env.JWT_AUTH!);

    if(!verify){
        res.status(401).json({
            success: false,
            data: null,
            message: "token is not valid"
        });
        return;
    }
    console.log(verify);
    
    // next()
}

export default AuthMiddleware;