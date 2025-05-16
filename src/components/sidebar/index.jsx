import './index.scss';
import { Link } from 'react-router-dom';
import {
    FaTachometerAlt,
    FaCog,
    FaWrench,
    FaFolder,
    FaChartArea,
    FaTable
} from "react-icons/fa";

export default function Sidebar({ setActiveView }) {
    return (
        <div className="container-sidebar">
            <div className="sidebar-head">
                <h2>SB Admin</h2>
            </div>
            <ul className="sidebar-main">
                <li>
                    <Link to="/">
                        <FaTachometerAlt className="icon" />
                        Dashboard
                    </Link>
                </li>
                <p>INTERFACE</p>
                <li onClick={() => setActiveView('createClient')}>
                    <FaCog className="icon" />
                    Cadastrar Cliente
                </li>
                <li onClick={() => setActiveView('createSale')}>
                    <FaWrench className="icon" />
                    Realizar Venda
                </li>
                <p>ADDONS</p>
                <li onClick={() => setActiveView('createProduct')}>
                    <FaFolder className="icon" />
                    Cadastrar Produto
                </li>
            </ul>
        </div>
    );
};