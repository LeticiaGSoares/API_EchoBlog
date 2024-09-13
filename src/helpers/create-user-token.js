import jwt from "jsonwebtoken"

const createUserToken = async (usuario, req, res) => {
    
    const token = jwt.sign({
        nome: usuario.nome,
        id: usuario.id,
        papel: usuario.papel,
    }, process.env.JWT_SECRET)

    res.json({
        message: "Você está logado",
        token: token,
        id: usuario.id
    })
}

export default createUserToken