import conn from '../config/conn.js'
import { DataTypes } from 'sequelize'

const User = conn.define
("users", {
    id: {
        type: DataTypes.UUID, 
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING, 
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false
    },
    papel: {
        type: DataTypes.ENUM,
        values: ["leitor", "autor", "administrador"]
    },
    imagem: {
        type: DataTypes.STRING,
        defaultValue: "voRzk6zb8gbh9jyfo81zA6IcOQr5+rbqWvKObmBEE4.jpg"
    },
}, {
    tableName: "users",
})

export default User;