const express = require("express");
const router = express.Router();
const db = require("../database/db");
const { autenticar } = require("../middlewares/auth");

// Dashboard para o perfil "org" (Time/Organização)
router.get("/time", autenticar, (req, res) => {
    const usuarioId = req.usuario.id;

    const totalTimes = db.prepare(`SELECT COUNT(*) as total FROM times WHERE usuario_id = ?`).get(usuarioId).total;
    const totalJogadores = db.prepare(`SELECT COUNT(*) as total FROM jogadores WHERE usuario_id = ?`).get(usuarioId).total;

    // Nacionalidade dos jogadores
    const nacionalidades = db.prepare(`
        SELECT pais, COUNT(*) as total
        FROM jogadores
        WHERE usuario_id = ?
        GROUP BY pais
        ORDER BY total DESC
    `).all(usuarioId);

    res.json({
        totalTimes,
        totalJogadores,
        nacionalidades
    });
});

// Dashboard para o perfil "organizador"
router.get("/organizador", autenticar, (req, res) => {
    const usuarioId = req.usuario.id;

    const totalTorneios = db.prepare(`SELECT COUNT(*) as total FROM torneios WHERE usuario_id = ?`).get(usuarioId).total;
    const totalTimes = db.prepare(`SELECT COUNT(*) as total FROM times WHERE usuario_id = ?`).get(usuarioId).total;

    // Total de participantes (times) em todos os torneios do organizador
    const totalParticipantes = db.prepare(`
        SELECT COUNT(tt.time_id) as total
        FROM torneio_times tt
        INNER JOIN torneios t ON tt.torneio_id = t.id
        WHERE t.usuario_id = ?
    `).get(usuarioId).total;

    const ultimosTorneios = db.prepare(`
        SELECT id, nome, jogo, status
        FROM torneios
        WHERE usuario_id = ?
        ORDER BY id DESC
        LIMIT 5
    `).all(usuarioId);

    res.json({
        totalTorneios,
        totalTimes,
        totalParticipantes,
        ultimosTorneios
    });
});

module.exports = router;