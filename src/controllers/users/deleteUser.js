import {z} from "zod"
import User from '../../models/userModel.js'

const getSchema = z.object({
    id: z.string().uuid()
})

const deleteUser = async (req, res) => {
    const {id} = req.params
    const paramsValidation = getSchema.safeParse(req.params)
    if(!paramsValidation.success){
        res.status(400).json({
            message: "Id do user é inválido",
            error: paramsValidation.error
        })
        return
    }

    try{
        const linhasAfetadas = await User.destroy({where: {id: id},});
        if(linhasAfetadas <= 0){ 
            return res.status(404).json({message: "User não encontrado"})
        }
        
        res.status(200).json({message: "User deletado"})
    }catch(error){
        res.status(500).json({message: "Erro interno do servidor" + error})
    }
}

export default deleteUser