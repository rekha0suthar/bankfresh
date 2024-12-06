import React, { useContext } from 'react';
import { Context } from '../context/Context';

const Address = () => {
  const { address, setAddress } = useContext(Context);
  return (
    <div className="address">
      <label className="label-box">
        Address<span>*</span>
      </label>
      <div className="address-fields">
        <div style={{ display: 'flex' }}>
          <input
            type="text"
            placeholder="Street"
            value={address.street}
            onChange={(e) => setAddress({ ...address, street: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="City"
            value={address.city}
            onChange={(e) => setAddress({ ...address, city: e.target.value })}
            required
          />
        </div>
        <div style={{ display: 'flex' }}>
          <input
            type="text"
            placeholder="State"
            value={address.state}
            onChange={(e) => setAddress({ ...address, state: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Country"
            value={address.country}
            onChange={(e) =>
              setAddress({ ...address, country: e.target.value })
            }
            required
          />
        </div>
        <input
          type="text"
          placeholder="Postal Code"
          value={address.postalCode}
          onChange={(e) =>
            setAddress({ ...address, postalCode: e.target.value })
          }
          min={6}
          max={6}
          required
        />
      </div>{' '}
    </div>
  );
};

export default Address;
