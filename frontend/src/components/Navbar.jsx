import { useContext, useState } from "react";
import { UserContext } from "../context/AllContexts";
import { Link } from "react-router-dom";

import {
  Menu,
  X,
  NotebookPen,
} from "lucide-react";

const Navbar = () => {
  const { user } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-[#111111]/80 backdrop-blur-2xl">

  <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

    {/* Left */}
    <Link
      to="/"
      className="flex items-center gap-4"
    >

      {/* Logo */}
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-[#2a2a2a] via-[#4b4b4b] to-[#1a1a1a] shadow-lg">

        <NotebookPen
          size={26}
          className="text-gray-100"
        />
      </div>

      {/* Brand */}
      <div>
        <h1 className="text-2xl font-bold tracking-wide text-white">
          My Notes
        </h1>

        <p className="text-sm text-gray-400">
          Minimal workspace
        </p>
      </div>
    </Link>

    {/* Desktop */}
    <div className="hidden md:flex items-center gap-4">

      {/* Notes */}
      <Link
        to="/"
        className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-gray-300 transition hover:bg-white/10 hover:text-white"
      >
        Notes
      </Link>

      {/* Profile */}
      <Link
        to="/profile"
        className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 transition hover:bg-white/10"
      >
        <img
          className="h-11 w-11 rounded-xl object-cover"
          src={
            user?.profilePicture ||
            "https://www.freeiconspng.com/thumbs/profile-icon-png/profile-icon-9.png"
          }
          alt="profile"
        />

        <div>
          <h3 className="text-sm font-semibold text-white">
            {user?.name || "Profile"}
          </h3>

          <p className="text-xs text-gray-400">
            Account
          </p>
        </div>
      </Link>
    </div>

    {/* Mobile */}
    <button
      onClick={() => setIsOpen(!isOpen)}
      className="md:hidden flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white"
    >
      {isOpen ? <X size={24} /> : <Menu size={24} />}
    </button>
  </nav>
</header>
  );
};

export default Navbar;