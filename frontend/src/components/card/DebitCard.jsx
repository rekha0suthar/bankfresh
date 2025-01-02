import React, { lazy, Suspense, useContext, useEffect } from 'react';
import { CardContext } from '../../context/CardContext';
import { Context } from '../../context/Context';
import { toast } from 'react-toastify';

const Container = lazy(() => import('../dashboard/Container'));
const Wrapper = lazy(() => import('../dashboard/Wrapper'));
const CardBlock = lazy(() => import('./CardBlock'));
const SetPin = lazy(() => import('./SetPin'));
const CardDetails = lazy(() => import('./CardInfo'));

const DebitCard = () => {
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
    <Suspense fallback={<div>Loading...</div>}>
      <Container>
        <Wrapper heading="Manage Debit Card">
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
            {showPinMsg && <SetPin handleGeneratePin={handleGeneratePin} />}
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
        </Wrapper>{' '}
      </Container>
    </Suspense>
  );
};

export default DebitCard;
