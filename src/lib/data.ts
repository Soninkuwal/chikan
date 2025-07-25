export type User = {
  id: string;
  name: string;
  email: string;
  balance: number;
  status: 'Active' | 'Banned';
  kyc: 'Verified' | 'Pending' | 'Not Submitted';
  joined: string;
};

export type Admin = {
    id: string;
    name: string;
    email: string;
    walletBalance: number;
    status: 'Active' | 'Suspended';
    joined: string;
    permissions: string[];
}

export type WithdrawalRequest = {
  id: string;
  userId: string;
  user: string;
  amount: number;
  date: string;
  method: 'Bank' | 'UPI';
  details: string;
  status: 'Pending' | 'Approved' | 'Rejected';
};

export type DepositRequest = {
  id: string;
  userId: string;
  user: string;
  amount: number;
  date: string;
  method: 'Bank' | 'UPI';
  status: 'Pending' | 'Approved' | 'Rejected';
};

export type Transaction = {
  id: string;
  userId: string;
  user: string;
  type: 'Deposit' | 'Withdrawal';
  amount: number;
  date: string;
  status: 'Success' | 'Failed' | 'Processing';
};


export const initialUsers: User[] = [
  {
    id: 'USR001',
    name: 'Ishaan',
    email: 'ishaan@example.com',
    balance: 1250.75,
    status: 'Active',
    kyc: 'Verified',
    joined: '2023-10-01',
  },
  {
    id: 'USR002',
    name: 'Rohan',
    email: 'rohan@example.com',
    balance: 500.0,
    status: 'Active',
    kyc: 'Pending',
    joined: '2023-10-15',
  },
  {
    id: 'USR003',
    name: 'Priya',
    email: 'priya@example.com',
    balance: 8200.5,
    status: 'Banned',
    kyc: 'Verified',
    joined: '2023-09-20',
  },
  {
    id: 'USR004',
    name: 'Amit',
    email: 'amit@example.com',
    balance: 0,
    status: 'Active',
    kyc: 'Not Submitted',
    joined: '2023-10-25',
  },
   {
    id: 'USR005',
    name: 'Sneha',
    email: 'sneha@example.com',
    balance: 10000,
    status: 'Active',
    kyc: 'Verified',
    joined: '2023-09-01',
  },
];


export let withdrawalRequests: WithdrawalRequest[] = [
  { id: 'WDR456', userId: 'USR005', user: 'Sneha', amount: 5000, date: '2023-10-27', method: 'Bank', details: '...1234', status: 'Pending' },
  { id: 'WDR457', userId: 'USR002', user: 'Rohan', amount: 250, date: '2023-10-28', method: 'UPI', details: 'rohan@upi', status: 'Pending' },
  { id: 'WDR458', userId: 'USR001', user: 'Ishaan', amount: 100, date: '2023-10-28', method: 'UPI', details: 'ishaan@upi', status: 'Pending' },
  { id: 'WDR459', userId: 'USR003', user: 'Priya', amount: 1000, date: '2023-10-29', method: 'Bank', details: '...4321', status: 'Approved' },
  { id: 'WDR460', userId: 'USR001', user: 'Ishaan', amount: 50, date: '2023-10-20', method: 'UPI', details: 'ishaan@upi', status: 'Rejected' },
  { id: 'WDR461', userId: 'USR005', user: 'Sneha', amount: 2000, date: '2023-10-25', method: 'Bank', details: '...1234', status: 'Approved' },
];

export let depositRequests: DepositRequest[] = [
    { id: 'DEP789', userId: 'USR001', user: 'Ishaan', amount: 500, date: '2023-10-28', method: 'UPI', status: 'Pending' },
    { id: 'DEP790', userId: 'USR002', user: 'Rohan', amount: 1000, date: '2023-10-28', method: 'UPI', status: 'Pending' },
    { id: 'DEP791', userId: 'USR004', user: 'Amit', amount: 200, date: '2023-10-27', method: 'Bank', status: 'Pending' },
];


export const transactions: Transaction[] = [
  { id: 'TXN123', userId: 'USR001', user: 'Ishaan', type: 'Deposit', amount: 500, date: '2023-10-28', status: 'Success' },
  { id: 'TXN124', userId: 'USR002', user: 'Rohan', type: 'Deposit', amount: 1000, date: '2023-10-28', status: 'Success' },
  { id: 'TXN125', userId: 'USR005', user: 'Sneha', type: 'Withdrawal', amount: 200, date: '2023-10-27', status: 'Success' },
];

export const initialAdmins: Admin[] = [
    {
        id: 'ADM001',
        name: 'Sonic Kuwal',
        email: 'sonickuwal@gmail.com',
        walletBalance: 1250.50,
        status: 'Active',
        joined: '2023-01-01',
        permissions: ['Manage Users', 'Manage Payments', 'Manage Settings']
    }
];
