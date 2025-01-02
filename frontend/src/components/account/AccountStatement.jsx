import React, { lazy, Suspense, useContext, useEffect, useMemo } from 'react';
import { Context } from '../../context/Context';
import { getFilters } from '../../utils';
import { AccountContext } from '../../context/AccountContext';

const Filters = lazy(() => import('./Filters'));
const StatementTable = lazy(() => import('./StatementTable'));
const StatementDownload = lazy(() => import('./StatementDownload'));
const Pagination = lazy(() => import('./Pagination'));

const AccountStatement = () => {
  const {
    type,
    setType,
    time,
    setTime,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
  } = useContext(AccountContext);

  const {
    transactions,
    getTransactions,
    loading,
    getUserAccount,
    currentPage,
    totalPages,
  } = useContext(Context);

  // useMemo -- to avoid re-renders
  const filters = useMemo(
    () => getFilters(type, time, startDate, endDate),
    [type, time, startDate, endDate]
  );

  const reset = () => {
    setType('all');
    setTime('current-month');
    setStartDate('');
    setEndDate('');
    getTransactions(filters);
  };

  const handleFilter = () => {
    getTransactions(filters); // Call getTransactions with filters
  };

  useEffect(() => {
    getTransactions(filters); // Fetch transactions on initial load
  }, [currentPage, totalPages]);

  useEffect(
    () => {
      getUserAccount();
    }, // Fetch user account details
    []
  );

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="account-summary">
        <div className="statement-header">
          <h2>Account Statement</h2>
          <StatementDownload />
        </div>
        <Filters handleFilter={handleFilter} reset={reset} />
        {!loading && transactions.length > 0 && (
          <>
            <StatementTable /> {/* Pass transactions to the table */}
            <Pagination />
          </>
        )}
        {!loading && transactions.length === 0 && (
          <p className="no-trans">No transactions found</p>
        )}
        {loading && <p className="no-trans">Loading...</p>}
      </div>
    </Suspense>
  );
};

export default AccountStatement;
