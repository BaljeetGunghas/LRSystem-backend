import express from "express";
import { register, login, logout } from "../controllers/authController";

const router = express.Router();

router.get('/', (req, res) => {
    res.json({
        messge: 'hello'
    })
})
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

export default router;
