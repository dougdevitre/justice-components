/**
 * @module court/HearingCard
 *
 * Hearing summary card component displaying key details
 * for an upcoming or past hearing: date, time, courtroom,
 * judge, hearing type, and preparation status. Includes
 * quick-action buttons for common tasks.
 */

import React from 'react';
import type { Hearing } from '../types';

export interface HearingCardProps {
  /** Hearing data to display */
  hearing: Hearing;
  /** Whether this hearing is upcoming or past */
  status?: 'upcoming' | 'past';
  /** Callback for card actions */
  onAction?: (action: string) => void;
}

export const HearingCard: React.FC<HearingCardProps> = ({
  hearing,
  status = 'upcoming',
  onAction,
}) => {
  // TODO: Implement hearing summary card with actions
  return (
    <div data-testid="hearing-card" role="article" aria-label={`Hearing: ${hearing.type}`}>
      <p>{hearing.type} — {hearing.courtroom}</p>
    </div>
  );
};

export default HearingCard;
