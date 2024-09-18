import { DataTypes } from "sequelize";
import conn from "../config/conn.js";

import User from "./usersModel.js";
import Post from "./postagensModel.js";

const Comment = conn.define("comments", {
    comment: {
        type: DataTypes.STRING,
        allowNull: false,
    },
},
{
    tableName: "comments"
})

//associação N:M
User.belongsToMany(Post, {through: 'comments'})
Post.belongsToMany(User, {through: 'comments'})

export default Comment