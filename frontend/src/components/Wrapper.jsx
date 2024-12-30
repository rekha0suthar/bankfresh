import React from 'react';
import { formatISOTime } from '../utils';
import SideMenu from './SideMenu';
import { useLocation } from 'react-router-dom';

const Wrapper = ({ children, heading }) => {
  const subServices = [
    {
      name: 'Manage Debit Card',
      path: '/manage-debit-card',
    },
    {
      name: 'Apply for Credit Card',
      path: '/apply-credit-card',
    },
  ];
  const location = useLocation();
  return (
    <div className="main-container">
      <div className="card-container">
        {location.pathname.includes('card') && (
          <div className="side-menu">
            {subServices?.map((subService) => (
              <SideMenu key={subService.name} subService={subService} />
            ))}
          </div>
        )}
        <div className="main-section">
          <div className="header">
            <h3 className="heading">{heading}</h3>
            <h3>{formatISOTime()}</h3>
          </div>
          {children}
        </div>{' '}
      </div>
    </div>
  );
};

export default Wrapper;
