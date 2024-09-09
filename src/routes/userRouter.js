import { Router } from "express";
import {createUser, loginAccount, getAllUsers, updateUser, updateUserRole, deleteUser} from "../controllers/users/index.js"

const router = Router()

router.post("/registro", createUser)
router.post("/login", loginAccount)
router.put("/:id", updateUser)
router.get("/", getAllUsers)
router.delete("/:id", deleteUser)
router.patch("/:id/papel", updateUserRole)

export default router