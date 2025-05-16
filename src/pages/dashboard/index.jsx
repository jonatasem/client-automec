import React from 'react';
import Header from '../../components/header';
import Sales from '../sales';
import useProducts from '../../hooks/useProducts';
import useSales from '../../hooks/useSales';
import useClients from '../../hooks/useClients';
import './index.scss';
import { MdOutlineReportProblem } from "react-icons/md";
import CreateClient from '../createClients';
import CreateProduct from '../createProducts';
import CreateSales from '../createSales';

export default function Dashboard({ activeView, setActiveView }) {
  const { products, loading: loadingProducts, error: errorProducts, countProducts } = useProducts();
  const { sales, loading: loadingSales, error: errorSales } = useSales();
  const { clients, loading: loadingClients, error: errorClients } = useClients();

  if (loadingProducts || loadingSales || loadingClients) return <div>Carregando...</div>;
  if (errorProducts || errorSales || errorClients) return <div>Erro ao buscar dados</div>;

  const totalProducts = countProducts();
  const totalSales = sales.length;
  const totalClients = clients.length;

  return (
    <section className="container-home">
      <Header />
      <div className='report'>
        <h1 className='title-home'>Automec - Estética Automotiva</h1>
        <div>
          <MdOutlineReportProblem className='icon' />
          <a href="">Reportar Problema</a>
        </div>
      </div>

      <article className="home-head">
        <div className="monthly">
          <h3>Produtos Cadastrados</h3>
          <p>{totalProducts}</p>
        </div>
        <div className="annual">
          <h3>Vendas Realizadas</h3>
          <p>{totalSales}</p>
        </div>
        <div className="clients">
          <h3>Clientes Cadastrados</h3>
          <p>{totalClients}</p>
        </div>
        <div className="tasks">
          <h3>Ganhos do Mês</h3>
          <p>R$40,000</p>
        </div>
      </article>

      <article className="home-main">
        <div className="graphic-sales">
          <Sales />
        </div>
      </article>

      {/* Renderiza componentes com base na visualização ativa */}
      <article className='view-create-cliente'>
        {activeView === 'createClient' && <CreateClient setActiveView={setActiveView} />} {/* Corrigido para passar setActiveView */}
      </article>

      <article className='view-create-venda'>
        {activeView === 'createSale' && <CreateSales setActiveView={setActiveView} />} {/* Corrigido para passar setActiveView */}
      </article>

      <article className='view-create-produto'>
        {activeView === 'createProduct' && <CreateProduct setActiveView={setActiveView} />} {/* Corrigido para passar setActiveView */}
      </article>
    </section>
  );
}