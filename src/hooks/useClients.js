import { useEffect, useState } from 'react';
import { getClients } from '../../api';

const useClients = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClients = async () => {
      setLoading(true);
      try {
        const response = await getClients();
        setClients(response); // Armazena os clientes no estado
      } catch (err) {
        setError(err); // Armazena o erro no estado
      } finally {
        setLoading(false); // Finaliza o carregamento
      }
    };

    fetchClients();
  }, []);

  return { clients, loading, error }; // Retorna os dados do hook
};

export default useClients;