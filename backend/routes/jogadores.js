const express = require("express");
const router = express.Router();
const db = require("../database/db");
const { autenticar } = require("../middlewares/auth");


router.get("/", autenticar, (req, res) => {
    const jogadores = db.prepare(`
    SELECT
      jogadores.*,
      times.nome AS time_nome
    FROM jogadores
    LEFT JOIN times
      ON jogadores.time_id = times.id
    WHERE jogadores.usuario_id = ?
  `).all(req.usuario.id);

    res.json(jogadores);
});

router.post("/", autenticar, (req, res) => {
    const {
        nickname,
        nome_real,
        idade,
        pais,
        funcao,
        time_id
    } = req.body;

    const existe = db.prepare(`
    SELECT id
    FROM jogadores
    WHERE LOWER(nickname) = LOWER(?) AND usuario_id = ?
    `).get(nickname, req.usuario.id);

    if (existe) {
        return res.status(400).json({
            error: "Já existe um jogador com esse nickname."
        });
    }

    const result = db.prepare(`
    INSERT INTO jogadores
    (usuario_id, nickname, nome_real, idade, pais, funcao, time_id)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).run(
        req.usuario.id,
        nickname,
        nome_real,
        idade,
        pais,
        funcao,
        time_id || null
    );

    res.json({
        id: result.lastInsertRowid
    });
});

router.put("/:id", autenticar, (req, res) => {
    const {
        nickname,
        nome_real,
        idade,
        pais,
        funcao,
        time_id
    } = req.body;

    db.prepare(`
    UPDATE jogadores
    SET
      nickname=?,
      nome_real=?,
      idade=?,
      pais=?,
      funcao=?,
      time_id=?
    WHERE id=? AND usuario_id=?
  `).run(
        nickname,
        nome_real,
        idade,
        pais,
        funcao,
        time_id || null,
        req.params.id,
        req.usuario.id
    );

    res.json({ success: true });
});

router.delete("/:id", autenticar, (req, res) => {
    db.prepare(
        "DELETE FROM jogadores WHERE id=? AND usuario_id=?"
    ).run(req.params.id, req.usuario.id);

    res.json({ success: true });
});

module.exports = router;