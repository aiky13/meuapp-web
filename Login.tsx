import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SERVER_URL = "https://meuapp-api.up.railway.app";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await fetch(`${SERVER_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      alert(data.message);

      // Se o backend devolver algo tipo { success: true }, você pode redirecionar:
      // if (data.success) navigate("/alguma-rota");
    } catch (error) {
      alert("Erro ao conectar ao servidor");
      console.error(error);
    }
  };

  return (
    <div className="form">
      <h2>Login</h2>
      <input
        placeholder="Usuário"
        value={username}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setUsername(e.target.value)
        }
      />
      <input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setPassword(e.target.value)
        }
      />
      <button onClick={handleLogin}>Entrar</button>
      <p>
        Não tem conta?{" "}
        <a onClick={() => navigate("/cadastro")} style={{ cursor: "pointer" }}>
          Cadastre-se
        </a>
      </p>
    </div>
  );
}
