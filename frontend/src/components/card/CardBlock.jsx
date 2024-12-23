import React, { useContext } from 'react';
import { CardContext } from '../../context/CardContext';

const CardBlock = ({ handleBlockUnblock, text }) => {
  const { setShowBlockMsg } = useContext(CardContext);
  return (
    <div className="card-block">
      <p>Are you sure, you want to {text}?</p>
      <button onClick={handleBlockUnblock}>Yes</button>
      <button onClick={() => setShowBlockMsg(false)}>No</button>
    </div>
  );
};
export default CardBlock;
