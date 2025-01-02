import React, { useContext, useMemo, useState } from 'react';
import { Context } from '../../context/Context';
import { getFilters } from '../../utils';
import { AccountContext } from '../../context/AccountContext';

const StatementDownload = () => {
  const [formatType, setFormatType] = useState('pdf');

  const {
    startDate: initialDate,
    endDate: finalDate,
    time,
    type,
  } = useContext(AccountContext);
  const { downloadStatement } = useContext(Context);

  // useMemo -- to avoid re-renders
  const filters = useMemo(
    () => getFilters(type, time, initialDate, finalDate),
    [type, time, initialDate, finalDate]
  );

  const handleDownload = () => {
    const { transactionType, startDate, endDate } = filters;
    downloadStatement(formatType, startDate, endDate, transactionType);
  };
  return (
    <div>
      <select
        value={formatType}
        onChange={(e) => setFormatType(e.target.value)}
      >
        <option value="pdf">PDF</option>
        <option value="csv">CSV</option>
      </select>
      <button onClick={handleDownload}>Download</button>{' '}
    </div>
  );
};

export default StatementDownload;
