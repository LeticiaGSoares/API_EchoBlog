import { DataTypes } from "sequelize";
import conn from "../config/conn.js";

import Post from "./postagensModel.js";

const Like = conn.define("likes", {
    like: {
        type: DataTypes.STRING,
        allowNull: false,
    },
},
{
    tableName: "likes"
})

Post.hasMany(Like)
Like.belongsTo(Post)

export default Like