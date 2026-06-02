const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../database/db");
const { JWT_SECRET } = require("../config");

// /-/-/ CADASTRO /-/-/
router.post("/register", (req, res) => {
    const { nome, email, senha, papel } = req.body;

    if (!nome || !email || !senha || !papel) {
        return res.status(400).json({ erro: "Todos os campos são obrigatórios." });
    }

    if (!["org", "organizador"].includes(papel)) {
        return res.status(400).json({ erro: "Papel inválido. Use 'org' ou 'organizador'." });
    }

    const usuarioExistente = db.prepare("SELECT id FROM usuarios WHERE email = ?").get(email);
    if (usuarioExistente) {
        return res.status(409).json({ erro: "E-mail já cadastrado." });
    }

    const senhaHash = bcrypt.hashSync(senha, 10);
    const result = db.prepare(
        "INSERT INTO usuarios (nome, email, senha, papel) VALUES (?, ?, ?, ?)"
    ).run(nome, email, senhaHash, papel);

    res.status(201).json({ id: result.lastInsertRowid, nome, email, papel });
});

// /-/-/ LOGIN /-/-/
router.post("/login", (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({ erro: "E-mail e senha são obrigatórios." });
    }

    const usuario = db.prepare("SELECT * FROM usuarios WHERE email = ?").get(email);
    if (!usuario) {
        return res.status(401).json({ erro: "Credenciais inválidas." });
    }

    const senhaValida = bcrypt.compareSync(senha, usuario.senha);
    if (!senhaValida) {
        return res.status(401).json({ erro: "Credenciais inválidas." });
    }

    const token = jwt.sign(
        { id: usuario.id, nome: usuario.nome, papel: usuario.papel },
        JWT_SECRET,
        { expiresIn: "8h" }
    );

    res.json({ token, nome: usuario.nome, papel: usuario.papel });
});

module.exports = router;