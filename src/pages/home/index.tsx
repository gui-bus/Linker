import { useEffect, useState } from "react";
import { Social } from "../../components/social";

import { FiFolder } from "react-icons/fi";
import { AiOutlineInstagram, AiOutlineGithub } from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";

import { db } from "../../services/firebaseConnection";
import {
  getDocs,
  collection,
  orderBy,
  query,
  doc,
  getDoc,
} from "firebase/firestore";

import logoImg from "../../../src/assets/logo.png";

interface LinkProps {
  id: string;
  name: string;
  url: string;
}

interface SocialLinkProps {
  instagram: string;
  twitter: string;
  linkedin: string;
  github: string;
}

export function Home() {
  const [links, setLinks] = useState<LinkProps[]>([]);
  const [socialLinks, setSocialLinks] = useState<SocialLinkProps>();

  useEffect(() => {
    function loadLinks() {
      const linksRef = collection(db, "Linker");
      const queryRef = query(linksRef, orderBy("created", "asc"));

      getDocs(queryRef)
        .then((snapshot) => {
          const list = [] as LinkProps[];

          snapshot.forEach((doc) => {
            list.push({
              id: doc.id,
              name: doc.data().name,
              url: doc.data().url,
            });
          });

          setLinks(list);
        })
        .catch(() => {});
    }

    loadLinks();
  }, []);

  useEffect(() => {
    function loadSocialLinks() {
      const docRef = doc(db, "Social", "link");
      getDoc(docRef).then((snapshot) => {
        if (snapshot.data() !== undefined) {
          setSocialLinks({
            instagram: snapshot.data()?.instagram,
            twitter: snapshot.data()?.twitter,
            linkedin: snapshot.data()?.linkedin,
            github: snapshot.data()?.github,
          });
        }
      });
    }

    loadSocialLinks();
  }, []);

  const sectionClasses =
    "border border-orangeLinker bg-transparent text-white mb-4 w-full py-2 rounded-lg select-none cursor-pointer font-medium transition-all duration-300 ease-in-out hover:bg-orangeLinker hover:text-neutral-900 hover:font-semibold ";

  return (
    <div className="flex flex-col w-full py-4 h-screen items-center justify-center cursor-default">
      <img src={logoImg} alt="Linker" className="w-52 h-auto my-8" />

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
        {links.map((link) => (
          <section key={link.id} className={sectionClasses}>
            <a href={link.url} target="_blank">
              <p className="text-base md:text-lg">{link.name}</p>
            </a>
          </section>
        ))}

        {socialLinks && Object.keys(socialLinks).length > 0 && (
          <footer className="flex justify-center gap-3 my-4">
            <Social url={socialLinks?.instagram}>
              <AiOutlineInstagram size={35} />
            </Social>

            <Social url={socialLinks?.twitter}>
              <RiTwitterXFill size={35} />
            </Social>

            <Social url={socialLinks?.linkedin}>
              <FaLinkedinIn size={35} />
            </Social>

            <Social url={socialLinks?.github}>
              <AiOutlineGithub size={35} />
            </Social>
          </footer>
        )}
      </main>
    </div>
  );
}
