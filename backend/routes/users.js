import express from "express"
import {addUser, getUsers, getUser, deleteUser, updateUserProfile} from "../controllers/userController.js"
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post('/add', addUser);
router.get('/', getUsers);
router.get('/profile',authMiddleware,  getUser)
router.put('/profile', authMiddleware, updateUserProfile )
router.delete('/:id', deleteUser)

export default router;