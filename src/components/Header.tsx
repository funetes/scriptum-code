import { useState, useRef, useEffect, memo } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import {
  ChevronRightIcon,
  Search,
  User as UserIcon,
  LogOut,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

interface HeaderProps {
  id?: string;
  title?: string;
  onSearchClick?: () => void;
  category?: string;
  categoryId?: string;
}

const HeaderComponent = ({
  id,
  title,
  onSearchClick,
  category,
  categoryId,
}: HeaderProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === "/";
  const { user, login, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleMyPage = () => {
    if (!user) return;
    navigate(`/user/${user.uid}`);
    setMenuOpen(false);
  };

  const handleLogout = async () => {
    const isUserPage = location.pathname.startsWith("/user/");
    await logout();
    setMenuOpen(false);
    if (isUserPage) {
      navigate("/");
    }
  };

  useEffect(() => {
    if (!menuOpen) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 h-14 bg-black backdrop-blur-md z-50 flex items-center px-1 sm:px-4 border-b border-white/10">
        <div className="flex items-center w-full max-w-7xl mx-auto relative">
          <Link
            to="/"
            className="flex items-center justify-center transition-colors shrink-0"
            aria-label="Home"
          >
            <img
              src="/logo-mobile.svg"
              alt="Home"
              className="h-6 block xl:hidden"
            />
            <img src="/logo.svg" alt="Home" className="h-10 hidden xl:block" />
          </Link>

          {!id && categoryId ? (
            <div className="absolute inset-0 flex items-center justify-center px-16 pointer-events-none">
              <div className="truncate text-sm md:text-base text-neutral-200">
                {category}
              </div>
            </div>
          ) : null}

          {id && categoryId ? (
            <div className="absolute inset-0 flex items-center justify-center px-18 md:px-22 pointer-events-none">
              {category ? (
                <Link
                  to={`/${categoryId}`}
                  className="max-w-[140px] md:max-w-[300px] truncate text-sm md:text-base text-blue-400 transition-colors hover:underline pointer-events-auto"
                >
                  {category}
                </Link>
              ) : null}
              {id && title ? (
                <div className="text-white text-sm md:text-base font-medium truncate max-w-[70vw] ml-1 pointer-events-none flex items-center gap-1">
                  <ChevronRightIcon className="w-4 h-4" />
                  <span className="truncate">{title}</span>
                </div>
              ) : null}
            </div>
          ) : null}

          <div className="ml-auto flex items-center">
            {!isHomePage ? (
              <button
                onClick={onSearchClick}
                className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-white/10 transition-colors text-white cursor-pointer"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>
            ) : null}

            {user ? (
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setMenuOpen((prev) => !prev)}
                  className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-white/10 transition-colors text-white cursor-pointer group relative"
                  aria-label="Profile"
                >
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.displayName || "User"}
                      className="w-7 h-7 rounded-full border border-white/20"
                    />
                  ) : (
                    <UserIcon className="w-5 h-5" />
                  )}
                </button>

                {menuOpen ? (
                  <div className="absolute top-12 right-0 w-48 bg-slate-900 border border-white/10 rounded-2xl shadow-2xl p-2 animate-in fade-in zoom-in-95 duration-200 origin-top-right z-100 backdrop-blur-xl">
                    <button
                      onClick={handleMyPage}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 transition-colors text-white/70 hover:text-white text-sm font-medium cursor-pointer"
                    >
                      <UserIcon size={18} />
                      마이페이지
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-500/10 transition-colors text-red-400 hover:text-red-300 text-sm font-medium cursor-pointer"
                    >
                      <LogOut size={18} />
                      로그아웃
                    </button>
                  </div>
                ) : null}
              </div>
            ) : (
              <button
                onClick={login}
                className="flex items-center justify-center gap-2 p-2.5 rounded-full hover:bg-white/10 transition-colors text-white text-sm font-medium cursor-pointer"
                aria-label="Login"
              >
                <UserIcon className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </header>
      <div className="h-14 w-full shrink-0" />
    </>
  );
};

export const Header = memo(HeaderComponent);
export default Header;
