import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../context/Context';
import AccountDetail from './AccountDetail';
import { useNavigate } from 'react-router-dom';
import { MoneyContext } from '../../context/MoneyContext';
import { toast } from 'react-toastify';
import { getBeneficiaryApi } from '../../apis';
import Beneficiary from './Beneficiary';

const Payment = () => {
  const [showAccount, setShowAccount] = useState(false);
  const {
    inputAccount,
    setInputAccount,
    inputAmount,
    setInputAmount,
    purpose,
    setPurpose,
    setConfirmTransfer,
    beneficiaries,
    setBeneficiaries,
  } = useContext(MoneyContext);
  const { account, balance, userAccount, getAccount, setLoading } =
    useContext(Context);
  const navigate = useNavigate();

  const handleAccount = async () => {
    setShowAccount(true);
    await getAccount(inputAccount);
  };

  const handleTransfer = () => {
    if (inputAmount && purpose) {
      setConfirmTransfer(true);
    } else {
      toast.error('Amount and purpose are required');
    }
  };
  const getBeneficiaries = async () => {
    setLoading(true);
    try {
      const accountId = localStorage.getItem('accountId');

      const { data } = await getBeneficiaryApi(accountId);
      setBeneficiaries(data);
    } catch (error) {
      toast.error('Failed to fetch beneficiaries.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBeneficiaries();
  }, []); // Add account as a dependency to re-fetch beneficiaries when account changes

  return (
    <div className="main-wrapper money-transfer">
      <div>
        <label>Account to be debited</label>
        <br />
        <select>
          <option value="">{account?.accountNumber}</option>
        </select>
      </div>
      <strong>Balance: ₹{balance}</strong>
      <div>
        <label>Account to be credited</label> <br />
        <input
          type="text"
          value={inputAccount}
          onChange={(e) => setInputAccount(e.target.value)}
        />
        <button onClick={handleAccount}>Fetch Account</button>
        <button onClick={() => navigate('/add-beneficiary')}>
          Add Beneficiary
        </button>
      </div>
      <div>
        {beneficiaries.map((beneficiary) => (
          <Beneficiary
            key={beneficiary.accountId}
            beneficiary={beneficiary}
            setShowAccount={setShowAccount}
          />
        ))}
      </div>
      {showAccount &&
        (Object.keys(userAccount).length !== 0 || beneficiaries.length !== 0 ? (
          <>
            {Object.keys(userAccount).length !== 0 && <AccountDetail />}
            <div>
              <input
                type="text"
                placeholder="₹ Amount"
                className="trans-input"
                value={inputAmount}
                onChange={(e) => setInputAmount(e.target.value)}
                required
              />
              <br />
              <input
                type="text"
                placeholder="Purpose"
                className="trans-input"
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                required
              />
            </div>
          </>
        ) : (
          <p style={{ marginTop: '10px' }}>No Account found</p>
        ))}
      <div>
        <h3>Note:</h3>
        <ul>
          <li>
            1.Please note that the funds transfer to the newly added
            beneficiaries are disabled till 4 hours from the time of beneficiary
            addition.
          </li>
          <li>
            2.From 4 hours till 24 hours, up to Rs. 50000 can be transferred.
            After 24 hours you can transfer up to your permitted limit.
          </li>
        </ul>
      </div>
      <button onClick={handleTransfer}>Transfer</button>
      <button onClick={() => navigate('/dashboard')}>Cancel</button>
    </div>
  );
};

export default Payment;
