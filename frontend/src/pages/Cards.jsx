import React from 'react';
import DebitCard from '../components/card/DebitCard';
import { CardContextProvider } from '../context/CardContext';
import { useLocation } from 'react-router-dom';
import CreditCard from '../components/card/CreditCard';
import '../styles/card.css';

const Cards = () => {
  const location = useLocation();

  return (
    <CardContextProvider>
      {location.pathname === '/manage-debit-card' && <DebitCard />}
      {location.pathname === '/apply-credit-card' && <CreditCard />}
    </CardContextProvider>
  );
};

export default Cards;
