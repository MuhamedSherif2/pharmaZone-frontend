import { IoMenu } from "react-icons/io5";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { userStore } from "@/store/userStore";
import { PillBottleIcon } from "lucide-react";
import { Button } from "./ui/button";

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isLoggin } = userStore();
  const path = useLocation().pathname;

  const links = [
    { id: 1, name: "الرئيسية", link: "/" },
    { id: 2, name: "المنتجات", link: "/pharmacy/category" },
    ...(isLoggin ? [{ id: 6, name: "لوحة التحكم", link: "/dashboard" }] : []),
    { id: 3, name: "من نحن", link: "/about" },
    { id: 4, name: "السلة", link: "/cart" },
    { id: 5, name: "اتصل بنا", link: "/contact" },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (linkPath) => {
    return path === linkPath || path.startsWith(linkPath + "/");
  };

  return (
    <header dir="ltr" className="bg-white w-full shadow-lg sticky top-0 z-50">
      <div className="flex items-center justify-between gap-4 container mx-auto px-4 py-4">
        {/* Logo */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="p-2 rounded-full bg-primary/10">
            <PillBottleIcon className="text-primary size-6" />
          </div>
          <h1 className="font-bold text-xl text-gray-800">PharmaZone</h1>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-1">
          <ul className="flex items-center gap-1">
            {links.map((link) => (
              <li key={link.id}>
                <Link
                  to={link.link}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 relative group ${
                    isActive(link.link)
                      ? "text-primary bg-blue-50"
                      : "text-gray-700 hover:text-primary hover:bg-gray-50"
                  }`}
                >
                  {link.name}
                  {/* Active underline */}
                  <span
                    className={`absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-full transition-all duration-300 ${
                      isActive(link.link) ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  ></span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Auth Buttons */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <Link to={"/auth/login"} className="hidden sm:block">
            <Button variant={"outline"} size="sm">
              تسجيل
            </Button>
          </Link>
          <Link to={"/auth/register"}>
            <Button size="sm" className="bg-primary hover:bg-blue-700">
              إنشاء حساب
            </Button>
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <IoMenu size={24} className="text-gray-700" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out border-t border-gray-200 ${
          isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="container mx-auto px-4 py-4">
          <ul className="space-y-2">
            {links.map((link) => (
              <li key={link.id}>
                <Link
                  to={link.link}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                    isActive(link.link)
                      ? "text-primary bg-blue-50 border-r-4 border-primary"
                      : "text-gray-700 hover:text-primary hover:bg-gray-50"
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
            <li className="pt-2 border-t border-gray-200 mt-4">
              <Link
                to={"/auth/login"}
                onClick={() => setIsMenuOpen(false)}
                className="block px-4 py-3 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-lg font-medium"
              >
                تسجيل الدخول
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default NavBar;

/**
    <header className="bg-[#add8e6] w-full py-3 shadow-lg" dir="rtl">
      <nav className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold text-gray-800">Pharma-Zone</div>

          //  Desktop Menu
          <ul className="hidden md:flex space-x-8">
            {links.map((link) => (
              <li key={link.id}>
                <Link
                  to={link.link}
                  className="text-gray-700 hover:text-blue-800 font-medium transition-colors duration-300 py-2 px-3 rounded-lg hover:bg-white/50"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          // Mobile Menu Button 
          <button
            className="md:hidden text-gray-700 text-2xl p-2 hover:bg-white/50 rounded-lg transition-colors duration-300"
            onClick={toggleMenu}
          >
            <IoMenu />
          </button>
        </div>

        // Mobile Menu 
        <div
          className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
            isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <ul className="py-4 space-y-3 border-t border-gray-300 mt-3">
            {links.map((link) => (
              <li key={link.id}>
                <Link
                  to={link.link}
                  className="block text-gray-700 hover:text-blue-800 font-medium transition-colors duration-300 py-3 px-4 rounded-lg hover:bg-white/50 text-right"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header> 
 */
