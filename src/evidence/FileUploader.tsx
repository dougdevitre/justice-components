/**
 * @module evidence/FileUploader
 *
 * Accessible drag-and-drop file upload component for court evidence.
 * Supports multiple file types (PDF, images, documents), displays
 * upload progress, validates file size and type, and maintains
 * chain-of-custody metadata from the moment of upload.
 *
 * @example
 * ```tsx
 * <FileUploader
 *   acceptedTypes={['pdf', 'jpg', 'png', 'doc']}
 *   maxSizeMB={50}
 *   onUpload={(files) => handleEvidenceUpload(files)}
 * />
 * ```
 */

import React from 'react';

export interface FileUploaderProps {
  /** Accepted file extensions */
  acceptedTypes?: string[];
  /** Maximum file size in MB */
  maxSizeMB?: number;
  /** Allow multiple file upload */
  multiple?: boolean;
  /** Callback with uploaded files */
  onUpload?: (files: File[]) => void;
  /** Custom label text */
  label?: string;
}

export const FileUploader: React.FC<FileUploaderProps> = ({
  acceptedTypes,
  maxSizeMB = 50,
  multiple = true,
  onUpload,
  label = 'Upload evidence files',
}) => {
  // TODO: Implement accessible drag-and-drop upload with progress
  return (
    <div data-testid="file-uploader" role="region" aria-label={label}>
      <p>{label}</p>
    </div>
  );
};

export default FileUploader;
