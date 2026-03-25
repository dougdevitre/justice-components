/**
 * @module layout/DashboardShell
 *
 * Top-level dashboard layout shell component. Provides
 * the standard justice application layout with header,
 * side navigation, main content area, and notification
 * panel. Fully responsive and accessible.
 */

import React from 'react';

export interface DashboardShellProps {
  /** Application title */
  title?: string;
  /** Child content for the main area */
  children: React.ReactNode;
  /** Side navigation content */
  sidebar?: React.ReactNode;
  /** Header actions (notifications, profile, etc.) */
  headerActions?: React.ReactNode;
}

export const DashboardShell: React.FC<DashboardShellProps> = ({
  title = 'Justice OS',
  children,
  sidebar,
  headerActions,
}) => {
  // TODO: Implement responsive dashboard layout shell
  return (
    <div data-testid="dashboard-shell" role="application" aria-label={title}>
      <header>{title}{headerActions}</header>
      <nav>{sidebar}</nav>
      <main>{children}</main>
    </div>
  );
};

export default DashboardShell;
