import { Social } from "../../components/social";

import { FiFolder } from "react-icons/fi";
import { AiOutlineInstagram, AiOutlineGithub } from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";

import logoImg from "../../../src/assets/logo.png";
import { Link } from "react-router-dom";

export function Home() {
  const sectionClasses =
    "border border-orangeLinker bg-transparent text-white mb-4 w-full py-2 rounded-lg select-none cursor-pointer transition-all duration-300 ease-in-out hover:bg-orangeLinker hover:text-neutral-900 font-medium";

  return (
    <div className="flex flex-col w-full py-4 items-center justify-center cursor-default">
      <Link to="/admin">
        <img src={logoImg} alt="Linker" className="w-52 h-auto my-8" />
      </Link>

      <h1 className="md:text-4xl text-2xl font-bold text-white">
        Guilherme Bustamante
      </h1>
      <p className="text-white">Desenvolvedor front-end</p>

      <div className="h-px border-b border-white w-11/12 max-w-xl my-5"></div>

      <div className="flex items-center text-gray-50 mb-5">
        <span>Confira meus projetos</span>
        <FiFolder className="ml-2" />
      </div>

      <main className="flex flex-col w-11/12 max-w-xl text-center">
        <section className={sectionClasses}>
          <a>
            <p className="text-base md:text-lg">DriveX</p>
          </a>
        </section>

        <section className={sectionClasses}>
          <a>
            <p className="text-base md:text-lg">Delimix</p>
          </a>
        </section>

        <section className={sectionClasses}>
          <a>
            <p className="text-base md:text-lg">Weather Tracker</p>
          </a>
        </section>

        <section className={sectionClasses}>
          <a>
            <p className="text-base md:text-lg">James Webb Space Telescope</p>
          </a>
        </section>

        <footer className="flex justify-center gap-3 my-4">
          <Social url="https://www.instagram.com/guibus_dev/">
            <AiOutlineInstagram size={35} color="#fff" />
          </Social>

          <Social url="https://twitter.com/guibus_dev">
            <RiTwitterXFill size={35} color="#fff" />
          </Social>

          <Social url="https://www.linkedin.com/in/gui-bus/">
            <FaLinkedinIn size={35} color="#fff" />
          </Social>

          <Social url="https://github.com/gui-bus">
            <AiOutlineGithub size={35} color="#fff" />
          </Social>
        </footer>
      </main>
    </div>
  );
}
