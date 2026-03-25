/**
 * @module communication/NotificationCenter
 *
 * Notification center component with a dropdown panel
 * displaying system alerts, deadline reminders, case
 * updates, and messages. Supports mark-as-read, filtering
 * by type, and notification preferences.
 */

import React from 'react';
import type { Notification } from '../types';

export interface NotificationCenterProps {
  /** List of notifications */
  notifications: Notification[];
  /** Callback when notification is clicked */
  onNotificationClick?: (notificationId: string) => void;
  /** Callback when notification is marked as read */
  onMarkRead?: (notificationId: string) => void;
}

export const NotificationCenter: React.FC<NotificationCenterProps> = ({
  notifications,
  onNotificationClick,
  onMarkRead,
}) => {
  const unread = notifications.filter((n) => !n.read).length;
  // TODO: Implement notification center dropdown
  return (
    <div data-testid="notification-center" role="region" aria-label="Notifications">
      <p>Notifications — {unread} unread</p>
    </div>
  );
};

export default NotificationCenter;
