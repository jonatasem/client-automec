import React, { useState } from 'react';
import { createSale } from '../../../api';
import useClients from '../../hooks/useClients';
import useProducts from '../../hooks/useProducts';
import './index.scss'; // Importa o estilo

const CreateSale = () => {
  const { clients } = useClients(); // Obtém a lista de clientes
  const { products } = useProducts(); // Obtém a lista de produtos
  const [selectedClient, setSelectedClient] = useState(''); // Estado para o cliente selecionado
  const [selectedProducts, setSelectedProducts] = useState([]); // Estado para produtos selecionados
  const [quantity, setQuantity] = useState({}); // Estado para armazenar quantidades
  const [searchTerm, setSearchTerm] = useState(''); // Estado para o texto de busca
  const [successMessage, setSuccessMessage] = useState(''); // Estado para a mensagem de sucesso

  const handleSubmit = async (e) => {
    e.preventDefault(); // Previne o comportamento padrão do formulário
    
    // Validação: Verifica se um cliente e pelo menos um produto foram selecionados
    if (!selectedClient || selectedProducts.length === 0) {
      alert("Por favor, selecione um cliente e pelo menos um produto."); // Mensagem de alerta
      return;
    }

    try {
      const today = new Date();
      const dueDate = new Date();
      dueDate.setDate(today.getDate() + 15); // Define a data de faturamento como 15 dias a partir de hoje

      const saleData = {
        clienteId: selectedClient,
        produtos: selectedProducts.map((productId) => ({
          id: productId,
          quantidade: quantity[productId] || 1, // Usa a quantidade informada ou 1
          descricao: products.find(product => product.id === productId)?.nome || '',
          preco_unitario: products.find(product => product.id === productId)?.preco || 0,
        })),
        data_emissao: today.toISOString().split('T')[0], // Data de emissão
        data_faturamento: dueDate.toISOString().split('T')[0], // Data de faturamento
        forma_pagamento: 'CARTEIRA',
        status: 'FATURADO',
      };

      const response = await createSale(saleData); // Tenta criar a venda
      console.log("Venda criada com sucesso:", response); // Log do sucesso

      // Exibe a mensagem de sucesso
      setSuccessMessage("Venda realizada com sucesso!");

      // Remove a mensagem após 5 segundos
      setTimeout(() => {
        setSuccessMessage('');
      }, 5000);
      
    } catch (error) {
      console.error("Erro ao criar venda:", error); // Log do erro
      alert("Ocorreu um erro ao criar a venda. Tente novamente."); // Mensagem para o usuário
    }
  };

  const handleQuantityChange = (productId, change) => {
    setQuantity((prevQuantity) => {
      const currentQuantity = prevQuantity[productId] || 1; // Pega a quantidade atual ou 1 se não existir
      const newQuantity = currentQuantity + change;

      return {
        ...prevQuantity,
        [productId]: newQuantity > 0 ? newQuantity : 1 // Garante que a quantidade não fique abaixo de 1
      };
    });
  };

  // Filtra os produtos com base no texto de busca
  const filteredProducts = products.filter(product =>
    product.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="create-sale">
      <h2>Criar Venda</h2>
      {successMessage && (
        <div className="success-message">
          {successMessage}
        </div>
      )}
      <article className="sales-head">
        <div>
          <select onChange={(e) => setSelectedClient(e.target.value)} required>
            <option value="">Selecione um cliente</option>
            {clients.map((client) => (
              <option key={client.id} value={client.id}>{client.nome}</option>
            ))}
          </select>
        </div>
        <div className='btn-create'>
          <button onClick={handleSubmit}>Criar Venda</button>
        </div>
      </article>
      <div className="search-products">
        <input
          type="text"
          name="search"
          id="search-products"
          placeholder='Pesquise uma peça...'
          value={searchTerm} // Adiciona o valor do estado de busca
          onChange={(e) => setSearchTerm(e.target.value)} // Atualiza o estado de busca
        />
      </div>
      <form onSubmit={handleSubmit} className="container-vendas">
        {filteredProducts.map((product) => (
          <article key={product.id} className="vendas-center">
            <input
              type="checkbox"
              value={product.id}
              onChange={(e) => {
                const { checked } = e.target;
                if (checked) {
                  setSelectedProducts([...selectedProducts, product.id]); // Adiciona produto selecionado
                  setQuantity((prevQuantity) => ({
                    ...prevQuantity,
                    [product.id]: 1 // Define a quantidade padrão como 1
                  }));
                } else {
                  setSelectedProducts(selectedProducts.filter((id) => id !== product.id)); // Remove produto não selecionado
                  const { [product.id]: removed, ...rest } = quantity; // Remove a quantidade do produto não selecionado
                  setQuantity(rest); // Atualiza o estado
                }
              }}
            />
            <label>{product.nome}</label>
            <div className="quantity-controls">
              <input
                type="number"
                value={quantity[product.id] || 1} // Mostra a quantidade atual ou 1
                readOnly // O campo é somente leitura
              />
              <div className="quantity-buttons">
                <button type="button" onClick={() => handleQuantityChange(product.id, 1)}>+</button>
                <button type="button" onClick={() => handleQuantityChange(product.id, -1)}>-</button>
              </div>
            </div>
          </article>
        ))}
      </form>
    </section>
  );
};

export default CreateSale;