import User from "../../models/userModel.js"
import {z} from "zod";

const loginSchema = z.object({
    email: z
        .string()
        .email("Esse email não é válido")
        .refine((value) => /^([A-Z0-9_+-]+\.?)*[A-Z0-9_+-]@([A-Z0-9][A-Z0-9-]*\.)+[A-Z]{2,}$/i.test(value ?? ""), 
        'Name should contain only alphabets'),
})

const loginAccount = async (req, res) => {
    const {email,} = req.body
    const bodyValidation = loginSchema.safeParse(req.body)
    if(!bodyValidation.success){
        return res.status(500).json({
            message: "Erro interno do servidor",
            error: formatZodError(bodyValidation.error)
        })
    }

    try{
        const user = await User.findOne({where: {email: email}})

        if (!user) {
            return res.status(404).json({message: `email ${email} não foi registrado` });
        } 

        res.status(200).json({message: user})
    }catch (error){
        res.status(500).json({message: "Erro interno do servidor" + error})
    }
}

export default loginAccount