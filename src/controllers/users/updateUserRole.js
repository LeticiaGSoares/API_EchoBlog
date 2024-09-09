import User from "../../models/userModel.js"
import { z } from "zod"
import {formatZodError} from "../../helpers/index.js"

const getSchema = z.object({
    id: z.string().uuid()
})

const updateSchema = z.object({
    papel: z
        .enum(["leitor", "autor", "administrador"])
})

const updateUserRole = async (req, res) => {
    const {id} = req.params
    
    const paramsValidation = getSchema.safeParse(req.params)
    if(!paramsValidation.success){
        res.status(400).json({
            message: "Id do user é inválido",
            error: paramsValidation.error
        })
        return
    }

    const {nome, email, senha, papel} = req.body
    const bodyValidation = updateSchema.safeParse(req.body)
    if(!bodyValidation.success){
        return res.status(500).json({
            message: "Erro interno do servidor",
            error: formatZodError(bodyValidation.error)
        })
    }
    
    const updatedUser = {
        nome,
        email,
        senha, 
        papel,
    } 
    
    try{
        const [linhasAfetadas] = await User.update(updatedUser, {where : {id: id}})
        if(linhasAfetadas <= 0){ 
            return res.status(404).json({message: "User não encontrado"})
        }
        
        res.status(200).json({message: "User atualizado"})
    }catch(error){
        res.status(500).json({message: "Erro interno do seridor" + error});
    }
}

export default updateUserRole