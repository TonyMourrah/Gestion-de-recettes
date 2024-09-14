const jwt = require('jsonwebtoken');
const User = require('../models/users');

const requireAuth = async (req, res, next) => {

    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ error: "Le token d'authorisation est requis " });
    }

    const token = authorization.split(' ')[1];

    try {
        const { _id } = jwt.verify(token, process.env.JWT_SECRET);

        console.log(_id);
        req.user = await User.findById({ _id }).select('_id');
        console.log(req.user);
        next();

    } catch (err) {
        console.log(err);
        return res.status(401).json({ error: "La requete n'est pas autorise" });
    }
}

module.exports = requireAuth;