import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logoImg from "../../../src/assets/logo.png";

import { Input } from "../../components/input";
import { FiLogIn } from "react-icons/fi";

import { auth } from "../../services/firebaseConnection";
import { signInWithEmailAndPassword } from "firebase/auth";
import toast from "react-hot-toast";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (email === "" || password === "") {
      alert("Preencha todos os campos");
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        console.log("Logado com sucesso");
        toast.success("Logado com sucesso!");
        navigate("/admin", { replace: true });
      })
      .catch((error) => {
        console.log("Erro ao fazer login: " + error);
        toast.error("Credenciais invalidas!");
      });
  }

  return (
    <div className="flex w-full h-screen items-center justify-center flex-col">
      <Link to="/">
        <img src={logoImg} alt="Linker" className="w-52 h-auto my-5" />
      </Link>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl flex flex-col px-4"
      >
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Digite o seu e-mail"
        />

        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Digite a sua senha"
        />

        <button
          type="submit"
          className="flex items-center justify-center gap-2 h-9 bg-orangeLinker rounded-md border-0 text-white font-medium transition-all duration-300 ease-in-out hover:bg-orangeLinkerHover"
        >
          Acessar <FiLogIn size={20} />
        </button>
      </form>
    </div>
  );
}
