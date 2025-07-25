'use client';
import { create } from 'zustand';

type WalletState = {
  adminWalletBalance: number;
  ownerWalletBalance: number;
  setAdminWalletBalance: (amount: number) => void;
  setOwnerWalletBalance: (amount: number) => void;
};

export const useWalletStore = create<WalletState>((set) => ({
  adminWalletBalance: 1250.50,
  ownerWalletBalance: 1250550.00,
  setAdminWalletBalance: (amount) => set({ adminWalletBalance: amount }),
  setOwnerWalletBalance: (amount) => set({ ownerWalletBalance: amount }),
}));
