import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/index.scss';
import App from './App';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Importar páginas
import Dashboard from './pages/dashboard';
import CreateSales from './pages/createSales';
import CreateClients from './pages/createClients';
import CreateProducts from './pages/createProducts';

// Sidebar
import Clients from './pages/clients';
import Products from './pages/products';
import Sales from './pages/sales';
import Invoice from './components/invoice';

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
