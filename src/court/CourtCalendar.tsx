/**
 * @module court/CourtCalendar
 *
 * Court calendar component displaying hearings, deadlines,
 * and court events in monthly, weekly, and agenda views.
 * Supports filtering by case, color-coding by event type,
 * and calendar export (ICS).
 */

import React from 'react';
import type { Hearing } from '../types';

export interface CourtCalendarProps {
  /** Hearings and events to display */
  hearings: Hearing[];
  /** Calendar view mode */
  view?: 'month' | 'week' | 'agenda';
  /** Callback when a hearing is clicked */
  onHearingClick?: (hearingId: string) => void;
}

export const CourtCalendar: React.FC<CourtCalendarProps> = ({
  hearings,
  view = 'month',
  onHearingClick,
}) => {
  // TODO: Implement court calendar with multiple views
  return (
    <div data-testid="court-calendar" role="grid" aria-label="Court calendar">
      <p>Court Calendar ({view} view) — {hearings.length} events</p>
    </div>
  );
};

export default CourtCalendar;
