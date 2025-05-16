import { useEffect, useState } from 'react';
import { getProducts } from '../../api';

const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await getProducts();
        setProducts(response); // Armazena os produtos no estado
      } catch (err) {
        setError(err); // Armazena o erro no estado
      } finally {
        setLoading(false); // Finaliza o carregamento
      }
    };

    fetchProducts();
  }, []);

  const countProducts = () => products.length; // Método para contar produtos

  return { products, loading, error, countProducts }; // Retorna os dados do hook
};

export default useProducts;