/**
 * @module case/PartyManager
 *
 * Party management component for tracking all individuals
 * involved in a case. Displays parties by role (petitioner,
 * respondent, attorney, judge, etc.) with contact information
 * and relationship indicators.
 */

import React from 'react';
import type { Party } from '../types';

export interface PartyManagerProps {
  /** Parties involved in the case */
  parties: Party[];
  /** Allow editing party information */
  editable?: boolean;
  /** Callback when parties are updated */
  onUpdate?: (parties: Party[]) => void;
}

export const PartyManager: React.FC<PartyManagerProps> = ({
  parties,
  editable = false,
  onUpdate,
}) => {
  // TODO: Implement party management with role-based display
  return (
    <div data-testid="party-manager" role="list" aria-label="Case parties">
      <p>Parties — {parties.length} involved</p>
    </div>
  );
};

export default PartyManager;
