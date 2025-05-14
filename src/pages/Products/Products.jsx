import React, { useState } from 'react';
import useProducts from '../../hooks/useProducts';
import './Products.scss';

export default function Products() {
    const { products, loading, error } = useProducts();
    const [searchTerm, setSearchTerm] = useState('');

    if (loading) return <div className='loading'>Carregando...</div>;
    if (error) return <div className='error-loading'>Erro ao buscar produtos: {error.message}</div>;

    // Filtra os produtos com base no termo de pesquisa
    const filteredProducts = products.filter(product =>
        product.nome.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <section className="container-products">
            <h3>Produtos Cadastrados</h3>
            <input
                type="text"
                placeholder="Pesquisar pelo nome do produto..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
            />
            <table className="products-table">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th className='product-descript'>Descrição</th>
                        <th>Preço</th>
                        <th>Quantidade</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredProducts.map(product => (
                        <tr key={product.id}>
                            <td>{product.nome}</td>
                            <td className='product-descript'>{product.descricao}</td>
                            <td>R$ {product.preco.toFixed(2)}</td>
                            <td>{product.quantidade || 0}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    );
}