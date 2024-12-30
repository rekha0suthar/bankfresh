import React from 'react';
import '../styles/dashboard.css';
import { ImUsers } from 'react-icons/im';
import { MdOutlineCompareArrows } from 'react-icons/md';
import { FaCreditCard } from 'react-icons/fa6';
import { useLocation, useNavigate } from 'react-router-dom';

const services = [
  {
    name: 'Accounts & Services',
    icon: <ImUsers />,
    path: '/account-summary',
  },
  {
    name: 'Pay & Transfer',
    icon: <MdOutlineCompareArrows />,
    path: '/money-transfer',
  },
  {
    name: 'Cards',
    icon: <FaCreditCard />,
    path: '/manage-debit-card',
  },
];

const ServiceMenu = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="service-menu-container">
      {services.map((service) => (
        <div
          className={`services ${
            location.pathname === service.path && 'active'
          }`}
          onClick={() => navigate(service.path)}
          key={service.name}
        >
          {service.icon}
          {service.name}
        </div>
      ))}
    </div>
  );
};

export default ServiceMenu;
