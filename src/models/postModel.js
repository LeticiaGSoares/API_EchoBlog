import conn from '../config/conn.js'
import { DataTypes } from 'sequelize'

const table_mysql = "posts"

const Post = conn.define
(table_mysql, {
    id: {
        type: DataTypes.UUID, 
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    titulo: {
        type: DataTypes.STRING, 
        allowNull: false,
        required: true
    },
    conteudo: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true
    },
    autor: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true
    },
    image: {
        type: DataTypes.STRING
    }
}, {
    tableName: table_mysql,
})

export default Post;