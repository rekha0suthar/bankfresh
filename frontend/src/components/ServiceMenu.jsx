import React from 'react';
import '../styles/dashboard.css';
import { ImUsers } from 'react-icons/im';
import { MdOutlineCompareArrows } from 'react-icons/md';
import { FaCreditCard } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

const ServiceMenu = () => {
  const navigate = useNavigate();
  return (
    <div className="side-bar-container">
      <div className="services" onClick={() => navigate('/account-summary')}>
        <ImUsers />
        <p>Accounts & Services</p>
      </div>
      <div className="services" onClick={() => navigate('/money-transfer')}>
        <MdOutlineCompareArrows />
        <p>Pay & Transfer</p>
      </div>
      <div className="services" onClick={() => navigate('/cards')}>
        <FaCreditCard />
        <p>Cards</p>
      </div>
    </div>
  );
};

export default ServiceMenu;
