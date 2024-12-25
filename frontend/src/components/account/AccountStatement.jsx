import React, { useContext, useEffect } from 'react';
import { Context } from '../../context/Context';
import StatementTable from './StatementTable';
import StatementDownload from './StatementDownload';
import Pagination from '../Pagination';

const AccountStatement = () => {
  const {
    transactions,
    getTransactions,
    loading,
    getUserAccount,
    accountNumber,
    currentPage,
    totalPages,
  } = useContext(Context);

  useEffect(() => {
    getTransactions();
    getUserAccount();
  }, [currentPage, totalPages]);

  return (
    <div className="account-summary">
      <div className="statement-header">
        <h2>Account Statement</h2>
        <StatementDownload />
      </div>
      <div className="filters">
        <div>
          <label>Account Number</label>
          <br />
          <select>
            <option value={accountNumber}>{accountNumber}</option>
          </select>
        </div>
        <div>
          <label>View Options</label>
          <br />
          <select>
            <option value="current-month">Current Month</option>
            <option value="previous-month">Previous Month</option>
            <option value="date-range">Date Range</option>
          </select>
          <br />
          <select>
            <option value="all">All</option>
            <option value="credit-only">Credit Only</option>
            <option value="debit-only">Debit Only</option>
          </select>
        </div>
        <button>Apply Filter</button>
        <button>Reset</button>
      </div>
      {!loading && transactions.length > 0 && (
        <>
          <StatementTable /> <Pagination />
        </>
      )}{' '}
      {!loading && transactions.length === 0 && (
        <p className="no-trans">No transactions found</p>
      )}
      {loading && <p className="no-trans">Loading...</p>}
    </div>
  );
};

export default AccountStatement;
