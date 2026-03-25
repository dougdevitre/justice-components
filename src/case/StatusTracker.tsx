/**
 * @module case/StatusTracker
 *
 * Case status tracking component with a visual progress
 * indicator. Shows the current stage of a case (filed,
 * served, discovery, mediation, hearing, trial, resolved)
 * with completed, current, and upcoming stages clearly marked.
 */

import React, { useMemo } from 'react';
import type { CaseStatus } from '../types';

/** The visual state of a single stage step. */
export type StepState = 'completed' | 'current' | 'upcoming';

/** A rendered step with computed visual state. */
export interface StatusStep {
  label: string;
  state: StepState;
  index: number;
}

export interface StatusTrackerProps {
  /** Current case status */
  status: CaseStatus;
  /** All possible stages for this case type (display labels) */
  stages?: string[];
  /** Show date of last update */
  showDate?: boolean;
  /** Orientation of the progress indicator */
  orientation?: 'horizontal' | 'vertical';
  /** Custom CSS class name */
  className?: string;
  /** Callback when a stage is clicked (for navigation) */
  onStageClick?: (stage: string, index: number) => void;
}

/** Default stages for a typical family court case. */
const DEFAULT_STAGES = [
  'Filed',
  'Served',
  'Discovery',
  'Mediation',
  'Hearing',
  'Trial',
  'Resolved',
];

/** Map stage identifiers to display-friendly labels. */
const STAGE_LABEL_MAP: Record<string, string> = {
  filed: 'Filed',
  served: 'Served',
  discovery: 'Discovery',
  mediation: 'Mediation',
  hearing: 'Hearing',
  trial: 'Trial',
  resolved: 'Resolved',
};

/**
 * StatusTracker renders a visual step-by-step progress indicator
 * showing the current stage of a court case. Completed stages are
 * marked with a check, the current stage is highlighted, and
 * upcoming stages are dimmed.
 */
export const StatusTracker: React.FC<StatusTrackerProps> = ({
  status,
  stages = DEFAULT_STAGES,
  showDate = true,
  orientation = 'horizontal',
  className,
  onStageClick,
}) => {
  /** Compute the step states based on the current status. */
  const steps: StatusStep[] = useMemo(() => {
    // Find the index of the current stage
    const currentLabel = STAGE_LABEL_MAP[status.stage] ?? status.label;
    const currentIndex = stages.findIndex(
      (s) => s.toLowerCase() === currentLabel.toLowerCase(),
    );

    return stages.map((label, index) => ({
      label,
      index,
      state:
        index < currentIndex
          ? 'completed'
          : index === currentIndex
            ? 'current'
            : 'upcoming',
    }));
  }, [status, stages]);

  /** Calculate completion percentage. */
  const completionPercent = useMemo(() => {
    const currentIdx = steps.findIndex((s) => s.state === 'current');
    if (currentIdx < 0) return 0;
    return Math.round((currentIdx / (steps.length - 1)) * 100);
  }, [steps]);

  /** Format a date for display. */
  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div
      data-testid="status-tracker"
      className={`status-tracker status-tracker--${orientation} ${className ?? ''}`}
      role="group"
      aria-label="Case status progress"
    >
      {/* Screen reader summary */}
      <div className="sr-only" role="status">
        Case is currently at the {status.label} stage.
        {completionPercent}% complete.
      </div>

      {/* Progress bar (visual) */}
      <div
        className="progress-track"
        role="progressbar"
        aria-valuenow={completionPercent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Case progress: ${completionPercent}%`}
      >
        <div
          className="progress-fill"
          style={
            orientation === 'horizontal'
              ? { width: `${completionPercent}%` }
              : { height: `${completionPercent}%` }
          }
        />
      </div>

      {/* Stage steps */}
      <ol className="status-steps" aria-label="Case stages">
        {steps.map((step) => (
          <li
            key={step.index}
            className={`status-step status-step--${step.state}`}
            aria-current={step.state === 'current' ? 'step' : undefined}
          >
            {/* Step indicator circle */}
            <span className="step-indicator" aria-hidden="true">
              {step.state === 'completed' ? (
                <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
                  <path
                    d="M6.5 12L2 7.5l1.4-1.4L6.5 9.2l6.1-6.1L14 4.5z"
                    fill="currentColor"
                  />
                </svg>
              ) : (
                <span className="step-number">{step.index + 1}</span>
              )}
            </span>

            {/* Step label */}
            {onStageClick ? (
              <button
                className="step-label step-label--clickable"
                onClick={() => onStageClick(step.label, step.index)}
                aria-label={`${step.label} - ${step.state}`}
              >
                {step.label}
              </button>
            ) : (
              <span className="step-label">{step.label}</span>
            )}
          </li>
        ))}
      </ol>

      {/* Last updated date */}
      {showDate && status.updatedAt && (
        <p className="status-date">
          Last updated: <time dateTime={status.updatedAt.toISOString()}>
            {formatDate(status.updatedAt)}
          </time>
        </p>
      )}
    </div>
  );
};

export default StatusTracker;
