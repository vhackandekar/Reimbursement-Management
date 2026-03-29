# Reimbursement Management System API

A production-ready backend built with Node.js, Express.js, and MySQL.

## Features
- **Company & Admin Setup**: Auto currency detection via restcountries API.
- **User Management**: Admin can create users, assign roles, and managers.
- **Expense Management**: Draft/Submit expenses with receipt upload (Multer) and auto-conversion (ExchangeRate API).
- **Approval Workflow**:
    - Sequential/Parallel approval logic.
    - Conditional Rules (Percentage based, Specific Approver, Hybrid).
    - Role-based Access Control (Admin, Manager, Employee).

## Prerequisites
- Node.js installed.
- MySQL server running.

## Setup Instructions

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/vhackandekar/Reimbursement-Management.git
    cd Reimbursement-Management
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Database Configuration**:
    - Create a MySQL database named `reimbursement_db`.
    - Run the SQL schema found in `database.sql`.

4.  **Environment Variables**:
    - Create a `.env` file from `.env.example`.
    - Provide your DB credentials and `EXCHANGE_RATE_API_KEY`.

5.  **Run the application**:
    - For development: `npm run dev` (uses nodemon)
    - For production: `node server.js`

## API Endpoints

### Authentication
- `POST /api/auth/signup`: Create company and admin.
- `POST /api/auth/login`: Login for users.

### User Management (Admin)
- `POST /api/users/create`: Create New Employee/Manager.
- `GET /api/users/`: List all company users.
- `PUT /api/users/assign-manager`: Update manager of an employee.
- `PUT /api/users/update-role`: Update role of a user.

### Expense Management
- `POST /api/expenses`: Save or submit an expense with receipt.
- `GET /api/expenses/my`: View own expenses.
- `GET /api/expenses/all`: View expenses based on role permissions.

### Approvals
- `GET /api/approvals/pending`: View pending approvals.
- `POST /api/approvals/:id/approve`: Approve an expense.
- `POST /api/approvals/:id/reject`: Reject an expense.

---
Created by Antigravity AI
