import Post from "../../models/postModel.js"
import {z} from "zod";

const getSchema = z.object({
    id: z.string().uuid()
})

const getPostById = async (req, res) => {
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
        const post = await Post.findByPk(id)

        if (!post) {
            return res.status(404).json({message: `post ${id} não existe` });
        } 

        res.status(200).json({message: post})
    }catch (error){
        res.status(500).json({message: "Erro interno do servidor" + error})
    }
}

export default getPostById