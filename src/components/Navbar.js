import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuthValue } from "../context/AuthContext";
import { useAuthentication } from "../hooks/useAuthentication";

const Navbar = () => {
  const { user } = useAuthValue();
  const { logout } = useAuthentication();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-white shadow-md py-4 px-6 md:px-12 flex justify-between items-center relative">
      <NavLink to="/" className="text-2xl font-bold text-indigo-600">
        mini <span className="uppercase font-black text-indigo-800">Blog</span>
      </NavLink>

      {/* Botão Hamburguer */}
      <button
        onClick={toggleMenu}
        className="md:hidden flex flex-col space-y-1 focus:outline-none"
      >
        <span className="w-6 h-0.5 bg-gray-800"></span>
        <span className="w-6 h-0.5 bg-gray-800"></span>
        <span className="w-6 h-0.5 bg-gray-800"></span>
      </button>

      {/* Menu */}
      <ul
        className={`flex flex-col md:flex-row md:items-center gap-4 md:gap-4 absolute md:static bg-white md:bg-transparent shadow-md md:shadow-none p-6 md:p-0 rounded-md md:rounded-none top-16 right-6 md:top-auto md:right-auto transition-all duration-300 ${
          isOpen ? "block" : "hidden md:flex"
        }`}
      >
        <li>
          <NavLink
            to="/"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `text-sm px-3 py-2 rounded-md font-medium transition duration-200 ${
                isActive
                  ? "bg-indigo-600 text-white"
                  : "text-gray-700 hover:bg-indigo-100"
              }`
            }
          >
            Home
          </NavLink>
        </li>

        {!user && (
          <>
            <li>
              <NavLink
                to="/login"
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `text-sm px-3 py-2 rounded-md font-medium transition duration-200 ${
                    isActive
                      ? "bg-indigo-600 text-white"
                      : "text-gray-700 hover:bg-indigo-100"
                  }`
                }
              >
                Entrar
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/register"
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `text-sm px-3 py-2 rounded-md font-medium transition duration-200 ${
                    isActive
                      ? "bg-indigo-600 text-white"
                      : "text-gray-700 hover:bg-indigo-100"
                  }`
                }
              >
                Cadastre-se
              </NavLink>
            </li>
          </>
        )}

        {user && (
          <>
            <li>
              <NavLink
                to="/post/create"
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `text-sm px-3 py-2 rounded-md font-medium transition duration-200 ${
                    isActive
                      ? "bg-indigo-600 text-white"
                      : "text-gray-700 hover:bg-indigo-100"
                  }`
                }
              >
                Novo post
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard"
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `text-sm px-3 py-2 rounded-md font-medium transition duration-200 ${
                    isActive
                      ? "bg-indigo-600 text-white"
                      : "text-gray-700 hover:bg-indigo-100"
                  }`
                }
              >
                Dashboard
              </NavLink>
            </li>
          </>
        )}

        <li>
          <NavLink
            to="/about"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `text-sm px-3 py-2 rounded-md font-medium transition duration-200 ${
                isActive
                  ? "bg-indigo-600 text-white"
                  : "text-gray-700 hover:bg-indigo-100"
              }`
            }
          >
            Sobre
          </NavLink>
        </li>

        {user && (
          <li>
            <button
              onClick={() => {
                logout();
                setIsOpen(false);
              }}
              className="text-sm px-3 py-2 rounded-md font-medium text-gray-700 hover:bg-indigo-100 transition duration-200"
            >
              Sair
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
