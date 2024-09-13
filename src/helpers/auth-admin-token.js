import jwt from "jsonwebtoken";

export const authenticateAdminToken = async (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        req.user = decoded;

        if(!decoded) {
            return res.status(401).json({ message: "Você não está autorizado" })
        }

        if(decoded.papel !== "administrador"){
            return res.status(401).json({ message: "Você não está autorizado" })
        }

        next();
    });
};
