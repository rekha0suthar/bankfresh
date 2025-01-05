# BankFresh - NetBanking Application

### Overview

BankFresh is a web-based banking application that allows users to manage their accounts, transfer funds, and
perform various banking operations. The application is built using React, Express, and a MongoDB database.

### Features

- User authentication and authorization
- Account creation and management
- Fund transfer between accounts
- Transaction history
- Account balance inquiry
- User profile management
- Pay utility bills
- Card management
- Security features (e.g., password hashing, token-based authentication)
- Error handling and logging
- API documentation
- Code organization and modularization
- Code quality and security best practices

### Setup to run application

1. Clone the repository
2. cd backend
3. npm install
4. npm start
5. cd frontend
6. npm install
7. npm start
8. Open browser and navigate to http://localhost:3000
9. Create an account and proceed with signup and login
10. Perform various banking operations

### Technologies used

- Frontend: React, Context api, React Hooks
- Backend: Node.js, Express, node-scheduler, node-mailer
- Database: MongoDB
- Authentication: JWT
- Security: Hashing

### API Documentation

#### User Endpoints -- /api/user

- **POST /create-account**: Create a new bank account
- Request Body: `{fullName, dateOfBirth, gender, nationality, email, mobileNumber,address, identityProof, pancard, accountType, captcha}`
- Response: `{newUser, message}`

- **POST /verify-otp**: Verify OTP for account creation
- Request Body: `{otp, userId}`
- Response: `{message}`

- **POST /resend-otp**: Resend OTP for account creation
- Request Body: `{userId}`
- Response: `{message}`

- **POST /signup**: Signup a new user
- Request Body: `{userId, password, mobileNumber}`
- Response: `{message}`

- **GET /captcha**: Get a captcha
- Response: `{captcha}`

- **POST /login**: Login a user
- Request Body: `{userId, customerId, password, captcha}`
- Response: `{token, user, accountId: userAccount._id, message}`

- **GET /account/:id**: Get account details
- Parameter: `userId`
- Response: `{accountNumber, customerId, debitCard}`

- **GET /user/:id**: Get user details
- Parameter: `userId`
- Response: `{user}`

- **POST /change-login-password**: Change user password
- Request Body: `{userId, oldPassword, newPassword}`
- Response: `{message}`

- **POST /forget-password**: Forget password
- Request Body: `{customerId, accountNumber, identityProof, password, captcha}`
- Response: `{message}`

### Account Endpoints -- /api/account

- **GET /:accountId/balance**: Get account balance
- Parameter: `accountId`
- Response: `{balance}`

- **GET /:accountId/debit-card**: Get debit card details
- Parameter: `accountId`
- Response: `{debitcard}`

- **GET /:accountId/account-summary**: Get account summary
- Parameter: `accountId`
- Response: `{accountDetail}`

- **POST /**: Get account details of specific account number
- Request Body: `{accountNumber}`
- Response: `{accountDetail}`

- **POST /block-unblock-card**: Block/Unblock debit card
- Request Body: `{debitcard}`
- Response: `{message}`

- **POST /generate-pin**: Generate debit card pin
- Request Body: `{debitcard, pin}`
- Response: `{message}`

- **POST /add-beneficiary**: Add beneficiary
- Request Body: `{accountId, accountNumber, beneficiaryName}`
- Response: `{message}`

- **GET /:accountId/beneficiary**: Get beneficiary list
- Parameter: `accountId`
- Response: `{beneficiaries}`

- **POST /apply-credit-card**: Apply for credit card
- Request Body: `{userId, accountNumber, cardHolder, cardType, billingAddress}`
- Response: `{message}`

- **GET /:accountId/credit-card**: Get credit cards
- Parameter: `userId`
- Response: `{creditcards}`

- **POST /block-unblock-credit-card**: Block/unblock credit card
- Request Body: `{userId, cardId}`
- Response: `{message}`

### Transaction Endpoints -- /api/transaction

- **POST /set-transaction-password**: Set transaction password
- Request Body: `{debitCard, transactionPassword}`
- Response: `{message}`

- **POST /money-transfer**: Transfer money
- Request Body: `{accountId, receiverAccountNumber, amount, purpose}`
- Response: `{message}`

- **POST /transaction-otp**: Send transaction OTP
- Request Body: `{userId}`
- Response: `{message}`

- **POST /verify-transaction-password**: Verify transaction password
- Request Body: `{ accountId, transactionPassword}`
- Response: `{message}`

- **GET /:accountId**: Get transactions list
- Parameter: `accountId`
- Response: `{transactions, totalPages, currentPage}`

- **GET /:accountId/download-statement/pdf**: Get transaction statement in PDF format
- Parameter: `accountId`
- Query: `{startDate, endDate, transactionType}
- Response: `{transactionPdf}

- **GET /:accountId/download-statement/csv**: Get transaction statement in CSV format
- Parameter: `accountId`
- Query: `{startDate, endDate, transactionType}
- Response: `{transactionCSV}

### Bill Endpoints -- /api/bill

- **GET /:accountId**: Get bill payment list
- Parameter: `accountId`
- Response: `{bills}`

- **POST /pay-utility-bill**: Pay utility bill
- Request Body: `{accountId, billNumber, amount}`
- Response: `{message}`
