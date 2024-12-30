import React from 'react';
import Wrapper from '../Wrapper';
import Container from '../Container';

const CreditCard = () => {
  return (
    <Container>
      <Wrapper heading="Apply for Credit Card">
        <div className="main-wrapper">
          <button>Apply Credit Card</button>
        </div>
      </Wrapper>
    </Container>
  );
};

export default CreditCard;
