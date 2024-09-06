import { Router } from "express";
import {createPost, getAllPosts, getPostById, updatePost, deletePost, uploadImage} from "../controllers/posts/index.js"

const router = Router()

router.post("/postagens", createPost)
router.get("/postagens", getAllPosts)
router.get("/postagens/:id", getPostById)
router.put("/postagens/:id", updatePost)
router.delete("/postagens/:id", deletePost)
router.post("/postagens/:id/imagem", uploadImage)

export default router