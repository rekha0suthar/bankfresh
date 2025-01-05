import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../context/Context';
import '../../styles/dashboard.css';
import { formatCardNumber } from '../../utils';

const DebitCard = () => {
  const { debitCard, getDebitCard } = useContext(Context);
  const [flipCard, setFlipCard] = useState(false);

  const { cardNumber, cvv, issueMonth, issueYear, expiryMonth, expiryYear } =
    debitCard;

  const onFlipCard = () => setFlipCard(!flipCard);

  useEffect(() => {
    getDebitCard();
  }, []);
  return (
    <>
      {!flipCard ? (
        <div className="debit-card" onClick={onFlipCard}>
          <h2>BankFresh</h2>
          <h3>{formatCardNumber(cardNumber)}</h3>
          <div className="card-dates">
            <p>
              <span style={{ fontSize: '8px' }}>
                VALID <br />
                FROM
              </span>
              <span style={{ fontSize: '12px' }}>
                {issueMonth}/{issueYear}
              </span>
            </p>
            <p>
              <span style={{ fontSize: '8px' }}>
                VALID <br /> THRU
              </span>
              <span style={{ fontSize: '12px' }}>
                {expiryMonth}/{expiryYear}
              </span>{' '}
            </p>
          </div>
        </div>
      ) : (
        <div className="debit-card-back" onClick={onFlipCard}>
          <h2>BankFresh</h2>
          <h3>{cvv}</h3>
        </div>
      )}
    </>
  );
};

export default DebitCard;
