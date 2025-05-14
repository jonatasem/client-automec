import React, { useState } from 'react';
import useClients from '../../hooks/useClients';
import './index.scss';

export default function Clients() {
    const { clients, loading, error } = useClients();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedClients, setSelectedClients] = useState(new Set());

    if (loading) return <div className='loading'>Carregando...</div>;
    if (error) return <div className='error-loading'>Erro ao buscar clientes: {error.message}</div>;

    // Filtra os clientes com base no termo de pesquisa
    const filteredClients = clients.filter(client =>
        client.nome.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleClientSelect = (clientId) => {
        const updatedSelection = new Set(selectedClients);
        if (updatedSelection.has(clientId)) {
            updatedSelection.delete(clientId);
        } else {
            updatedSelection.add(clientId);
        }
        setSelectedClients(updatedSelection);
    };

    const exportToCSV = () => {
        const selected = clients.filter(client => selectedClients.has(client.id));
        const csvContent = [
            ['Nome', 'Endereço', 'Telefone', 'Documento'], // Cabeçalho
            ...selected.map(client => [
                client.nome,
                `${client.endereco.rua}, ${client.endereco.numero}, ${client.endereco.bairro}, ${client.endereco.cidade} - ${client.endereco.estado}`,
                client.telefone,
                client.documento.cnpj_cpf
            ])
        ]
        .map(e => e.join(","))
        .join("\n");

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", "clientes.csv");
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <section className="container-clients">
            <h3>Clientes Cadastrados</h3>
            <input
                type="text"
                placeholder="Pesquisar pelo nome do cliente..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
            />
            <div className="table-container">
                <table className="clients-table">
                    <thead>
                        <tr>
                            <th>
                                <input
                                    type="checkbox"
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            // Seleciona todos os clientes
                                            const allClientIds = filteredClients.map(client => client.id);
                                            setSelectedClients(new Set(allClientIds));
                                        } else {
                                            // Desmarca todos os clientes
                                            setSelectedClients(new Set());
                                        }
                                    }} 
                                    checked={selectedClients.size === filteredClients.length}
                                />
                            </th>
                            <th>Nome</th>
                            <th className='andress-client'>Endereço</th>
                            <th>Telefone</th>
                            <th className='doc-client'>Documento</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredClients.map(client => (
                            <tr key={client.id}>
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={selectedClients.has(client.id)}
                                        onChange={() => handleClientSelect(client.id)}
                                    />
                                </td>
                                <td>{client.nome}</td>
                                <td className='andress-client'>
                                    {client.endereco.rua}, {client.endereco.numero}, {client.endereco.bairro}, {client.endereco.cidade} - {client.endereco.estado}
                                </td>
                                <td>{client.telefone}</td>
                                <td className='doc-client'>{client.documento.cnpj_cpf}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className='clients-cvs'>
                <button onClick={exportToCSV} className="export-button" disabled={selectedClients.size === 0}>
                    Exportar em CSV
                </button>
            </div>
        </section>
    );
}

