import React, { lazy, Suspense } from 'react';

const Wrapper = lazy(() => import('../dashboard/Wrapper'));
const Container = lazy(() => import('../dashboard/Container'));

const CreditCard = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Container>
        <Wrapper heading="Apply for Credit Card">
          <div className="main-wrapper">
            <button>Apply Credit Card</button>
          </div>
        </Wrapper>
      </Container>
    </Suspense>
  );
};

export default CreditCard;
