// Simple notification utility
// You can integrate this with react-toastify or any other toast library

class NotificationManager {
  constructor() {
    this.notifications = [];
    this.listeners = [];
  }

  addNotification(message, type = 'info', duration = 3000) {
    const notification = {
      id: Date.now() + Math.random(),
      message,
      type, // 'success', 'error', 'warning', 'info'
      timestamp: Date.now(),
      duration,
    };

    this.notifications.push(notification);
    this.notifyListeners();

    // Auto-remove notification after duration
    if (duration > 0) {
      setTimeout(() => {
        this.removeNotification(notification.id);
      }, duration);
    }

    return notification.id;
  }

  removeNotification(id) {
    this.notifications = this.notifications.filter(n => n.id !== id);
    this.notifyListeners();
  }

  clearAll() {
    this.notifications = [];
    this.notifyListeners();
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notifyListeners() {
    this.listeners.forEach(listener => {
      listener(this.notifications);
    });
  }

  getNotifications() {
    return [...this.notifications];
  }
}

// Create singleton instance
const notificationManager = new NotificationManager();

// Export convenience methods
export const showNotification = (message, type = 'info', duration = 3000) => {
  return notificationManager.addNotification(message, type, duration);
};

export const showSuccess = (message, duration = 3000) => {
  return notificationManager.addNotification(message, 'success', duration);
};

export const showError = (message, duration = 5000) => {
  return notificationManager.addNotification(message, 'error', duration);
};

export const showWarning = (message, duration = 4000) => {
  return notificationManager.addNotification(message, 'warning', duration);
};

export const showInfo = (message, duration = 3000) => {
  return notificationManager.addNotification(message, 'info', duration);
};

export const removeNotification = (id) => {
  notificationManager.removeNotification(id);
};

export const clearAllNotifications = () => {
  notificationManager.clearAll();
};

export const subscribeToNotifications = (listener) => {
  return notificationManager.subscribe(listener);
};

export default notificationManager;
