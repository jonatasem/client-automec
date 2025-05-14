import React, { useState } from 'react';
import { createProduct } from '../../../api';
import './CreateProducts.scss'; 

const CreateProduct = () => {
  const [productData, setProductData] = useState({
    nome: '',
    descricao: '',
    preco: 0,
    quantidade: 0,
  });
  const [successMessage, setSuccessMessage] = useState(''); // Estado para a mensagem de sucesso

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      [name]: name === 'preco' || name === 'quantidade' ? parseFloat(value) : value, // Converte preço e quantidade para número
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Previne o comportamento padrão do formulário
    await createProduct(productData); // Cadastra o produto
    setProductData({ // Limpa os campos do formulário
      nome: '',
      descricao: '',
      preco: 0,
      quantidade: 0,
    });
    setSuccessMessage('Produto criado com sucesso!'); // Define a mensagem de sucesso

    // Remove a mensagem após 5 segundos
    setTimeout(() => {
      setSuccessMessage('');
    }, 5000);
  };

  return (
    <form onSubmit={handleSubmit} className="create-product">
      <h2>Criar Produto</h2>
      {successMessage && <div className="success-message">{successMessage}</div>} {/* Exibe a mensagem de sucesso */}
      
      <input 
        name="nome" 
        placeholder="Nome" 
        value={productData.nome} 
        onChange={handleChange} 
        required 
      />
      <input 
        name="descricao" 
        placeholder="Descrição" 
        value={productData.descricao} 
        onChange={handleChange} 
        required 
      />

      <div className="create-product-center">
        <label>
          Preço:
          <input 
            name="preco" 
            placeholder="Preço" 
            type="number" 
            value={productData.preco} 
            onChange={handleChange} 
            required 
            min="0" // Garante que o preço não possa ser negativo
          />
        </label>

        <label>
          Quantidade:
          <input 
            name="quantidade" 
            placeholder="Quantidade" 
            type="number" 
            value={productData.quantidade} 
            onChange={handleChange} 
            required 
            min="0" // Garante que a quantidade não possa ser negativa
          />
        </label>
      </div>    
      <div className="btn-create">
        <button type="submit">Criar Produto</button>
      </div>
    </form>
  );
};

export default CreateProduct;