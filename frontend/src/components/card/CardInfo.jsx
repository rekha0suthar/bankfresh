import React, { useContext } from 'react';
import { Context } from '../../context/Context';
import { CardContext } from '../../context/CardContext';

const CardDetails = () => {
  const { debitCard } = useContext(Context);
  const { setShowCardDetail } = useContext(CardContext);
  return (
    <div className="card-details">
      <span>
        <p>Issue Date</p>
        <p>
          {debitCard?.issueMonth}/{debitCard?.issueYear}
        </p>
      </span>
      <span>
        <p>Expiry Date</p>
        <p>
          {debitCard?.expiryMonth}/{debitCard?.expiryYear}
        </p>
      </span>
      <span>
        <p>Cvv</p>
        <p>{debitCard?.cvv}</p>
      </span>
      <span>
        <p>Active</p>
        <p>{debitCard?.active ? 'Yes' : 'No'}</p>
      </span>
      <span>
        <p>Blocked</p>
        <p>{debitCard?.blocked ? 'Yes' : 'No'}</p>
      </span>
      <button onClick={() => setShowCardDetail(false)}>Hide</button>
    </div>
  );
};

export default CardDetails;
