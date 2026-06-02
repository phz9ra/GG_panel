const express = require("express");
const router = express.Router();
const db = require("../database/db");
const { autenticar, apenasOrg } = require("../middlewares/auth");


router.get("/", autenticar, (req, res) => {
    const times = db.prepare(
        "SELECT * FROM times WHERE usuario_id = ? ORDER BY nome"
    ).all(req.usuario.id);

    res.json(times);
});

router.post("/", autenticar, (req, res) => {
    const { nome, tag, jogo, cor } = req.body;

    if (!nome || !tag || !jogo) {
        return res.status(400).json({ error: "Nome, TAG e Jogo são obrigatórios." });
    }

    const result = db.prepare(`
    INSERT INTO times
    (usuario_id, nome, tag, jogo, cor)
    VALUES (?, ?, ?, ?, ?)
  `).run(
        req.usuario.id,
        nome,
        tag,
        jogo,
        cor || "#9d4edd"
    );

    res.json({
        id: result.lastInsertRowid
    });
});

router.put("/:id", autenticar, (req, res) => {
    const { nome, tag, jogo, cor } = req.body;

    if (!nome || !tag || !jogo) {
        return res.status(400).json({ error: "Nome, TAG e Jogo são obrigatórios." });
    }

    db.prepare(`
    UPDATE times
    SET nome=?, tag=?, jogo=?, cor=?
    WHERE id=? AND usuario_id=?
  `).run(
        nome,
        tag,
        jogo,
        cor || "#9d4edd",
        req.params.id,
        req.usuario.id
    );

    res.json({ success: true });
});

router.delete("/:id", autenticar, (req, res) => {
    db.prepare("DELETE FROM times WHERE id=? AND usuario_id=?").run(req.params.id, req.usuario.id);
    res.json({ success: true });
});

module.exports = router;