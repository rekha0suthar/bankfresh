import React, { lazy, Suspense } from 'react';
import { CardContextProvider } from '../context/CardContext';
import { useLocation } from 'react-router-dom';
import '../styles/card.css';

const DebitCard = lazy(() => import('../components/card/DebitCard'));
const CreditCard = lazy(() => import('../components/card/CreditCard'));

const Cards = () => {
  const location = useLocation();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CardContextProvider>
        {location.pathname === '/manage-debit-card' && <DebitCard />}
        {location.pathname === '/apply-credit-card' && <CreditCard />}
      </CardContextProvider>
    </Suspense>
  );
};

export default Cards;
