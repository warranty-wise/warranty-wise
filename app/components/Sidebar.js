const Sidebar = () => (
    <aside className="w-80 bg-blue-600 text-white p-4">
        <div style={{ padding: '10px' }}>
            <h1 className="font-bold text-3xl">
                Warranty Wise
            </h1>
        </div>
        <div style={{ padding: '10px' }}>
            <ul className="mt-4 text-xl">
                <li className="p-2 hover:bg-gray-700 font-bold">Dashboard</li>
                <li className="p-2 hover:bg-gray-700 font-bold">Calendar</li>
                <li className="p-2 hover:bg-gray-700 font-bold">Warranty Info</li>
            </ul>
        </div>
    </aside>
);

export default Sidebar;
