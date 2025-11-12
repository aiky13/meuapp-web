import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Rota básica para testar
app.get("/", (req, res) => {
  res.send("API funcionando! 🚀");
});

// Login
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Aqui entra a lógica real de autenticação
  return res.json({
    success: true,
    message: "Login realizado!",
    user: username
  });
});

// Cadastro
app.post("/register", (req, res) => {
  const { nome, sobrenome, endereco, profissao, username, password } = req.body;

  // Salvar no banco (quando você tiver um)
  console.log("Novo usuário cadastrado:", {
    nome,
    sobrenome,
    endereco,
    profissao,
    username,
    password
  });

  return res.json({
    success: true,
    message: "Cadastro concluído com sucesso!"
  });
});

// Porta (Railway gerencia automaticamente)
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
