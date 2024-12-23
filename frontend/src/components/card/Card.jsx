import React, { useContext, useEffect } from 'react';
import HigherOrderComponent from '../HigherOrderComponent';
import { CardContext } from '../../context/CardContext';
import PinGenerater from '../PinGenerater';
import CardDetails from './CardInfo';
import CardBlock from './CardBlock';
import { Context } from '../../context/Context';
import { toast } from 'react-toastify';

const Card = () => {
  const {
    showBlockMsg,
    setShowBlockMsg,
    showCardDetail,
    setShowCardDetail,
    showPinMsg,
    setShowPinMsg,
    pin,
    confirmPin,
  } = useContext(CardContext);
  const { debitCard, blockUnblockDebitCart, getDebitCard, generateCardPin } =
    useContext(Context);

  const handleBlockUnblock = async () => {
    await blockUnblockDebitCart();
    setShowBlockMsg(false);
    getDebitCard();
  };

  const handleGeneratePin = async () => {
    if (pin.length !== 4) {
      toast.error('Pin should be 4 digit number');
    } else if (pin !== confirmPin) {
      toast.error('Incorrect match');
    } else {
      await generateCardPin(pin);
      setShowPinMsg(false);
    }
  };

  useEffect(() => {
    getDebitCard();
  }, []);

  return (
    <HigherOrderComponent>
      <div className="main-container">
        <h2 className="heading">Manage Debit Card</h2>
        <div className="main-wrapper">
          <h4>
            <input type="radio" />
            {debitCard.cardNumber}
          </h4>
          {showBlockMsg && (
            <CardBlock
              handleBlockUnblock={handleBlockUnblock}
              text={debitCard.blocked ? 'Unblock Card' : 'Block Card'}
            />
          )}
          {showPinMsg && <PinGenerater handleGeneratePin={handleGeneratePin} />}
          {showCardDetail && <CardDetails />}
          <button
            onClick={() => {
              setShowBlockMsg(true);
              setShowCardDetail(false);
              setShowPinMsg(false);
            }}
          >
            {debitCard.blocked ? 'Unblock Card' : 'Block Card'}
          </button>
          <button
            onClick={() => {
              setShowCardDetail(true);
              setShowBlockMsg(false);
              setShowPinMsg(false);
            }}
          >
            Show Card Details
          </button>
          <button
            onClick={() => {
              setShowPinMsg(true);
              setShowBlockMsg(false);
              setShowCardDetail(false);
            }}
          >
            Generate PIN
          </button>
        </div>
      </div>{' '}
    </HigherOrderComponent>
  );
};

export default Card;