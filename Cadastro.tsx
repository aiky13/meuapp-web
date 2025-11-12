import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SERVER_URL = "https://meuapp-api.up.railway.app";

type FormState = {
  nome: string;
  sobrenome: string;
  endereco: string;
  profissao: string;
  username: string;
  password: string;
  confirmar: string;
};

export default function Cadastro() {
  const [form, setForm] = useState<FormState>({
    nome: "",
    sobrenome: "",
    endereco: "",
    profissao: "",
    username: "",
    password: "",
    confirmar: "",
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCadastro = async () => {
    if (form.password !== form.confirmar) {
      alert("Senhas não coincidem!");
      return;
    }

    // Se você não quiser enviar "confirmar" para o backend:
    const payload = {
      nome: form.nome,
      sobrenome: form.sobrenome,
      endereco: form.endereco,
      profissao: form.profissao,
      username: form.username,
      password: form.password,
    };

    try {
      const res = await fetch(`${SERVER_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      alert(data.message);

      if (data.success) {
        navigate("/");
      }
    } catch (error) {
      alert("Erro ao conectar ao servidor");
      console.error(error);
    }
  };

  return (
    <div className="form">
      <h2>Cadastro</h2>
      <input name="nome" placeholder="Nome" onChange={handleChange} />
      <input name="sobrenome" placeholder="Sobrenome" onChange={handleChange} />
      <input name="endereco" placeholder="Endereço" onChange={handleChange} />
      <input name="profissao" placeholder="Profissão" onChange={handleChange} />
      <input name="username" placeholder="Usuário" onChange={handleChange} />
      <input
        name="password"
        type="password"
        placeholder="Senha"
        onChange={handleChange}
      />
      <input
        name="confirmar"
        type="password"
        placeholder="Confirmar senha"
        onChange={handleChange}
      />
      <button onClick={handleCadastro}>Cadastrar</button>
      <p>
        Já tem conta?{" "}
        <a onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
          Voltar ao login
        </a>
      </p>
    </div>
  );
}

