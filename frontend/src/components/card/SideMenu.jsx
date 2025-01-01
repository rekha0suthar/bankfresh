import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const SideMenu = ({ subService }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div
      className={`sub-menu ${
        location.pathname === subService.path && 'active'
      }`}
      onClick={() => navigate(subService.path)}
      key={subService.name}
    >
      {subService.name}
    </div>
  );
};

export default SideMenu;
