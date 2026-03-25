/**
 * @module evidence/EvidenceViewer
 *
 * Multi-format evidence viewer component. Renders PDFs,
 * images, text documents, and email content inline with
 * annotation support, zoom controls, and metadata display.
 * Designed for reviewing evidence during case preparation.
 */

import React from 'react';

export interface EvidenceViewerProps {
  /** URL or data source for the evidence */
  src: string;
  /** Type of evidence being viewed */
  type: 'pdf' | 'image' | 'text' | 'email';
  /** Enable annotation mode */
  annotatable?: boolean;
  /** Callback when annotation is added */
  onAnnotate?: (annotation: unknown) => void;
}

export const EvidenceViewer: React.FC<EvidenceViewerProps> = ({
  src,
  type,
  annotatable = false,
  onAnnotate,
}) => {
  // TODO: Implement multi-format evidence viewer with annotations
  return (
    <div data-testid="evidence-viewer" role="document" aria-label="Evidence viewer">
      <p>Viewing {type} evidence</p>
    </div>
  );
};

export default EvidenceViewer;
