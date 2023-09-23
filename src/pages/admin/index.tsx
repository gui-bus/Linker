import { FormEvent, useState, useEffect } from "react";
import { Header } from "../../components/header";
import { Input } from "../../components/input";

import { Link } from "react-router-dom";

import { BiLink, BiTrash } from "react-icons/bi";

import { db } from "../../services/firebaseConnection";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
  doc,
  deleteDoc,
} from "firebase/firestore";
import toast from "react-hot-toast";

interface LinkProps {
  id: string;
  name: string;
  url: string;
}

export function Admin() {
  const [nameInput, setNameInput] = useState("");
  const [urlInput, setUrlInput] = useState("");

  const [links, setLinks] = useState<LinkProps[]>([]);

  useEffect(() => {
    const linkerRef = collection(db, "Linker");
    const queryRef = query(linkerRef, orderBy("created", "asc"));

    const unsub = onSnapshot(queryRef, (snapshot) => {
      const list = [] as LinkProps[];
      snapshot.forEach((doc) => {
        list.push({
          id: doc.id,
          name: doc.data().name,
          url: doc.data().url,
        });
      });

      setLinks(list);
    });

    return () => {
      unsub();
    };
  }, []);

  function handleRegister(e: FormEvent) {
    e.preventDefault();

    if (nameInput === "" || urlInput === "") {
      toast.error("Preencha todos os campos!");
      return;
    }

    addDoc(collection(db, "Linker"), {
      name: nameInput,
      url: urlInput,
      created: new Date(),
    })
      .then(() => {
        setNameInput("");
        setUrlInput("");
        toast.success("Link cadastrado com sucesso!");
      })
      .catch((error) => {
        console.log("Erro ao cadastrar link no banco de dados: " + error);
        toast.error("Erro ao cadastrar link!");
      });
  }

  async function handleDeleteLink(id: string) {
    const docRef = doc(db, "Linker", id);
    await deleteDoc(docRef);
    toast.success("Link removido!");
  }

  return (
    <div className="flex flex-col min-h-screen items-center pb-7 px-2">
      <Header />

      <form
        className="flex flex-col my-5 w-full max-w-xl px-5 sm:px-0"
        onSubmit={handleRegister}
      >
        <label className="font-medium my-1 text-white text-center">
          Título
        </label>
        <Input
          placeholder="Digite o título do link"
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
        />

        <label className="font-medium my-1 text-white text-center">URL</label>
        <Input
          placeholder="Digite a URL do link"
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
          type="url"
        />

        <button
          type="submit"
          className="flex items-center justify-center gap-2 h-9 bg-orangeLinker rounded-md border-0 text-white font-medium transition-all duration-300 ease-in-out hover:bg-orangeLinkerHover mt-2"
        >
          Cadastrar <BiLink size={20} />
        </button>

        <div className="h-px border-b border-white w-full mt-5"></div>
      </form>

      <h2 className="font-bold text-white mb-4 text-2xl">Meus links</h2>

      {links.map((link) => (
        <div
          className="flex items-center justify-center gap-2 w-11/12 max-w-xl mb-2"
          key={link.id}
        >
          <Link
            to="/"
            className="flex items-center justify-around w-11/12 max-w-xl border border-orangeLinker bg-transparent text-white py-2 rounded-lg select-none cursor-pointer transition-all duration-300 ease-in-out hover:bg-orangeLinker hover:text-neutral-900 font-medium"
          >
            <article>
              <p>{link.name}</p>
            </article>
          </Link>

          <button
            className="hover:animate-pulse"
            onClick={() => handleDeleteLink(link.id)}
          >
            <BiTrash size={28} color="#fff" />
          </button>
        </div>
      ))}
    </div>
  );
}
