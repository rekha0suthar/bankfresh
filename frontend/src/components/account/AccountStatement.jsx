import React, { useContext, useEffect } from 'react';
import { Context } from '../../context/Context';
import StatementTable from './StatementTable';
import StatementDownload from './StatementDownload';

const AccountStatement = () => {
  const { transactions, getTransactions, loading } = useContext(Context);

  useEffect(() => {
    getTransactions();
  }, []);

  return (
    <div className="account-summary">
      <h2>Account Statement</h2>
      <StatementDownload />
      {!loading && transactions.length > 0 && <StatementTable />}{' '}
      {!loading && transactions.length === 0 && (
        <p className="no-trans">No transactions found</p>
      )}
      {loading && <p className="no-trans">Loading...</p>}
    </div>
  );
};

export default AccountStatement;
