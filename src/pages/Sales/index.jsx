import QRCode from "qrcode";
import { QrCode } from "lucide-react";
import useSales from "../../hooks/useSales";
import useClients from "../../hooks/useClients";
import './index.scss'; // Importando os estilos

export default function Sales() {
    const { sales, loading: salesLoading, error: salesError } = useSales(); // Usa o hook de vendas
    const { clients, loading: clientsLoading, error: clientsError } = useClients(); // Usa o hook de clientes

    if (salesLoading || clientsLoading) return <div className='loading'>Carregando...</div>; // Exibe uma mensagem de carregamento
    if (salesError) return <div className='error-loading'>Erro ao buscar vendas: {salesError.message}</div>; // Exibe erro de vendas
    if (clientsError) return <div className='error-loading'>Erro ao buscar clientes: {clientsError.message}</div>; // Exibe erro de clientes

    // Função para formatar a data
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0'); // Pega o dia e adiciona zero à esquerda se necessário
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Pega o mês (0-11) e adiciona zero à esquerda
        const year = date.getFullYear(); // Pega o ano

        return `${day}/${month}/${year}`; // Retorna a data formatada como dia/mês/ano
    };

    // Função para gerar e baixar o QR Code
    const downloadQRCode = async (sale) => {
        try {
            const saleInfoURL = `https://client-automec.vercel.app/invoice/${sale.id}`; // Link para a nota fiscal
            const canvas = document.createElement("canvas");
            await QRCode.toCanvas(canvas, saleInfoURL, { errorCorrectionLevel: 'H' });

            // Converte o canvas em uma imagem e cria um link para download
            canvas.toBlob((blob) => {
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = `recibo_venda_${sale.id}.png`; // Nome do arquivo de download
                document.body.appendChild(a);
                a.click(); // Simula o clique no link
                document.body.removeChild(a); // Remove o link após o download
            });
        } catch (err) {
            console.error("Erro ao gerar QR Code", err);
        }
    };

    // Ordenar as vendas por data (mais recente primeiro)
    const sortedSales = sales.sort((a, b) => new Date(b.data_emissao) - new Date(a.data_emissao));

    return (
        <section className="container-sales">
            <h3>Vendas Realizadas</h3>
            <table className="sales-table">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Data</th>
                        <th className="sales-status">Status</th>
                        <th className="sales-valor">Valor Total</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedSales.map(sale => {
                        const client = clients.find(client => client.id === sale.clienteId); // Busca o cliente pelo ID
                        return (
                            <tr key={sale.id}>
                                <td>{client ? client.nome : 'Carregando vendas...'}</td> {/* Exibe o nome do cliente */}
                                <td>{formatDate(sale.data_emissao)}</td> {/* Formata e exibe a data */}
                                <td className="sales-status">{sale.status}</td>
                                <td className="sales-valor">R$ {sale.valor_total.toFixed(2)}</td>
                                <td>
                                    <button className="btn-qr-code" onClick={() => downloadQRCode(sale)}>
                                        <QrCode />
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </section>
    );
}