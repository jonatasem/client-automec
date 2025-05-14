import './index.scss';

import {
    FaTachometerAlt,
    FaCog,
    FaWrench,
    FaFolder,
    FaChartArea,
    FaTable

} from "react-icons/fa";

export default function Sidebar() {
    return (
        <div className="container-sidebar">
            <div className="sidebar-head">
                <h2>SB Admin</h2>
            </div>
            <ul className="sidebar-main">
                <li>
                    <FaTachometerAlt className="icon" />
                    Dashboard
                </li>
                <p>INTERFACE</p>
                <li>
                    < FaCog className="icon" />
                    Components
                </li>
                <li>
                    < FaWrench className="icon" />
                    Utilities
                </li>
                <p>ADDONS</p>
                <li>
                    < FaFolder className="icon" />
                    Pages
                </li>
                <li>
                    <FaChartArea className="icon" />
                    Charts
                </li>
                <li>
                    < FaTable className="icon" />
                    Tables
                </li>
            </ul>
        </div>
    );
};
