import express from "express"
import {addUser, getUsers, deleteUser} from "../controllers/userController.js"

const router = express.Router();

router.post('/add', addUser);
router.get('/', getUsers);
router.delete('/:id', deleteUser)

export default router;