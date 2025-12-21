import { IoMenu } from "react-icons/io5";
import { useState } from "react";
import { Link } from "react-router-dom";
import { userStore } from "@/store/userStore";

function NavBar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { isLoggin } = userStore();

    const links = [
        { id: 1, name: 'الرئيسية', link: '/' },
        { id: 2, name: 'المنتجات', link: '/pharmacy/category' },
        ...(isLoggin ? [{ id: 6, name: 'لوحة التحكم', link: '/dashboard' }] : []),
        { id: 3, name: 'من نحن', link: '/about' },
        { id: 4, name: 'السلة', link: '/cart' },
        { id: 5, name: 'اتصل بنا', link: '/contact' }
    ]

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    }

    return (
        <header className="bg-[#add8e6] w-full py-3 shadow-lg" dir="rtl">
            <nav className="container mx-auto px-4 md:px-6">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <div className="text-2xl font-bold text-gray-800">
                        Pharma-Zone
                    </div>

                    {/* Desktop Menu */}
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

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-gray-700 text-2xl p-2 hover:bg-white/50 rounded-lg transition-colors duration-300"
                        onClick={toggleMenu}
                    >
                        <IoMenu />
                    </button>
                </div>

                {/* Mobile Menu */}
                <div className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}>
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
    )
}

export default NavBar;