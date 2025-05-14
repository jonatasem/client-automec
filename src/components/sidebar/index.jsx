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

export default function Sidebar() {
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
                <li>
                    <Link to="/cadastrar-cliente">
                        < FaCog className="icon" />
                        Cadastrar Cliente
                    </Link>
                </li>
                <li>
                    <Link to="/criar-venda">
                        < FaWrench className="icon" />
                        Realizar Venda
                    </Link>
                </li>
                <p>ADDONS</p>
                <li>
                    <Link to="/cadastrar-produto">
                        < FaFolder className="icon" />
                        Cadastrar Produto
                    </Link>
                </li>
                <li>
                    <Link to="/clientes">
                        <FaChartArea className="icon" />
                        Clientes Cadastrados
                    </Link>
                </li>
                <li>
                    <Link to="/produtos">
                        < FaTable className="icon" />
                        Produtos Cadastrados
                    </Link>
                </li>
            </ul>
        </div>
    );
};
