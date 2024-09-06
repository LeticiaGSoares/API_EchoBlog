import { z } from "zod"
import {formatZodError} from "../../helpers/index.js"
import Post from "../../models/postModel.js"

const createSchema = z.object({
    titulo: z
        .string()
        .min(3, {error: "O título deve ter pelo menos 3 caracteres"}),
    conteudo: z
        .string()
        .min(5, {error: "O conteúdo deve ter pelo menos 5 caracteres"}),
    autor: z
    .string()
    .min(3, {error: "O nome do autor deve ter pelo menos 3 caracteres"}),
})

const createPost = async (req, res) => {
    const {titulo, autor, conteudo} = req.body
    const bodyValidation = createSchema.safeParse(req.body)
    if(!bodyValidation.success){
        return res.status(400).json({
            message: "Erro interno do servidor",
            error: formatZodError(bodyValidation.error)
        })
    }

    const novoPost = {
        titulo,
        autor,
        conteudo,
    }

    try{
        await Post.create(novoPost)
        res.status(201).json({message: "Post criado com sucesso"})
    }catch (error){
        console.error(error)
        res.status(500).json({message: "Erro interno do servidor :" + error})
    }
}

export default createPost