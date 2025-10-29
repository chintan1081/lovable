import { Router } from "express";
import AppDataSource from "../config/db.config";
import { User } from "../entities/user.entity";
import bcrypt from "bcrypt";
import { signInSchema } from "../types";
import jwt from "jsonwebtoken";
const router = Router();

const userRepositry = AppDataSource.getRepository(User);
router.post('/signin', async (req, res) => {
    const { data, success } = signInSchema.safeParse(req.body);

    if (!success && !data) {
        res.status(411).json({
            success: false,
            data: null,
            message: "Incorrect input parameters"
        });
        return
    }

    const user = await userRepositry.findOne({
        where: {
            email: data.email,
        }
    });

    if (!user) {
        res.status(401).json({
            success: false,
            message: "user doesn't exist",
            data: null
        })
        return;
    }

    const verifyPassword = bcrypt.compare(data.password, user.password);
    if (!verifyPassword) {
        res.status(401).json({
            success: false,
            data: null,
            message: "email or password incorrect."
        })
    }

    const token = jwt.sign({
        email: user.email,
        userId: user.id
    }, process.env.JWT_Auth!)

    res.status(200).json({
        success: true,
        message: "User signedin successfully!",
        data: {
            token
        }
    })

});

router.post('/signup', async (req, res) => {
    const { data, success } = signInSchema.safeParse(req.body);
    if (!success && !data) {
        res.status(400).json({
            success: false,
            data: null,
            message: "Incorrect input parameters"
        });
        return
    }

    const userExist = await userRepositry.findOne({ where: { email: data.email } });

    if (userExist) {
         res.status(400).json({
            success: false,
            data: null,
            message: "Email already exist"
        });
        return;
    }

    const hashPassword = await bcrypt.hash(data.password, 0);
    const user = userRepositry.create({
        email: data.email,
        password: hashPassword
    });
    
    await userRepositry.save(user);
    res.status(200).json({
        success: true,
        message: "User created Successfully"
    });
})

export default router;