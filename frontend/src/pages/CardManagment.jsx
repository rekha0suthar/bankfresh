import React from 'react';
import Card from '../components/card/Card';
import { CardContextProvider } from '../context/CardContext';

const Cards = () => {
  return (
    <CardContextProvider>
      <Card />
    </CardContextProvider>
  );
};

export default Cards;
