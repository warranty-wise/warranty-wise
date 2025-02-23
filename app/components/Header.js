import { useState } from "react";
import { FaUserCircle, FaRegBell } from "react-icons/fa";
import { RxDividerVertical } from "react-icons/rx";
import SearchBar from "@/app/components/SearchBar";

const Header = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    return (
        <header className="bg-white text-white p-6 flex items-center justify-between w-full h-20 border">
            <div className="ml-auto">
                <SearchBar />
            </div>
            <div className="ml-auto">
                <FaRegBell className="invert size-7" />
            </div>
            <div>
                <RxDividerVertical className="size-10 invert" />
            </div>

            {/* Dropdown Wrapper */}
            <div className="relative ml-0">
                {/* Button that toggles dropdown */}
                <button
                    type="button"
                    className="relative flex max-w-xs items-center rounded-full text-sm bg-white"
                    id="user-menu-button"
                    aria-expanded={isDropdownOpen}
                    aria-haspopup="true"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)} // 👈 Toggle state
                >
                    <span className="absolute -inset-1.5"></span>
                    <span className="sr-only">Open user menu</span>
                    <FaUserCircle className="text-4xl invert" />
                </button>

                {/* Dropdown Menu - Only show when `isDropdownOpen` is true */}
                {isDropdownOpen && (
                    <div
                        className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 ring-1 ring-gray-300 shadow-lg"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="user-menu-button"
                        tabIndex="-1"
                    >
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                            Your Profile
                        </a>
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                            Settings
                        </a>
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                            Sign out
                        </a>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
