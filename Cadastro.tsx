import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SERVER_URL = "https://meuapp-api.up.railway.app";

export default function Cadastro() {
  const [form, setForm] = useState({
    nome: "", sobrenome: "", endereco: "", profissao: "", username: "", password: "", confirmar: ""
  });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleCadastro = async () => {
    if (form.password !== form.confirmar) return alert("Senhas não coincidem!");

    try {
      const res = await fetch(${SERVER_URL}/register, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      alert(data.message);
      if (data.success) navigate("/");
    } catch {
      alert("Erro ao conectar ao servidor");
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
      <input name="password" type="password" placeholder="Senha" onChange={handleChange} />
      <input name="confirmar" type="password" placeholder="Confirmar senha" onChange={handleChange} />
      <button onClick={handleCadastro}>Cadastrar</button>
      <p>
        Já tem conta? <a onClick={() => navigate("/")}>Voltar ao login</a>
      </p>
    </div>
  );
}
