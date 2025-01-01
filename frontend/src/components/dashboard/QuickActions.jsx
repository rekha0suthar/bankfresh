import React from 'react';
import { useNavigate } from 'react-router-dom';

const QuickActions = () => {
  const navigate = useNavigate();
  return (
    <>
      <button
        className="view-statement-btn"
        onClick={() => navigate('/account-summary')}
      >
        View Statement
      </button>
      <button
        className="view-statement-btn"
        onClick={() => navigate('/pay-bills')}
      >
        Pay Bills
      </button>
    </>
  );
};

export default QuickActions;
