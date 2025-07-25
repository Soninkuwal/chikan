'use client';
import { create } from 'zustand';
import { initialUsers, User } from './data';

type UserState = {
  users: User[];
  creditUser: (userId: string, amount: number) => void;
  debitUser: (userId: string, amount: number) => void;
  toggleUserStatus: (userId: string) => void;
};

export const useUserStore = create<UserState>((set) => ({
  users: initialUsers,
  creditUser: (userId, amount) =>
    set((state) => ({
      users: state.users.map((user) =>
        user.id === userId ? { ...user, balance: user.balance + amount } : user
      ),
    })),
  debitUser: (userId, amount) =>
    set((state) => ({
      users: state.users.map((user) =>
        user.id === userId ? { ...user, balance: user.balance - amount } : user
      ),
    })),
  toggleUserStatus: (userId: string) => {
    set((state) => ({
      users: state.users.map((user) =>
        user.id === userId
          ? {
              ...user,
              status: user.status === 'Active' ? 'Banned' : 'Active',
            }
          : user
      ),
    }));
  },
}));
