import conn from '../config/conn.js'
import { DataTypes } from 'sequelize'

import User from './userModel.js';

const Post = conn.define
("posts", {
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
    tableName: "posts",
})

User.hasMany(Post)
Post.belongsTo(User)

export default Post;