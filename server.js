import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mysql from "mysql2/promise";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Conexão com banco usando variáveis do .env
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

// Teste de conexão
pool.getConnection()
  .then(conn => {
    console.log("✅ MySQL conectado!");
    conn.release();
  })
  .catch(err => {
    console.error("❌ Erro ao conectar no MySQL:", err);
  });

// Rota básica
app.get("/", (req, res) => {
  res.send("API do projeto-mobile funcionando! 🚀");
});

// LOGIN
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const [rows] = await pool.query(
      "SELECT * FROM usuarios WHERE username = ? AND password = ?",
      [username, password]
    );

    if (rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Usuário ou senha inválidos"
      });
    }

    return res.json({
      success: true,
      message: "Login realizado com sucesso!",
      user: rows[0]
    });
  } catch (err) {
    console.error("Erro no login:", err);
    return res.status(500).json({
      success: false,
      message: "Erro no servidor ao fazer login"
    });
  }
});

// CADASTRO
app.post("/register", async (req, res) => {
  const { nome, sobrenome, endereco, profissao, username, password } = req.body;

  try {
    // Verifica se username já existe
    const [existe] = await pool.query(
      "SELECT id FROM usuarios WHERE username = ?",
      [username]
    );

    if (existe.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Nome de usuário já cadastrado"
      });
    }

    await pool.query(
      "INSERT INTO usuarios (nome, sobrenome, endereco, profissao, username, password) VALUES (?, ?, ?, ?, ?, ?)",
      [nome, sobrenome, endereco, profissao, username, password]
    );

    return res.json({
      success: true,
      message: "Cadastro realizado com sucesso!"
    });
  } catch (err) {
    console.error("Erro no cadastro:", err);
    return res.status(500).json({
      success: false,
      message: "Erro no servidor ao cadastrar"
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});

