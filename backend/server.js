const express = require("express");
const cors = require("cors");

require("./database/db");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/times", require("./routes/times"));
app.use("/api/dashboard", require("./routes/dashboard"));
app.use("/api/torneios", require("./routes/torneios"));
app.use("/api/jogadores", require("./routes/jogadores"));



app.listen(3001, () => {
    console.log("API rodando em http://localhost:3001");
});