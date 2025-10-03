const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/cadastrar", (req, res) => {
  const { nome, email } = req.body;
  console.log("Novo cadastro:", nome, email);
  res.json({ mensagem: `Cadastro realizado com sucesso para ${nome}!` });
});

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});
