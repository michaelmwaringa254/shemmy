import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import Pusher from 'pusher-js';

interface Notification {
  type: 'success' | 'error' | 'info';
  text: string;
}

interface PusherContextType {
  notification: Notification | null;
  setNotification: (n: Notification | null) => void;
}

const PusherContext = createContext<PusherContextType | undefined>(undefined);

export const usePusher = () => {
  const ctx = useContext(PusherContext);
  if (!ctx) throw new Error('usePusher must be used within a PusherProvider');
  return ctx;
};

export const PusherProvider = ({ children }: { children: ReactNode }) => {
  const [notification, setNotification] = useState<Notification | null>(null);

  useEffect(() => {
    const pusher = new Pusher('2df9e8815773ad44c763', {
      cluster: 'mt1',
    });
    // Listen to a global channel/event, you can customize as needed
    const channel = pusher.subscribe('global');
    channel.bind('push-notification', (data: any) => {
      setNotification({ type: data.type || 'info', text: data.text || 'Notification' });
    });
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
      pusher.disconnect();
    };
  }, []);

  // Auto-dismiss notification after 3s
  useEffect(() => {
    if (notification) {
      const t = setTimeout(() => setNotification(null), 3000);
      return () => clearTimeout(t);
    }
  }, [notification]);

  return (
    <PusherContext.Provider value={{ notification, setNotification }}>
      {children}
      {/* Notification UI */}
      {notification && (
        <div style={{position:'fixed',top:20,right:20,zIndex:9999}} className={`p-4 rounded-lg shadow-lg text-white ${notification.type==='success'?'bg-green-600':notification.type==='error'?'bg-red-600':'bg-blue-600'}`}>
          {notification.text}
        </div>
      )}
    </PusherContext.Provider>
  );
};
