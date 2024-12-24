import React, { useContext, useEffect } from 'react';
import { Context } from '../context/Context';

const AccountStatement = () => {
  const [formatType, setFormatType] = React.useState('pdf');
  const { transactions, getTransactions, downloadStatement } =
    useContext(Context);
  useEffect(() => {
    getTransactions();
  }, []);
  return (
    <div className="account-summary">
      <h2>Account Statement</h2>
      <select
        value={formatType}
        onChange={(e) => setFormatType(e.target.value)}
      >
        <option value="pdf">PDF</option>
        <option value="csv">CSV</option>
      </select>
      <button onClick={() => downloadStatement(formatType)}>
        Download Statement
      </button>
      {transactions.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Transaction Date</th>
              <th>Description</th>
              <th> Amount</th>
              <th>Balance</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>
                  {new Date(transaction.transactionDate).toLocaleString()}
                </td>
                <td>
                  {transaction.description}/from{' '}
                  {transaction.senderAccountNumber}
                  /to {transaction.receiverAccountNumber}
                </td>
                <td>
                  ₹ {transaction.amount}
                  {transaction.transactionType === 'Debit' ? ' Dr' : ' Cr'}
                </td>
                <td>₹ {transaction.balance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="no-trans">No transactions found</p>
      )}
    </div>
  );
};

export default AccountStatement;
