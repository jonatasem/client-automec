import React, { useState } from 'react';
import { createClient } from '../../../api';
import useClients from '../../hooks/useClients';
import './index.scss';
import { BsX } from "react-icons/bs";

const CreateClient = ({ setActiveView }) => { // Mudança aqui para garantir que setActiveView é recebido
  const { clients } = useClients();
  const [clientData, setClientData] = useState({
    nome: '',
    endereco: {
      rua: '',
      numero: '',
      bairro: '',
      cidade: '',
      estado: '',
      cep: '',
    },
    telefone: '',
    documento: {
      cnpj_cpf: '',
    },
  });
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    const keys = name.split('.');
    if (keys.length > 1) {
      setClientData((prevData) => ({
        ...prevData,
        [keys[0]]: {
          ...prevData[keys[0]],
          [keys[1]]: value,
        },
      }));
    } else {
      setClientData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const clientExists = clients.some(client => client.nome.toLowerCase() === clientData.nome.toLowerCase());
    
    if (clientExists) {
      alert('Já existe um cliente cadastrado com esse nome.');
      return; 
    }

    await createClient(clientData);
    setClientData({
      nome: '',
      endereco: {
        rua: '',
        numero: '',
        bairro: '',
        cidade: '',
        estado: '',
        cep: '',
      },
      telefone: '',
      documento: {
        cnpj_cpf: '',
      },
    });
    setSuccessMessage('Cliente cadastrado com sucesso!');

    setTimeout(() => {
      setSuccessMessage('');
    }, 5000);
  };

  return (
    <section className="container-create-clients">
      <div className="closed-create-clients">
        <button onClick={() => setActiveView('')}> {/* Chamando corretamente para fechar */}
          <BsX className='icon' />
        </button>
      </div>
      <form onSubmit={handleSubmit} className="create-client">
        <h2>Criar Cliente</h2>
        {successMessage && <div className="success-message">{successMessage}</div>}
        <div>
          <input name="nome" placeholder="Nome" value={clientData.nome} onChange={handleChange} required />
          <input name="endereco.rua" placeholder="Rua" value={clientData.endereco.rua} onChange={handleChange} required />
          <input name="endereco.numero" placeholder="Número" value={clientData.endereco.numero} onChange={handleChange} required />
          <input name="endereco.bairro" placeholder="Bairro" value={clientData.endereco.bairro} onChange={handleChange} required />
          <input name="endereco.cidade" placeholder="Cidade" value={clientData.endereco.cidade} onChange={handleChange} required />
          <input name="endereco.estado" placeholder="Estado" value={clientData.endereco.estado} onChange={handleChange} required />
          <input name="endereco.cep" placeholder="CEP" value={clientData.endereco.cep} onChange={handleChange} required />
          <input name="telefone" placeholder="Telefone" value={clientData.telefone} onChange={handleChange} />
          <input name="documento.cnpj_cpf" placeholder="CNPJ/CPF" value={clientData.documento.cnpj_cpf} onChange={handleChange} required />
        </div>
        <div className='btn-create'>
          <button type="submit">Cadastrar Cliente</button>
        </div>
      </form>
    </section>
  );
};

export default CreateClient;