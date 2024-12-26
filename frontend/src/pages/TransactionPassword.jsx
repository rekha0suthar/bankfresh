import React, { useContext, useEffect, useState } from 'react';
import Container from '../components/Container';
import { Context } from '../context/Context';
import { useNavigate } from 'react-router-dom';
import CardDetail from '../components/card/CardDetail';
import SetTransactionPassword from '../components/payment/SetTransactionPassword';

const TransactionPassword = () => {
  const [transPass, setTransPass] = useState('');
  const [confirmTransPass, setConfirmTransPass] = useState('');
  const [cardDetail, setCardDetail] = React.useState({
    expiryMonth: '',
    expiryYear: '',
    pin: '',
  });
  const [next, setNext] = useState(false);
  const [error, setError] = useState(false);
  const { debitCard, getDebitCard, setTransactionPassword } =
    useContext(Context);
  const navigate = useNavigate('');

  const handleNext = () => {
    setError(false);
    if (
      cardDetail.pin === debitCard.pin &&
      cardDetail.expiryMonth === debitCard.expiryMonth &&
      cardDetail.expiryYear === debitCard.expiryYear
    ) {
      setNext(true);
    } else {
      setError(true);
    }
  };

  const handleTransactionPassword = async () => {
    if (transPass === confirmTransPass && transPass.length >= 6) {
      await setTransactionPassword(transPass);
      navigate('/dashboard');
    } else {
      setError(true);
    }
  };

  const clearInput = () => {
    setTransPass('');
    setConfirmTransPass('');
  };

  useEffect(() => {
    getDebitCard();
  }, []);
  return (
    <Container>
      <div className="main-container">
        <h2 className="heading">Generate New Transaction Password</h2>
        <div className="main-wrapper">
          {!next ? (
            <CardDetail
              debitCard={debitCard}
              cardDetail={cardDetail}
              setCardDetail={setCardDetail}
              navigate={navigate}
              handleNext={handleNext}
              error={error}
            />
          ) : (
            <SetTransactionPassword
              transPass={transPass}
              setTransPass={setTransPass}
              confirmTransPass={confirmTransPass}
              setConfirmTransPass={setConfirmTransPass}
              handleTransactionPassword={handleTransactionPassword}
              error={error}
              clearInput={clearInput}
            />
          )}
        </div>
      </div>
    </Container>
  );
};

export default TransactionPassword;
