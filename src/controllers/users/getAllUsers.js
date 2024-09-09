import User from "../../models/userModel.js"

const getAllUsers = async (req, res) => {
    const page = parseInt(req.query.page) || 1
    const limit = 10
    const offset = (page - 1) * limit
    try{
        const users = await User.findAndCountAll({
            limit,
            offset
        })

        const totalPaginas = Math.ceil(users.count / limit)
        res.status(200).json({
            totalUsers: users.count,
            totalPags: totalPaginas,
            pagAtual: page,
            itensPorPag: limit,
            ProximaPag: totalPaginas === 0 ? null : `http://localhost:3333/usuarios?page=${page + 1}`,
            pagAnterior: page - 1 === 0 ? null : `http://localhost:3333/usuarios?page=${page - 1}`,
            users: users.rows
        });
    }catch(error){
        res.status(500).json({message: "Erro interno do servidor: "+ error})
    }
}

export default getAllUsers