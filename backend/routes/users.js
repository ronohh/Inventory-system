import express from "express"
import {addUser} from "../controllers/userController.js"

const router = express.Router();

router.post('/add', addUser);

export default router;