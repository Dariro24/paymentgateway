import React from 'react';
import '../assets/TransactionsListPage.css';

interface Transaction {
    id: number;
    transactionExternalId: string;
    status: 'PENDING' | 'APPROVED' | 'DECLINED';
    amount: string;
    customerEmail: string;
    productId: number;
    createdAt: string;
}

const RefreshIcon = ({ className = '' }: { className?: string }) => (
    <svg
      className={`refresh-icon ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M1 4v6h6" />
      <path d="M23 20v-6h-6" />
      <path d="M20.5 9A9 9 0 0 0 5.6 5.6L1 10m22 4l-4.6 4.4A9 9 0 0 1 3.5 15" />
    </svg>
);

const TransactionsListPage: React.FC = () => {
    const [transactions, setTransactions] = React.useState<Transaction[]>([]);
    const [statusFilter, setStatusFilter] = React.useState<'ALL' | 'PENDING' | 'APPROVED' | 'DECLINED'>('ALL');
    const [sortOrder, setSortOrder] = React.useState<'NEWEST' | 'OLDEST'>('NEWEST');
    const [refreshingIds, setRefreshingIds] = React.useState<number[]>([]);

    React.useEffect(() => {
        fetchTransactions();
    }, []);

    const fetchTransactions = async () => {
        try {
            const response = await fetch("http://localhost:3000/transactions");
            const data = await response.json();
            setTransactions(data);
        } catch (error) {
            console.error("Error fetching transactions:", error);
        }
    };

    // Modificamos la función para recibir el objeto transaction en lugar de solo el id
    const checkTransactionStatus = async (transaction: Transaction) => {
        setRefreshingIds(prev => [...prev, transaction.id]);

        try {
            // Utilizamos el transactionExternalId en lugar del id
            const response = await fetch(`http://localhost:3000/transactions/id/${transaction.transactionExternalId}`);
            const updatedTransaction = await response.json();

            setTransactions(prev =>
                prev.map(tx => (tx.id === transaction.id ? updatedTransaction : tx))
            );
        } catch (error) {
            console.error(`Error checking status for transaction ${transaction.id}:`, error);
        } finally {
            setRefreshingIds(prev => prev.filter(id => id !== transaction.id));
        }
    };

    const filteredTransactions = transactions
        .filter(transaction =>
            statusFilter === 'ALL' || transaction.status === statusFilter
        )
        .sort((a, b) => {
            const dateA = new Date(a.createdAt).getTime();
            const dateB = new Date(b.createdAt).getTime();
            return sortOrder === 'NEWEST' ? dateB - dateA : dateA - dateB;
        });

    const getStatusClass = (status: string) => {
        switch (status) {
            case 'PENDING': return 'status-pending';
            case 'APPROVED': return 'status-approved';
            case 'DECLINED': return 'status-declined';
            default: return '';
        }
    };

    return (
        <div className="transactions-container">
            <h1 className="transactions-title">Transaction History</h1>

            {/* Filters */}
            <div className="filters-container">
                <div className="filter-group">
                    <label className="filter-label">Filter by status:</label>
                    <select
                        className="filter-select"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value as any)}
                    >
                        <option value="ALL">All Transactions</option>
                        <option value="PENDING">Pending</option>
                        <option value="APPROVED">Approved</option>
                        <option value="DECLINED">Declined</option>
                    </select>
                </div>

                <div className="filter-group">
                    <label className="filter-label">Sort by date:</label>
                    <select
                        className="filter-select"
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value as any)}
                    >
                        <option value="NEWEST">Newest first</option>
                        <option value="OLDEST">Oldest first</option>
                    </select>
                </div>
            </div>

            {/* Transactions table */}
            <table className="transactions-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>External ID</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th>Customer Email</th>
                        <th>Product ID</th>
                        <th>Created At</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredTransactions.map((transaction) => (
                        <tr key={transaction.id}>
                            <td>{transaction.id}</td>
                            <td>{transaction.transactionExternalId}</td>
                            <td className="amount-cell">${transaction.amount}</td>
                            <td>
                                <span className={`status-badge ${getStatusClass(transaction.status)}`}>
                                    {transaction.status}
                                </span>
                            </td>
                            <td>{transaction.customerEmail}</td>
                            <td>{transaction.productId}</td>
                            <td className="date-cell">
                                {new Date(transaction.createdAt).toLocaleString()}
                            </td>
                            <td className="action-cell">
                                <button
                                    className={`refresh-btn ${refreshingIds.includes(transaction.id) ? 'refreshing' : ''}`}
                                    onClick={() => checkTransactionStatus(transaction)}
                                    disabled={refreshingIds.includes(transaction.id)}
                                >
                                    <RefreshIcon className={refreshingIds.includes(transaction.id) ? 'refreshing' : ''} />
                                    Refrescar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TransactionsListPage;
