/**
 * @module case/StatusTracker
 *
 * Case status tracking component with a visual progress
 * indicator. Shows the current stage of a case (filed,
 * served, discovery, mediation, hearing, trial, resolved)
 * with completed, current, and upcoming stages clearly marked.
 */

import React from 'react';
import type { CaseStatus } from '../types';

export interface StatusTrackerProps {
  /** Current case status */
  status: CaseStatus;
  /** All possible stages for this case type */
  stages?: string[];
}

export const StatusTracker: React.FC<StatusTrackerProps> = ({ status, stages }) => {
  // TODO: Implement visual case status progress indicator
  return (
    <div data-testid="status-tracker" role="progressbar" aria-label="Case status">
      <p>Case Status: {status.label}</p>
    </div>
  );
};

export default StatusTracker;
