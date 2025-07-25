'use client';
import { create } from 'zustand';
import { db } from './firebase';
import { ref, onValue, push, serverTimestamp, query, orderByChild, limitToLast, off } from 'firebase/database';

export type Message = {
  text: string;
  sender: 'user' | 'admin' | 'owner';
  timestamp: number | object;
  type?: 'text' | 'file' | 'image' | 'video' | 'animated_emoji';
  replyTo?: {
    text: string;
    sender: 'user' | 'admin' | 'owner';
  }
};

type ChatState = {
  messages: { [userId: string]: Message[] };
  unreadMessages: { [userId: string]: number };
  addMessage: (userId: string, message: Message) => void;
  listenToMessages: (userId: string) => () => void;
  listenForUnread: (userId: string, onNewMessage?: (userName: string) => void) => () => void;
  clearUnread: (userId: string) => void;
};

// to avoid multiple listeners
const unreadListeners: {[key: string]: boolean} = {};

export const useChatStore = create<ChatState>((set, get) => ({
  messages: {},
  unreadMessages: {},
  addMessage: (userId, message) => {
    const chatRef = ref(db, `chats/${userId}`);
    const newMessage = {
        ...message,
        timestamp: serverTimestamp()
    };
    push(chatRef, newMessage);
  },
  listenToMessages: (userId) => {
    const chatRef = ref(db, `chats/${userId}`);
    const unsubscribe = onValue(chatRef, (snapshot) => {
      const data = snapshot.val();
      const newMessages = data ? Object.values(data) as Message[] : [];
      set((state) => ({
        messages: {
          ...state.messages,
          [userId]: newMessages,
        },
      }));
    });
    
    return unsubscribe;
  },
  listenForUnread: (userId: string, onNewMessage?: (userName: string) => void) => {
    if (unreadListeners[userId]) {
        // Return an empty unsubscribe function if listener already exists.
        return () => {};
    }
    unreadListeners[userId] = true;

    const chatRef = query(ref(db, `chats/${userId}`), orderByChild('timestamp'), limitToLast(1));

    const unsubscribe = onValue(chatRef, (snapshot) => {
        if (!snapshot.exists()) return;

        snapshot.forEach((childSnapshot) => {
            const message = childSnapshot.val() as Message;
            if (message.sender === 'user') {
                 set(state => ({
                    unreadMessages: {
                        ...state.unreadMessages,
                        [userId]: (state.unreadMessages[userId] || 0) + 1
                    }
                }));
                if (onNewMessage) {
                    onNewMessage(userId);
                }
            }
        });
    }, { onlyOnce: false });

    return () => {
        off(chatRef);
        delete unreadListeners[userId];
    };
  },
  clearUnread: (userId) => {
    set(state => ({
        unreadMessages: {
            ...state.unreadMessages,
            [userId]: 0
        }
    }))
  }

}));
