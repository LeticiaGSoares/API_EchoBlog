import { z } from "zod"
import {formatZodError} from "../../helpers/index.js"
import User from "../../models/userModel.js"

const createSchema = z.object({
    nome: z
        .string()
        .min(3, {error: "O título deve ter pelo menos 3 caracteres"}),
    email: z
        .string().email("Esse email não é válido")
        .refine((value) => /^([A-Z0-9_+-]+\.?)*[A-Z0-9_+-]@([A-Z0-9][A-Z0-9-]*\.)+[A-Z]{2,}$/i.test(value ?? ""), 
        'Name should contain only alphabets'),
    senha: z
        .string()
        .min(8, {error: "A senha deve ter de 8 a 16 caracteres"}),
    papel: z
        .enum(["leitor", "autor", "administrador"])
})



const createUser = async (req, res) => {
    const {nome, email, senha, papel} = req.body
    const bodyValidation = createSchema.safeParse(req.body)
    if(!bodyValidation.success){
        return res.status(400).json({
            message: "Erro interno do servidor",
            error: formatZodError(bodyValidation.error)
        })
    }

    const novoUser = {
        nome,
        email,
        senha, 
        papel,
    }


    try{
        await User.create(novoUser)
        res.status(201).json({message: "User criado com sucesso"})
    }catch (error){
        console.error(error)
        res.status(500).json({message: "Erro interno do servidor :" + error})
    }
}

export default createUser