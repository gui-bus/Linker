import { Link } from "react-router-dom";
import logoImg from "../../../src/assets/logo.png";

export function ErrorPage() {
  return (
    <div className="flex w-full min-h-screen justify-center items-center flex-col text-white">
      <img src={logoImg} alt="Linker" className="w-52 h-auto my-8" />
      <div className="mb-8 text-center px-4">
        <h1 className="font-bold text-2xl">Oops! Página não encontrada</h1>
        <p className="mt-2">A página que você está procurando não existe.</p>
      </div>

      <Link
        to="/"
        className="flex items-center justify-center gap-2 h-9 bg-orangeLinker rounded-md border-0 font-medium w-11/12 max-w-lg px-4 py-2 my-4 transition-all duration-300 ease-in-out hover:bg-orangeLinkerHover"
      >
        Voltar para a página inicial
      </Link>
    </div>
  );
}
