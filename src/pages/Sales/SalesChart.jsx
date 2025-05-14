import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

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

  if (loading) return <div className="loading">Carregando...</div>;
  if (error) return <div className="error-loading">Erro: {error.message}</div>;

  return (
    <section className="container-chart">
      <h2>Vendas por Data</h2>
      <article className="sales-chart">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData} margin={{ top: 10, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis dataKey="name" stroke="#666" />
            <YAxis stroke="#666" />
            <Tooltip formatter={(value) => [`R$ ${value.toFixed(2)}`, "Vendas"]} />
            <Legend />
            <Line
              type="monotone"
              dataKey="value"
              name="Vendas"
              stroke="#3b82f6"
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </article>
    </section>
  );
};

export default SalesChart;