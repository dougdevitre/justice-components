/**
 * @module layout/SideNav
 *
 * Side navigation component with collapsible sections,
 * badge counters, and active-state highlighting. Supports
 * nested navigation items and keyboard navigation for
 * full accessibility compliance.
 */

import React from 'react';
import type { NavItem } from '../types';

export interface SideNavProps {
  /** Navigation items */
  items: NavItem[];
  /** Currently active item ID */
  activeId?: string;
  /** Whether the nav is collapsed */
  collapsed?: boolean;
  /** Callback when an item is clicked */
  onNavigate?: (href: string) => void;
}

export const SideNav: React.FC<SideNavProps> = ({
  items,
  activeId,
  collapsed = false,
  onNavigate,
}) => {
  // TODO: Implement accessible side navigation with collapse
  return (
    <nav data-testid="side-nav" role="navigation" aria-label="Main navigation">
      <ul>
        {items.map((item) => (
          <li key={item.id}>{item.label}</li>
        ))}
      </ul>
    </nav>
  );
};

export default SideNav;
