import React, { useContext, useState } from 'react';
import { Context } from '../../context/Context';

const StatementDownload = () => {
  const [formatType, setFormatType] = useState('pdf');

  const { downloadStatement } = useContext(Context);
  return (
    <>
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
    </>
  );
};

export default StatementDownload;
