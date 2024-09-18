import Post from "../../models/postModel.js"

const getAllPosts = async (req, res) => {
    const queryValues = req.query

    
    const page = parseInt(req.query.page) || 1
    const limit = 10
    const offset = (page - 1) * limit
    try{

        const posts = async () => {
            if(queryValues.contains('autor')){
                return await Post.findByPk(queryValues.autor)
            }else{
                return await Post.findAndCountAll({
                    limit,
                    offset
                })
            }
        }


        const totalPaginas = Math.ceil(posts.count / limit)
        res.status(200).json({
            totalposts: posts.count,
            totalPags: totalPaginas,
            pagAtual: page,
            itensPorPag: limit,
            ProximaPag: totalPaginas === 0 ? null : `http://localhost:3333/postagens?page=${page + 1}`,
            pagAnterior: page - 1 === 0 ? null : `http://localhost:3333/postagens?page=${page - 1}`,
            posts: posts.rows
        });
    }catch(error){
        res.status(500).json({message: "Erro interno do servidor: "+ error})
    }
}

export default getAllPosts