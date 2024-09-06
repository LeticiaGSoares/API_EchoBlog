import {z} from "zod"
import Post from '../../models/postModel.js'

const getSchema = z.object({
    id: z.string().uuid()
})

const deletePost = async (req, res) => {
    const {id} = req.params
    const paramsValidation = getSchema.safeParse(req.params)
    if(!paramsValidation.success){
        res.status(400).json({
            message: "Id do post é inválido",
            error: paramsValidation.error
        })
        return
    }

    try{
        const linhasAfetadas = await Post.destroy({where: {id: id},});
        if(linhasAfetadas <= 0){ 
            return res.status(404).json({message: "Post não encontrado"})
        }
        
        res.status(200).json({message: "Post deletado"})
    }catch(error){
        res.status(500).json({message: "Erro interno do servidor" + error})
    }
}

export default deletePost