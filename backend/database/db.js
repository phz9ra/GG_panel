const Database = require("better-sqlite3");
const path = require("path");

const db = new Database(path.join(__dirname, "ggpanel.db"));

db.exec(`
  CREATE TABLE IF NOT EXISTS times (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    usuario_id INTEGER,
    nome TEXT NOT NULL,
    tag TEXT NOT NULL,
    jogo TEXT NOT NULL,
    cor TEXT DEFAULT '#00ff88',
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
  );

  CREATE TABLE IF NOT EXISTS jogadores (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    usuario_id INTEGER,
    nickname TEXT NOT NULL,
    nome_real TEXT,
    idade INTEGER,
    pais TEXT,
    funcao TEXT,
    time_id INTEGER,
    FOREIGN KEY (time_id) REFERENCES times(id),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
  );

  CREATE TABLE IF NOT EXISTS torneios (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  usuario_id INTEGER,
  nome TEXT NOT NULL,
  jogo TEXT NOT NULL,
  data_inicio TEXT,
  data_fim TEXT,
  status TEXT DEFAULT 'Planejado',
  premiacao TEXT,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

CREATE TABLE IF NOT EXISTS torneio_times (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  torneio_id INTEGER,
  time_id INTEGER,

  FOREIGN KEY (torneio_id)
    REFERENCES torneios(id),

  FOREIGN KEY (time_id)
    REFERENCES times(id)
);

CREATE TABLE IF NOT EXISTS usuarios (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  senha TEXT NOT NULL,
  papel TEXT NOT NULL CHECK(papel IN ('org', 'organizador'))
);
`);

module.exports = db;