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

    const user : any = jwt.verify(token, process.env.JWT_AUTH!);

    if(!user){
        res.status(401).json({
            success: false,
            data: null,
            message: "token is not valid"
        });
        return;
    }
    (req as any).userId = user.userId;
    next()
}

export default AuthMiddleware;