import express from "express"
import {addUser, getUsers, getUser, deleteUser} from "../controllers/userController.js"
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post('/add', addUser);
router.get('/', getUsers);
router.get('/profile',authMiddleware,  getUser)
router.delete('/:id', deleteUser)

export default router;