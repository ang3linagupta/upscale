import React, { useState } from "react";
import Sales22 from "./routing/Sales/Sales22";
import SalesHistory from "./SalesHistory";
import Login from "./Login";
import Charts from "./Charts";
import Settings from "./Settings";
import { useNavigate } from "react-router-dom";


const SideBar2 = () => {
    const [activeComponent, setActiveComponent] = useState("sales");
    const [isCollapsed, setIsCollapsed] = useState(false);
    const navigate = useNavigate();

    const renderComponent = () => {
        switch (activeComponent) {
            case "sales":
                return <Sales22 />;
            case "charts":
                return <Charts></Charts>;
            case "saleshistory":
                return <SalesHistory></SalesHistory>;
            case "settings":
                return <Settings></Settings>;
            default:
                return <Sales22 />;
        }
    };

    const menuItems = [
        { id: "sales", label: "Today's Sales", icon: "📊" },
        { id: "saleshistory", label: "Sales History", icon: "📜" },
        { id: "charts", label: "Charts", icon: "📈" },
        { id: "settings", label: "Settings", icon: "⚙️" },
    ];

    return (
        <div className="flex min-h-screen">
            {/* Navbar */}
            <div className="w-full bg-yellow-500 py-4 px-6 flex items-center justify-between text-black font-semibold text-sm fixed top-0 left-0 right-0 z-50">
                <div className="flex items-center space-x-4 ml-4">
                    <img src="/pictures/logo.png" alt="Logo" className="h-8" />
                    <span>UpScale</span>
                </div>
                <div className="flex space-x-6 mr-4">
                    <span className="cursor-pointer" onClick={() => navigate('/')}>Home</span>
                </div>
            </div>

            {/* Sidebar */}
            <div
                className={`${isCollapsed ? "w-20" : "w-64"
                    } border-r bg-gradient-to-b from-yellow-500 to-yellow-400 border-yellow-300 shadow-lg transition-all duration-300 pt-16 fixed left-0 h-full`}
            >
                <div className="p-4 flex items-center justify-between bg-yellow-600 rounded-t-lg shadow-md">
                    {!isCollapsed && (
                        <p className="text-white font-extrabold text-xl tracking-wide">Sales Dashboard</p>
                    )}
                    <button
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className="text-white hover:scale-125 transition-transform duration-300"
                    >
                        {isCollapsed ? "⮞" : "⮜"}
                    </button>
                </div>

                <nav className="p-4 space-y-3 flex flex-col h-[90%]">
                    <div className="flex-grow">
                        {menuItems.slice(0, 3).map((item) => (
                            <button
                                key={item.id}
                                onClick={() => setActiveComponent(item.id)}
                                className={`flex items-center gap-4 p-4 rounded-xl transition-transform transform duration-300 hover:scale-105 ${activeComponent === item.id
                                    ? "bg-yellow-700 text-white shadow-inner"
                                    : "text-white hover:bg-yellow-500"
                                    }`}
                            >
                                <span>{item.icon}</span>
                                {!isCollapsed && <span>{item.label}</span>}
                            </button>
                        ))}
                    </div>
                    <div className="space-y-3 mb-6">
                        <button
                            onClick={() => setActiveComponent("settings")}
                            className={`flex items-center gap-4 p-4 rounded-xl transition-transform transform duration-300 hover:scale-105 ${activeComponent === "settings"
                                ? "bg-yellow-700 text-white shadow-inner"
                                : "text-white hover:bg-yellow-500"
                                }`}
                        >
                            <span>⚙️</span>
                            {!isCollapsed && <span>Settings</span>}
                        </button>
                        <button
                            onClick={() => navigate('/logout')}
                            className={`flex items-center gap-4 p-4 rounded-xl transition-transform transform duration-300 hover:scale-105 ${activeComponent === "logout"
                                ? "bg-yellow-700 text-white shadow-inner"
                                : "text-red-600  hover:bg-yellow-500"
                                }`}
                        >
                            <span>🚪</span>
                            {!isCollapsed && <span>Logout</span>}
                        </button>
                    </div>
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6 bg-gray-100 ml-64 pt-16">{renderComponent()}</div>
        </div>
    );
};

export default SideBar2;

