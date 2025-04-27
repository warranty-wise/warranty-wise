import { SetStateAction, useState} from "react";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const Sidebar = ({setActiveComponent}) => {
    const [activePage, setActivePage] = useState("dashboard");

    const handleNavigation = (component: SetStateAction<string>) => {
        setActivePage(component);
        setActiveComponent(component);
    };

    return (
        <aside className="w-80 bg-blue-600 text-white p-4">
            <div style={{ padding: '10px' }}>
                <h1 className="font-bold text-3xl">Warranty Wise</h1>
            </div>
            <div style={{ padding: '10px' }}>
                <ul className="mt-4 text-xl">
                    <li
                        className={`p-4 font-bold rounded cursor-pointer hover:bg-blue-700 ${activePage === "dashboard" ? "bg-blue-700" : ""}`}
                        onClick={() => handleNavigation("dashboard")}
                    >
                        Dashboard
                    </li>
                    <li
                        className={`p-4 font-bold rounded cursor-pointer hover:bg-blue-700 ${activePage === "warranty-info" ? "bg-blue-700" : ""}`}
                        onClick={() => handleNavigation("warranty-info")}
                    >
                        Warranty Info
                    </li>
                    <li
                        className={`p-4 font-bold rounded cursor-pointer hover:bg-blue-700 ${activePage === "warranty-ai" ? "bg-blue-700" : ""}`}
                        onClick={() => handleNavigation("warranty-ai")}
                    >
                        Warranty AI
                    </li>
                </ul>
            </div>
        </aside>
    );
};

export default Sidebar;
