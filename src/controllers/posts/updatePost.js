import Post from "../../models/postModel.js"
import { z } from "zod"
import {formatZodError} from "../../helpers/index.js"

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

const updatePost = async (req, res) => {
    const {id} = req.params
    const {titulo, autor, conteudo} = req.body

    const bodyValidation = createSchema.safeParse(req.body)
    if(!bodyValidation.success){
        return res.status(500).json({
            message: "Erro interno do servidor",
            error: formatZodError(bodyValidation.error)
        })
    }
    
    const updatedPost = {
        titulo,
        autor,
        conteudo,
    } 
    
    try{
        const [linhasAfetadas] = await Post.update(updatedPost, {where : {id: id}})
        if(linhasAfetadas <= 0){ 
            return res.status(404).json({message: "Post não encontrado"})
        }
        
        res.status(200).json({message: "Post atualizado"})
    }catch(error){
        res.status(500).json({message: "Erro interno do seridor" + error});
    }
}

export default updatePost