import jwt from "jsonwebtoken"

const createUserToken = async (usuario, req, res) => {
    
    const token = jwt.sign({
        nome: usuario.username,
        id: usuario.usuario_id
    })

    res.json({
        message: "Você está logado",
        token: token,
        usuarioID: usuario.usuario_id
    })
}

export default createUserToken