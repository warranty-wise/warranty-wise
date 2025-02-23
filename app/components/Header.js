import { FaUserCircle } from "react-icons/fa";

const Header = () => (
    <header className="bg-white text-white p-6 flex items-center justify-between w-full h-20 border">
        <div className="ml-auto">
            <FaUserCircle className="text-4xl invert" />
        </div>
    </header>
);

export default Header;
