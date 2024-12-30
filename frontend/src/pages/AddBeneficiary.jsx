import React, { useContext, useState } from 'react';
import Container from '../components/Container';
import Wrapper from '../components/Wrapper';
import InputGroup from '../components/form/InputGroup';
import { Context } from '../context/Context';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AddBeneficiary = () => {
  const [beneficiaryName, setBeneficiaryName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [confirmAccountNumber, setConfirmAccountNumber] = useState('');

  const { addBeneficiary, loading } = useContext(Context);
  const navigate = useNavigate();

  const handleBeneficiary = async () => {
    if (beneficiaryName && accountNumber && confirmAccountNumber) {
      if (accountNumber === confirmAccountNumber) {
        addBeneficiary(accountNumber, beneficiaryName);
        setBeneficiaryName('');
        setAccountNumber('');
        setConfirmAccountNumber('');
      } else {
        toast.error('Accountdoes does not match');
      }
    } else {
      toast.error('Please fill all fields');
    }
  };
  return (
    <Container>
      <Wrapper heading="Add Beneficiary">
        <div className="main-wrapper">
          <InputGroup
            labelValue="Account Number"
            nameValue="accountNumber"
            divClass="beneficiary-form"
            inputValue={accountNumber}
            setInputValue={setAccountNumber}
          />
          <InputGroup
            labelValue="Confirm Account Number"
            nameValue="confirmAccountNumber"
            divClass="beneficiary-form"
            inputValue={confirmAccountNumber}
            setInputValue={setConfirmAccountNumber}
          />
          <InputGroup
            labelValue="Beneficiary Name"
            nameValue="beneficiaryName"
            divClass="beneficiary-form"
            inputValue={beneficiaryName}
            setInputValue={setBeneficiaryName}
          />
          <button onClick={handleBeneficiary}>
            {loading ? 'Submitting...' : 'Submit'}
          </button>
          <button onClick={() => navigate('/money-transfer')}>Cancel</button>
        </div>
      </Wrapper>
    </Container>
  );
};

export default AddBeneficiary;
