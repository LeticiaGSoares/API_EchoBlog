import { Router } from "express";
import {createPost, getAllPosts, getPostById, updatePost, deletePost, uploadImage} from "../controllers/posts/index.js"
import { authenticateAdminAuthorToken } from "../helpers/index.js";


const router = Router()

router.post("", authenticateAdminAuthorToken, createPost)
router.get("", getAllPosts)
router.get("/:id", getPostById)
router.put("/:id", updatePost)
router.delete("/:id", deletePost)
router.post("/:id/imagem", uploadImage)

export default router