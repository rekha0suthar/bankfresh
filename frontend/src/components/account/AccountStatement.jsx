import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../context/Context';
import StatementTable from './StatementTable';
import StatementDownload from './StatementDownload';
import Pagination from './Pagination';
import { getFilters } from '../../utils';
import Filters from './Filters';

const AccountStatement = () => {
  const [type, setType] = useState('all');
  const [time, setTime] = useState('current-month');
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const {
    transactions,
    getTransactions,
    loading,
    getUserAccount,
    currentPage,
    totalPages,
  } = useContext(Context);

  const reset = () => {
    setType('all');
    setTime('current-month');
    setStartDate('');
    setEndDate('');
    getTransactions(getFilters(type, time, startDate, endDate));
  };

  const handleFilter = () => {
    getTransactions(getFilters(type, time, startDate, endDate)); // Call getTransactions with filters
  };

  useEffect(() => {
    getTransactions(getFilters(type, time, startDate, endDate)); // Fetch transactions on initial load
  }, [currentPage, totalPages]);

  useEffect(
    () => {
      getUserAccount();
    }, // Fetch user account details
    []
  );

  return (
    <div className="account-summary">
      <div className="statement-header">
        <h2>Account Statement</h2>
        <StatementDownload
          initialDate={startDate}
          finalDate={endDate}
          time={time}
          type={type}
        />
      </div>
      <Filters
        time={time}
        setTime={setTime}
        type={type}
        setType={setType}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        handleFilter={handleFilter}
        reset={reset}
      />
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
  );
};

export default AccountStatement;
