import React, { useEffect, useState } from "react";
import axios from "axios";
import Chart from "react-apexcharts";
import './SalesCharts.scss';

const SalesChart = () => {
  const [salesData, setSalesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Função para buscar dados da API
  const fetchSalesData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/vendas`
      );
      setSalesData(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSalesData();
  }, []);

  // Função para formatar os dados para o gráfico
  const calculateSalesData = () => {
    const salesMap = salesData.reduce((acc, sale) => {
      const date = new Date(sale.data_emissao).toLocaleDateString();
      acc[date] = (acc[date] || 0) + sale.valor_total; // Soma os valores por data
      return acc;
    }, {});

    return Object.entries(salesMap).map(([name, value]) => ({
      name,
      value,
    }));
  };

  const chartData = calculateSalesData();

  // Configuração dos dados e opções do gráfico
  const series = [
    {
      name: "Vendas",
      data: chartData.map(item => item.value),
    },
  ];

  const options = {
    chart: {
      type: 'line',
      height: 350,
    },
    xaxis: {
      categories: chartData.map(item => item.name),
    },
    tooltip: {
      y: {
        formatter: (value) => `R$ ${value.toFixed(2)}`,
      },
    },
  };

  if (loading) return <div className="loading">Carregando...</div>;
  if (error) return <div className="error-loading">Erro: {error.message}</div>;

  return (
    <section className="container-chart">
      <h2>Vendas por Data</h2>
      <article className="sales-chart">
        <Chart options={options} series={series} type="line" height={350} />
      </article>
    </section>
  );
};

export default SalesChart;