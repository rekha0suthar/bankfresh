import React, { lazy, Suspense, useEffect, useState } from 'react';
import { getBillsApi, payUtilityBillApi } from '../apis';
import { formatDate, months } from '../utils';
import { toast } from 'react-toastify';

const Container = lazy(() => import('../components/dashboard/Container'));
const Wrapper = lazy(() => import('../components/dashboard/Wrapper'));

const PayBills = () => {
  const [bills, setBills] = useState([]);
  const [bill, setBill] = useState({});
  const [showBill, setShowBill] = useState(false);
  const [confirm, setConfirm] = useState(false);

  const userId = localStorage.getItem('userId');

  const getBills = async () => {
    const { data } = await getBillsApi(userId);
    setBills(data);
  };

  const getBill = (billNumber) => {
    const detail = bills.filter((bill) => bill.billNumber === billNumber);
    setBill(...detail);
    setShowBill(true);
  };

  const payUtilityBill = async () => {
    try {
      const { data } = await payUtilityBillApi({
        userId,
        billNumber: bill.billNumber,
        amount: bill.amount,
      });
      setConfirm(false);
      getBills();
      toast.success(data?.msg);
    } catch (err) {
      console.log(err);
      toast.error(err.response.data?.msg);
    }
  };

  useEffect(() => {
    getBills();
  }, [setBills]);
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Container>
        <Wrapper heading="Manage Bills">
          <div className="main-wrapper">
            {!showBill ? (
              <div className="bills">
                {bills.map((bill) => (
                  <div key={bill._id} className="bill">
                    <h3>
                      {bill.utilityType} -{' '}
                      {months[new Date(bill.billDate).getMonth()]}
                    </h3>
                    <button onClick={() => getBill(bill.billNumber)}>
                      Open Bill
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bill-detail">
                <h2>{bill.utilityType}</h2> <p>Amount: ₹ {bill.amount}</p>
                <p>Status: {bill.status}</p>
                <p>Bill Date: {formatDate(bill.billDate)}</p>
                <p>Due Date: {formatDate(bill.dueDate)}</p>
                {confirm && (
                  <div className="confirm-message">
                    <p>Are you sure you want to pay this bill?</p>
                    <button onClick={payUtilityBill}>Yes</button>
                    <button onClick={() => setConfirm(false)}>No</button>
                  </div>
                )}
                <button
                  onClick={() => setConfirm(true)}
                  disabled={bill.status === 'Paid'}
                >
                  {bill.status === 'Pending' ? 'Pay' : 'Paid'}
                </button>
                <button onClick={() => setShowBill(false)}>Close</button>
              </div>
            )}
          </div>
        </Wrapper>
      </Container>
    </Suspense>
  );
};

export default PayBills;
