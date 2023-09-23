import { FiLogOut } from "react-icons/fi";
import { Link } from "react-router-dom";

import { auth } from "../../services/firebaseConnection";
import { signOut } from "firebase/auth";
import toast from "react-hot-toast";

const hoverClasses =
  "flex items-center gap-1 px-2 py-1 rounded-full transition-colors duration-300 ease-in-out hover:bg-orangeLinkerHover";

const buttonClasses =
  "flex items-center justify-center gap-2 px-2 py-1 rounded-full transition-colors duration-300 ease-in-out hover:bg-orangeLinkerHover";

export function Header() {
  async function handleLogout() {
    await signOut(auth);
    toast.success("Logout realizado com sucesso! \n Até a próxima 😁")
  }

  return (
    <header className="w-full max-w-2xl mt-4 px-2">
      <nav className="w-full bg-orangeLinker h-12 flex items-center justify-around rounded-md font-medium text-white">
        <div className="flex gap-4">
          <Link to="/" className={hoverClasses}>
            Home
          </Link>
          <Link to="/admin" className={hoverClasses}>
            Links
          </Link>
          <Link to="/admin/social" className={hoverClasses}>
            Social
          </Link>
        </div>

        <button className={buttonClasses} onClick={handleLogout}>
          <span className="hidden md:block">Logout</span>{" "}
          <FiLogOut size={24} color="#fff" />
        </button>
      </nav>
    </header>
  );
}
