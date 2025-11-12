// server.js (Backend Node.js/Express)
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

let db;

// Função para conectar ao MySQL
async function connectDB() {
  try {
    db = await mysql.createConnection({
      host: process.env.DB_HOST || "127.0.0.1",
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASS || "",
      database: process.env.DB_NAME || "projeto-mobile",
    });
    console.log("Banco de dados conectado ✅");
  } catch (err) {
    console.error("Erro fatal ao conectar ao banco:", err);
    process.exit(1); 
  }
}

// Inicia o servidor e a conexão com o DB
(async () => {
  await connectDB();

  // Rota de registro
  app.post("/register", async (req, res) => {
    // Extrai todos os campos do corpo da requisição
    const { username, fullName, email, telephone, password } = req.body;
    console.log("Registro recebido:", req.body);

    if (!username || !fullName || !email || !telephone || !password) {
      return res.status(400).json({ success: false, message: "Todos os campos devem ser preenchidos!" });
    }

    try {
      // 1. Verifica se o usuário (ou e-mail) já existe
      const [exists] = await db.execute(
        "SELECT id FROM usuarios WHERE username = ? OR email = ?",
        [username, email]
      );

      if (exists.length > 0) {
        return res.status(400).json({ success: false, message: "Usuário ou E-mail já existe!" });
      }
          
      // 2. Insere o novo usuário no banco de dados
      await db.execute(
        "INSERT INTO usuarios (username, full_name, email, telephone, password) VALUES (?, ?, ?, ?, ?)",
        [username, fullName, email, telephone, password]
      );

      res.json({ success: true, message: "Usuário cadastrado com sucesso!" });
    } catch (err) {
      console.error("Erro ao registrar usuário:", err);
      res.status(500).json({ success: false, message: "Erro interno do servidor ao tentar salvar o usuário." });
    }
  });

  // Rota de login (Deixei apenas para referência, mas a tela principal é de registro)
  app.post("/login", async (req, res) => {
    // Implemente sua lógica de login aqui (busca por username e comparação de senha)
    res.status(501).json({ success: false, message: "Rota de login não implementada." });
  });


  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
})();