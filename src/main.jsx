import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/index.scss';
import App from './App';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Importar páginas
import Dashboard from './pages/dashboard/index';
import CreateSales from './pages/CreateSales/CreateSales';
import CreateClients from './pages/CreateClients/CreateClients';
import CreateProducts from './pages/CreateProducts/CreateProducts';

// Sidebar
import Clients from './pages/Clients/Clients';
import Products from './pages/Products/Products';
import Sales from './pages/Sales/Sales';
import Invoice from './components/Invoice/Invoice';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Dashboard />} />
          <Route path="/criar-venda" element={<CreateSales />} />
          <Route path="/cadastrar-cliente" element={<CreateClients />} />
          <Route path="/cadastrar-produto" element={<CreateProducts />} />
          <Route path="/clientes" element={<Clients />} />
          <Route path="/produtos" element={<Products />} />
          <Route path="/vendas" element={<Sales />} />
        </Route>
        <Route path="/invoice/:id" element={<Invoice />} /> {/* Rota do Invoice fora do Outlet */}
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
