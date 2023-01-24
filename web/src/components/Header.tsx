import logoImage from "../assets/logo.svg";
import { Plus } from "phosphor-react";

function Header() {
  return (
    <div className="w-full max-w-3xl mx-auto flex items-center justify-between">
      <img src={logoImage} alt="habits"></img>
      <button
        type="button"
        className="border border-violet-500 font-semibold py-4 px-6 rounded-lg flex items-center gap-3 hover:border-violet-300"
      >
        <Plus size={20} className="text-violet-500" />
        Novo hábito
      </button>
    </div>
  );
}

export default Header;
