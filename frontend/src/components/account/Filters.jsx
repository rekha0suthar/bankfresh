import React, { useContext } from 'react';
import { Context } from '../../context/Context';

const Filters = ({
  time,
  setTime,
  type,
  setType,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  handleFilter,
  reset,
}) => {
  const { accountNumber } = useContext(Context);
  return (
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
        <select value={time} onChange={(e) => setTime(e.target.value)}>
          <option value="current-month">Current Month</option>
          <option value="previous-month">Previous Month</option>
          <option value="date-range">Date Range</option>
        </select>
        <br />
        {time === 'date-range' && (
          <div>
            <label> Date From</label>
            <br />
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <br />
            <label> Date To</label>
            <br />
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        )}
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="all">All</option>
          <option value="credit-only">Credit Only</option>
          <option value="debit-only">Debit Only</option>
        </select>
      </div>
      <button onClick={handleFilter}>Apply Filter</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
};

export default Filters;
