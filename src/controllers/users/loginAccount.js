import User from "../../models/userModel.js"
import {z} from "zod";
import { createUserToken } from "../../helpers/index.js";

const loginSchema = z.object({
    email: z
        .string()
        .email("Esse email não é válido")
        .refine((value) => /^([A-Z0-9_+-]+\.?)*[A-Z0-9_+-]@([A-Z0-9][A-Z0-9-]*\.)+[A-Z]{2,}$/i.test(value ?? ""), 
        'Name should contain only alphabets'),
    senha: z
        .string()
        .min(8, {error: "A senha deve ter de 8 a 16 caracteres"}),
})

const loginAccount = async (req, res) => {
    const {email, senha} = req.body
    const bodyValidation = loginSchema.safeParse(req.body)
    if(!bodyValidation.success){
        return res.status(500).json({
            message: "Erro interno do servidor",
            error: formatZodError(bodyValidation.error)
        })
    }

    try{
        const user = await User.findOne({where: {email: email, senha: senha}})

        if (!user) {
            return res.status(404).json({message: `email ou senha inválidos` });
        } 

        createUserToken(user, req, res)
    }catch (error){
       return res.status(500).json({message: "Erro interno do servidor" + error})
    }
}

export default loginAccount