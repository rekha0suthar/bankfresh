import React, { lazy, Suspense, useContext, useEffect, useState } from 'react';
import { Context } from '../../context/Context';
import { CardContext } from '../../context/CardContext';
import {
  applyCreditCardApi,
  blockUnblockCreditCartApi,
  getCreditCardApi,
} from '../../apis';
import { toast } from 'react-toastify';

const Wrapper = lazy(() => import('../dashboard/Wrapper'));
const Container = lazy(() => import('../dashboard/Container'));
const Input = lazy(() => import('../form/Input'));

const CreditCard = () => {
  const {
    billingAddress,
    setBillingAddress,
    cardHolder,
    setCardHolder,
    cardType,
    setCardType,
    creditCards,
    setCreditCards,
    accountNumber,
    setAccountNumber,
  } = useContext(CardContext);
  const [showCard, setShowCard] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState('');

  const userId = localStorage.getItem('userId');

  const applyCreditCard = async () => {
    try {
      if (!accountNumber || !cardHolder || !cardType || !billingAddress) {
        toast.error('Please fill in all fields');
        return;
      }

      const { data } = await applyCreditCardApi({
        userId,
        accountNumber,
        cardHolder,
        cardType,
        billingAddress,
      });
      setBillingAddress('');
      setCardHolder('');
      setCardType('');
      toast.success(data?.msg);
      getCreditCards();
    } catch (error) {
      toast.error(error.response.data?.msg);
    }
  };

  const getCreditCard = (id) => {
    setShowCard(true);
    setSelectedCardId(id);
  };

  const getCreditCards = async () => {
    try {
      const { data } = await getCreditCardApi(userId);
      setCreditCards(data || []);
    } catch (error) {
      toast.error(error.response.data?.msg);
    }
  };

  const blockUnblockCard = async (cardId) => {
    try {
      const { data } = await blockUnblockCreditCartApi({ userId, cardId });
      getCreditCards();
      toast.success(data?.msg);
    } catch (error) {
      toast.error(error.response.data?.msg);
    }
  };

  useEffect(() => {
    getCreditCards();
  }, []);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Container>
        <Wrapper heading="Apply for Credit Card">
          <div className="main-wrapper">
            <div className="credit-card-container">
              <div className="card-form">
                <label>Account Number</label> <br />
                <Input value={accountNumber} setValue={setAccountNumber} />
                <br />
                <label>Card Holder Name</label>
                <br />
                <Input value={cardHolder} setValue={setCardHolder} />
                <br />
                <label>Card Type</label>
                <br />
                <select
                  value={cardType}
                  onChange={(e) => setCardType(e.target.value)}
                  className="card-select"
                >
                  <option value="Basic">Basic</option>
                  <option value="Gold">Gold</option>
                  <option value="Premium">Premium</option>
                </select>
                <br />
                <label>Billing Address</label>
                <br />
                <Input
                  value={billingAddress}
                  setValue={setBillingAddress}
                />{' '}
                <br />
                <button className="btn-mt" onClick={applyCreditCard}>
                  Apply Credit Card
                </button>{' '}
              </div>
              <div className="credit-cards">
                <h2>Credit Cards</h2>
                {creditCards.length > 0 &&
                  creditCards.map((creditCard) => (
                    <div key={creditCard._id}>
                      <h3 onClick={() => getCreditCard(creditCard._id)}>
                        <input type="radio" /> {creditCard.cardNumber}
                      </h3>
                      {showCard && selectedCardId === creditCard._id && (
                        <div className="card-info" key={creditCard._id}>
                          <p>Card Holder: {creditCard.cardHolder}</p>
                          <p>Card Type: {creditCard.cardType}</p>
                          <p>Cvv: {creditCard.cvv}</p>
                          <p>Card status: {creditCard.cardStatus}</p>
                          <p>Card Limit: {creditCard.cardLimit}</p>
                          <p>Billing Address: {creditCard.billingAddress}</p>

                          <button onClick={() => setShowCard(false)}>
                            Close
                          </button>
                          <button
                            onClick={() => blockUnblockCard(creditCard._id)}
                          >
                            {creditCard.cardStatus === 'Active'
                              ? 'Block'
                              : 'Unblock'}
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                {creditCards.length === 0 && <p>No credit cards found</p>}
              </div>
            </div>
          </div>
        </Wrapper>
      </Container>
    </Suspense>
  );
};

export default CreditCard;
