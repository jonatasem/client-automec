import React from 'react';
import Header from '../../components/header';
import Sales from '../sales';
import useProducts from '../../hooks/useProducts'; // Importa o hook dos produtos
import useSales from '../../hooks/useSales'; // Importa o hook das vendas
import useClients from '../../hooks/useClients'; // Importa o hook dos clientes
import './index.scss';
import { MdOutlineReportProblem } from "react-icons/md";

export default function Dashboard() {
  const { products, loading: loadingProducts, error: errorProducts, countProducts } = useProducts(); // Usa o hook de produtos
  const { sales, loading: loadingSales, error: errorSales } = useSales(); // Usa o hook de vendas
  const { clients, loading: loadingClients, error: errorClients } = useClients(); // Usa o hook de clientes

  if (loadingProducts || loadingSales || loadingClients) return <div>Carregando...</div>;
  if (errorProducts || errorSales || errorClients) return <div>Erro ao buscar dados</div>;

  const totalProducts = countProducts(); // Contagem de produtos
  const totalSales = sales.length; // Contagem de vendas
  const totalClients = clients.length; // Contagem de clientes

  return (
    <section className="container-home">
      <Header />
      <div className='report'>
        <h1 className='title-home'>Automec - Estética Automotiva</h1>
        <div>
          <MdOutlineReportProblem className='icon'/>
          <a href="">Reportar Problema</a>
        </div>
      </div>

      <article className="home-head">
        <div className="monthly">
          <h3>Produtos Cadastrados</h3>
          <p>{totalProducts}</p> {/* Exibe a contagem de produtos */}
        </div>
        <div className="annual">
          <h3>Vendas Realizadas</h3>
          <p>{totalSales}</p> {/* Exibe a contagem de vendas */}
        </div>
        <div className="clients">
          <h3>Clientes Cadastrados</h3>
          <p>{totalClients}</p> {/* Exibe a contagem de clientes */}
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
    </section>
  );
}