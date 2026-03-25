/**
 * @module court/JudgeInfo
 *
 * Judge information display component. Shows publicly
 * available information about the assigned judge including
 * courtroom preferences, scheduling patterns, and general
 * procedural expectations to help litigants prepare.
 */

import React from 'react';

export interface JudgeInfoProps {
  /** Judge's name */
  name: string;
  /** Courtroom assignment */
  courtroom?: string;
  /** Known procedural preferences */
  preferences?: string[];
}

export const JudgeInfo: React.FC<JudgeInfoProps> = ({ name, courtroom, preferences }) => {
  // TODO: Implement judge information display
  return (
    <div data-testid="judge-info" role="region" aria-label={`Judge information: ${name}`}>
      <p>Judge {name}{courtroom ? ` — ${courtroom}` : ''}</p>
    </div>
  );
};

export default JudgeInfo;
