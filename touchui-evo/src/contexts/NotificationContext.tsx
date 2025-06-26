import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { NotificationToast, NotificationSeverity, NotificationToastProps } from '../components/NotificationToast';
import { v4 as uuidv4 } from 'uuid';

type NotificationOptions = {
  message: string;
  severity: NotificationSeverity;
  title?: string;
  duration?: number | null;
};

type NotificationContextType = {
  addNotification: (options: NotificationOptions) => void;
};

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotification = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

interface StoredNotification extends NotificationToastProps {
  // No extra fields needed beyond what NotificationToastProps provides if id is part of it
}

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<StoredNotification[]>([]);

  const addNotification = useCallback((options: NotificationOptions) => {
    const id = uuidv4();
    const newNotification: StoredNotification = {
      id,
      open: true,
      ...options,
      onClose: (closedId, reason) => { // Add id to onClose params
        // Auto-remove from state when Snackbar's onClose is triggered (e.g. by autoHideDuration)
        // or when the Alert's close button is clicked.
        setNotifications((prevNotifications) =>
          prevNotifications.filter((n) => n.id !== closedId)
        );
      },
    };
    setNotifications((prevNotifications) => [...prevNotifications, newNotification]);
  }, []);

  const handleCloseNotification = (id: string, reason?: string) => {
    // This function is passed to each NotificationToast instance
    // It ensures that when a toast is closed (either by timeout or manually),
    // its 'open' state is set to false, and it's eventually removed.
    // However, the removal is now handled directly in the `onClose` passed to the StoredNotification
    // to simplify and avoid race conditions or duplicate close handling.
    // We can still use this to mark as 'open: false' if we want to animate out,
    // but direct removal is cleaner for this setup.
     setNotifications((prevNotifications) =>
      prevNotifications.filter((n) => n.id !== id)
    );
  };

  return (
    <NotificationContext.Provider value={{ addNotification }}>
      {children}
      {notifications.map((notification) => (
        <NotificationToast
          key={notification.id}
          {...notification}
          // Ensure the onClose here is correctly wired to remove the notification
          // The `notification.onClose` which is part of StoredNotification already handles this.
        />
      ))}
    </NotificationContext.Provider>
  );
};
