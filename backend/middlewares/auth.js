const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

function autenticar(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; // /-/-/ Bearer TOKEN /-/-/

    if (!token) {
        return res.status(401).json({ erro: "Token não fornecido." });
    }

    try {
        const payload = jwt.verify(token, JWT_SECRET);
        req.usuario = payload; // /-/-/ { id, nome, papel } /-/-/
        next();
    } catch {
        return res.status(403).json({ erro: "Token inválido ou expirado." });
    }
}

function apenasOrganizador(req, res, next) {
    if (req.usuario.papel !== "organizador") {
        return res.status(403).json({ erro: "Acesso restrito a organizadores." });
    }
    next();
}

function apenasOrg(req, res, next) {
    if (req.usuario.papel !== "org") {
        return res.status(403).json({ erro: "Acesso restrito a times/orgs." });
    }
    next();
}

module.exports = { autenticar, apenasOrganizador, apenasOrg };