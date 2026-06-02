const express = require("express");
const router = express.Router();
const db = require("../database/db");
const { autenticar } = require("../middlewares/auth");

router.get("/", autenticar, (req, res) => {

    const torneios = db.prepare(`
        SELECT *
        FROM torneios
        WHERE usuario_id = ?
        ORDER BY id DESC
    `).all(req.usuario.id);

    const resultado = torneios.map((torneio) => {

        const participantes = db.prepare(`
            SELECT
                times.id,
                times.nome,
                times.tag
            FROM torneio_times
            INNER JOIN times
                ON torneio_times.time_id = times.id
            WHERE torneio_times.torneio_id = ?
        `).all(torneio.id);

        return {
            ...torneio,
            participantes
        };
    });

    res.json(resultado);
});

router.post("/", autenticar, (req, res) => {

    const {
        nome,
        jogo,
        data_inicio,
        data_fim,
        status,
        premiacao,
        participantes
    } = req.body;

    const result = db.prepare(`
        INSERT INTO torneios
        (
            usuario_id,
            nome,
            jogo,
            data_inicio,
            data_fim,
            status,
            premiacao
        )
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(
        req.usuario.id,
        nome,
        jogo,
        data_inicio,
        data_fim,
        status,
        premiacao
    );

    const torneioId = result.lastInsertRowid;

    // Validate that selected times match tournament game
    if (participantes?.length) {
        const invalid = participantes.filter(timeId => {
            const time = db.prepare(`SELECT jogo FROM times WHERE id = ?`).get(timeId);
            return !time || time.jogo !== jogo;
        });
        if (invalid.length) {
            return res.status(400).json({ error: 'Alguns times selecionados não correspondem ao jogo do torneio.' });
        }
        const stmt = db.prepare(`
            INSERT INTO torneio_times
            (
                torneio_id,
                time_id
            )
            VALUES (?, ?)
        `);
        participantes.forEach((timeId) => {
            stmt.run(torneioId, timeId);
        });
    }

    res.json({
        success: true,
        id: torneioId
    });
});

router.put("/:id", autenticar, (req, res) => {

    const {
        nome,
        jogo,
        data_inicio,
        data_fim,
        status,
        premiacao,
        participantes
    } = req.body;

    db.prepare(`
        UPDATE torneios
        SET
            nome = ?,
            jogo = ?,
            data_inicio = ?,
            data_fim = ?,
            status = ?,
            premiacao = ?
        WHERE id = ? AND usuario_id = ?
    `).run(
        nome,
        jogo,
        data_inicio,
        data_fim,
        status,
        premiacao,
        req.params.id,
        req.usuario.id
    );

    db.prepare(`
        DELETE FROM torneio_times
        WHERE torneio_id = ?
    `).run(req.params.id);

    if (participantes?.length) {

        const stmt = db.prepare(`
            INSERT INTO torneio_times
            (
                torneio_id,
                time_id
            )
            VALUES (?, ?)
        `);

        participantes.forEach((timeId) => {
            stmt.run(req.params.id, timeId);
        });
    }

    res.json({
        success: true
    });
});

router.delete("/:id", autenticar, (req, res) => {

    // Ensure the tournament belongs to the user before deleting
    const torneio = db.prepare(`SELECT id FROM torneios WHERE id = ? AND usuario_id = ?`).get(req.params.id, req.usuario.id);
    if (!torneio) return res.status(404).json({ error: "Torneio não encontrado." });

    db.prepare(`
        DELETE FROM torneio_times
        WHERE torneio_id = ?
    `).run(req.params.id);

    db.prepare(`
        DELETE FROM torneios
        WHERE id = ?
    `).run(req.params.id);

    res.json({
        success: true
    });
});

module.exports = router;