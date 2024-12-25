import React, { useContext } from 'react';
import { Context } from '../../context/Context';

const StatementTable = () => {
  const { transactions } = useContext(Context);
  return (
    <table className="statement-table">
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
            <td>{new Date(transaction.transactionDate).toLocaleString()}</td>
            <td className="desc">
              {transaction.description}/ from {transaction.senderAccountNumber}/
              to {transaction.receiverAccountNumber}/
              {new Date(transaction.transactionDate).toLocaleString()}
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
  );
};

export default StatementTable;
