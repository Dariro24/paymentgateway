import React from 'react';

interface Transaction {
    id: number;
    transactionExternalId: string;
    status: string;
    amount: string;
    customerEmail: string;
    productId: number;
    createdAt: string;
}

const TransactionsListPage: React.FC = () => {
    const [transactions, setTransactions] = React.useState<Transaction[]>([]);

    React.useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await fetch("http://localhost:3000/transactions");
                const data = await response.json();
                setTransactions(data);
            } catch (error) {
                console.error("Error fetching transactions:", error);
            }
        };

        fetchTransactions();
    }, []);

    const pendingTransactions = transactions.filter(
        (transaction) => transaction.status === "PENDING"
    );

    return (
        <div>
            <h1>Pending Transactions</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>External ID</th>
                        <th>Amount</th>
                        <th>Customer Email</th>
                        <th>Product ID</th>
                        <th>Created At</th>
                    </tr>
                </thead>
                <tbody>
                    {pendingTransactions.map((transaction) => (
                        <tr key={transaction.id}>
                            <td>{transaction.id}</td>
                            <td>{transaction.transactionExternalId}</td>
                            <td>{transaction.amount}</td>
                            <td>{transaction.customerEmail}</td>
                            <td>{transaction.productId}</td>
                            <td>{new Date(transaction.createdAt).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TransactionsListPage;