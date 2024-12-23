import React from 'react';

const CardDetail = ({
  debitCard,
  cardDetail,
  setCardDetail,
  navigate,
  handleNext,
  error,
}) => {
  return (
    <div className="transaction-password">
      <span>
        <p>Card Number</p>
        <p>
          <input type="radio" /> {debitCard.cardNumber}
        </p>
      </span>
      <span>
        <p>Enter ATM PIN *</p>
        <input
          type="text"
          placeholder="ATM Pin"
          style={{ width: '200px' }}
          value={cardDetail?.pin}
          onChange={(e) =>
            setCardDetail({ ...cardDetail, pin: e.target.value })
          }
        />
      </span>
      <span>
        <p>Expiry Date</p>
        <p>
          <input
            type="text"
            placeholder="MM"
            value={cardDetail?.expiryMonth}
            onChange={(e) =>
              setCardDetail({ ...cardDetail, expiryMonth: e.target.value })
            }
            style={{ width: '100px', marginRight: '10px' }}
          />
          <input
            type="text"
            placeholder="YYYY"
            value={cardDetail?.expiryYear}
            onChange={(e) =>
              setCardDetail({ ...cardDetail, expiryYear: e.target.value })
            }
            style={{ width: '100px' }}
          />
        </p>
      </span>
      {error && <p style={{ color: 'red' }}>Incorrect Card Detail</p>}
      <button onClick={handleNext}>Next</button>
      <button onClick={() => navigate('/dashboard')}>Cancel</button>
    </div>
  );
};

export default CardDetail;
