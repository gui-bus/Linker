import { FormEvent, useState, useEffect } from "react";
import { Input } from "../../components/input";
import { Header } from "../../components/header";

import { db } from "../../services/firebaseConnection";
import { setDoc, doc, getDoc } from "firebase/firestore";

import { BiLink } from "react-icons/bi";
import toast from "react-hot-toast";

export function Networks() {
  const [instagramInput, setInstagramInput] = useState("");
  const [twitterInput, setTwitterInput] = useState("");
  const [linkedinInput, setLinkedinInput] = useState("");
  const [githubInput, setGithubInput] = useState("");

  useEffect(() => {
    function loadLinks() {
      const docRef = doc(db, "Social", "link");
      getDoc(docRef).then((snapshot) => {
        if (snapshot.data() !== undefined) {
          setInstagramInput(snapshot.data()?.instagram);
          setTwitterInput(snapshot.data()?.twitter);
          setLinkedinInput(snapshot.data()?.linkedin);
          setGithubInput(snapshot.data()?.github);
        }
      });
    }

    loadLinks();
  }, []);

  function handleRegister(e: FormEvent) {
    e.preventDefault();

    setDoc(doc(db, "Social", "link"), {
      instagram: instagramInput,
      twitter: twitterInput,
      linkedin: linkedinInput,
      github: githubInput,
    })
      .then(() => {
        toast.success("Cadastrado com sucesso!");
      })
      .catch((error) => {
        console.log("Erro ao cadastrar: " + error);
        toast.error("Erro ao cadastrar!");
      });
  }

  return (
    <div className="flex flex-col min-h-screen items-center pb-7 px-2">
      <Header />
      <h2 className="font-bold text-white my-4 text-2xl">Redes sociais</h2>

      <form
        className="flex flex-col my-5 w-full max-w-xl px-5 sm:px-0"
        onSubmit={handleRegister}
      >
        <label className="font-medium my-1 text-white text-center">
          Instagram
        </label>
        <Input
          placeholder="Digite a URL do link"
          value={instagramInput}
          onChange={(e) => setInstagramInput(e.target.value)}
          type="url"
        />

        <label className="font-medium my-1 text-white text-center">
          Twitter
        </label>
        <Input
          placeholder="Digite a URL do link"
          value={twitterInput}
          onChange={(e) => setTwitterInput(e.target.value)}
          type="url"
        />

        <label className="font-medium my-1 text-white text-center">
          LinkedIn
        </label>
        <Input
          placeholder="Digite a URL do link"
          value={linkedinInput}
          onChange={(e) => setLinkedinInput(e.target.value)}
          type="url"
        />

        <label className="font-medium my-1 text-white text-center">
          Github
        </label>
        <Input
          placeholder="Digite a URL do link"
          value={githubInput}
          onChange={(e) => setGithubInput(e.target.value)}
          type="url"
        />

        <button
          type="submit"
          className="flex items-center justify-center gap-2 h-9 bg-orangeLinker rounded-md border-0 text-white font-medium transition-all duration-300 ease-in-out hover:bg-orangeLinkerHover mt-2"
        >
          Cadastrar <BiLink size={20} />
        </button>
      </form>
    </div>
  );
}
