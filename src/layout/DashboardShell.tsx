/**
 * @module layout/DashboardShell
 *
 * Top-level dashboard layout shell component. Provides
 * the standard justice application layout with header,
 * side navigation, main content area, and notification
 * panel. Fully responsive and accessible.
 */

import React, { useState, useCallback } from 'react';

export interface DashboardShellProps {
  /** Application title displayed in the header */
  title?: string;
  /** Child content for the main area */
  children: React.ReactNode;
  /** Side navigation content */
  sidebar?: React.ReactNode;
  /** Header actions (notifications, profile, etc.) */
  headerActions?: React.ReactNode;
  /** Footer content */
  footer?: React.ReactNode;
  /** Initial sidebar collapsed state */
  sidebarCollapsed?: boolean;
  /** Callback when sidebar toggle is clicked */
  onSidebarToggle?: (collapsed: boolean) => void;
  /** Custom CSS class name */
  className?: string;
}

/**
 * DashboardShell provides the standard Justice OS application layout
 * with a responsive sidebar, header, and main content area. The sidebar
 * collapses to a hamburger menu on mobile viewports.
 */
export const DashboardShell: React.FC<DashboardShellProps> = ({
  title = 'Justice OS',
  children,
  sidebar,
  headerActions,
  footer,
  sidebarCollapsed: initialCollapsed = false,
  onSidebarToggle,
  className,
}) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(initialCollapsed);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  /** Toggle sidebar collapsed state. */
  const handleSidebarToggle = useCallback(() => {
    const newState = !sidebarCollapsed;
    setSidebarCollapsed(newState);
    onSidebarToggle?.(newState);
  }, [sidebarCollapsed, onSidebarToggle]);

  /** Toggle mobile menu overlay. */
  const handleMobileMenuToggle = useCallback(() => {
    setMobileMenuOpen((prev) => !prev);
  }, []);

  /** Close mobile menu (e.g., on navigation). */
  const handleMobileMenuClose = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  return (
    <div
      data-testid="dashboard-shell"
      className={`dashboard-shell ${sidebarCollapsed ? 'sidebar-collapsed' : ''} ${className ?? ''}`}
      role="application"
      aria-label={title}
    >
      {/* Skip navigation link for accessibility */}
      <a href="#main-content" className="sr-only focus:not-sr-only skip-link">
        Skip to main content
      </a>

      {/* Header */}
      <header className="dashboard-header" role="banner">
        {/* Mobile menu button */}
        <button
          className="mobile-menu-btn"
          onClick={handleMobileMenuToggle}
          aria-expanded={mobileMenuOpen}
          aria-controls="sidebar-nav"
          aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        >
          <span className="hamburger-icon" aria-hidden="true">
            {mobileMenuOpen ? '\u2715' : '\u2630'}
          </span>
        </button>

        {/* Desktop sidebar toggle */}
        {sidebar && (
          <button
            className="sidebar-toggle desktop-only"
            onClick={handleSidebarToggle}
            aria-expanded={!sidebarCollapsed}
            aria-controls="sidebar-nav"
            aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <span aria-hidden="true">{sidebarCollapsed ? '\u25B6' : '\u25C0'}</span>
          </button>
        )}

        {/* Title */}
        <h1 className="dashboard-title">{title}</h1>

        {/* Header actions (right side) */}
        {headerActions && (
          <div className="header-actions" role="toolbar" aria-label="Header actions">
            {headerActions}
          </div>
        )}
      </header>

      <div className="dashboard-body">
        {/* Sidebar */}
        {sidebar && (
          <>
            {/* Mobile overlay backdrop */}
            {mobileMenuOpen && (
              <div
                className="sidebar-backdrop"
                onClick={handleMobileMenuClose}
                aria-hidden="true"
              />
            )}

            <aside
              id="sidebar-nav"
              className={`dashboard-sidebar ${mobileMenuOpen ? 'mobile-open' : ''}`}
              role="navigation"
              aria-label="Sidebar navigation"
            >
              {sidebar}
            </aside>
          </>
        )}

        {/* Main content area */}
        <main
          id="main-content"
          className="dashboard-main"
          role="main"
          aria-label="Main content"
        >
          {children}
        </main>
      </div>

      {/* Footer */}
      {footer && (
        <footer className="dashboard-footer" role="contentinfo">
          {footer}
        </footer>
      )}
    </div>
  );
};

export default DashboardShell;
