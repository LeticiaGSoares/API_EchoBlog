import User from "../../models/userModel.js"
import { z } from "zod"
import {formatZodError} from "../../helpers/index.js"

const getSchema = z.object({
    id: z.string().uuid()
})

const updateSchema = z.object({
    nome: z
        .string()
        .min(3, {error: "O título deve ter pelo menos 3 caracteres"}),
    email: z
        .string()
        .email("Esse email não é válido")
        .refine((value) => /^([A-Z0-9_+-]+\.?)*[A-Z0-9_+-]@([A-Z0-9][A-Z0-9-]*\.)+[A-Z]{2,}$/i.test(value ?? ""), 
        'Name should contain only alphabets'),
    senha: z
        .string()
        .min(8, {error: "A senha deve ter de 8 a 16 caracteres"})
})

const updateUser = async (req, res) => {
    const {id} = req.params

    const paramsValidation = getSchema.safeParse(req.params)
    if(!paramsValidation.success){
        res.status(400).json({
            message: "Id do user é inválido",
            error: paramsValidation.error
        })
        return
    }

    const {nome, email, senha} = req.body
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

export default updateUser