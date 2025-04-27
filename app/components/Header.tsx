import { useState, useEffect, useRef } from "react";
import { FaUserCircle,  } from "react-icons/fa";
import { RxDividerVertical } from "react-icons/rx";
import { useRouter } from "next/navigation";
import { signout } from "../signout/actions";
import { BiCalendar } from "react-icons/bi";

const Header = ({ setActiveComponent }: { setActiveComponent: (component: string) => void }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const router = useRouter();
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handlePageNavigation = (path: string) => {
        router.push(path);
        setIsDropdownOpen(false);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsDropdownOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


    return (
        <header className="bg-white text-white p-6 flex items-center justify-between w-full h-20 border">
            <div className="ml-auto">
                <button onClick={ () => setActiveComponent("calendar") } className="relative flex items-center rounded-full text-sm bg-white">
                    <span className="absolute -inset-1.5"></span>
                    <BiCalendar className="size-10 invert"/>
                </button>
            </div>
            <div>
                <RxDividerVertical className="size-10 invert" />
            </div>

            {/* Dropdown Wrapper */}
            <div className="relative ml-0" ref={dropdownRef}>
                {/* Button that toggles dropdown */}
                <button
                    type="button"
                    className="relative flex max-w-xs items-center rounded-full text-sm bg-white"
                    id="user-menu-button"
                    aria-expanded={isDropdownOpen}
                    aria-haspopup="true"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
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
                    >
                        <button
                            onClick={() => {
                                setActiveComponent("account")
                                setIsDropdownOpen(false)
                            }}
                            className="block w-full text-left px-4 py-2 text-sm bg-white text-gray-700 hover:bg-gray-100"
                            role="menuitem"
                        >
                            Account Info
                        </button>
                        <button
                            onClick={() => {
                                signout()
                                handlePageNavigation('/signout')
                            }}
                            className="block w-full text-left px-4 py-2 text-sm bg-white text-gray-700 hover:bg-gray-100"
                            role="menuitem"
                        >
                            Sign out
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
