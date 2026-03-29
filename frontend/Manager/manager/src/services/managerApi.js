import axios from 'axios';

const teamExpenses = [
  {
    id: 'exp-101',
    subject: 'Client Dinner - Tokyo',
    owner: 'Sarah Connor',
    category: 'Food',
    status: 'Pending',
    amount: 567.00,
    currency: 'USD',
    convertedAmount: 49896.00,
    convertedCurrency: 'INR',
    date: '2026-03-15',
    description: 'Project wrap-up dinner with stakeholders.'
  },
  {
    id: 'exp-102',
    subject: 'Travel to London',
    owner: 'John Doe',
    category: 'Travel',
    status: 'Approved',
    amount: 120.00,
    currency: 'USD',
    convertedAmount: 10560.00,
    convertedCurrency: 'INR',
    date: '2026-03-12',
    description: 'Taxi and local transport.'
  }
];

export const managerApi = {
  getPendingApprovals: async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return teamExpenses.filter(exp => exp.status === 'Pending');
  },
  
  getTeamExpenses: async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return teamExpenses;
  },
  
  updateExpenseStatus: async (id, status) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    const index = teamExpenses.findIndex(ex => ex.id === id);
    if (index !== -1) {
      teamExpenses[index].status = status;
      return { success: true, updatedExpense: teamExpenses[index] };
    }
    return { success: false, error: 'Expense not found' };
  },
  
  getManagerStats: async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return {
      pendingCount: teamExpenses.filter(e => e.status === 'Pending').length,
      approvedCount: teamExpenses.filter(e => e.status === 'Approved').length,
      totalTeamSpend: teamExpenses.reduce((sum, e) => sum + e.convertedAmount, 0),
      currency: 'INR'
    };
  }
};
