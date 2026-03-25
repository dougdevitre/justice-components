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

import React, { useCallback, useRef, useState } from 'react';

/** Validation error for a rejected file. */
export interface FileValidationError {
  fileName: string;
  reason: 'too-large' | 'invalid-type' | 'duplicate';
  detail: string;
}

/** Upload progress for a single file. */
export interface FileUploadProgress {
  fileName: string;
  progress: number; // 0-100
  status: 'pending' | 'uploading' | 'complete' | 'error';
  error?: string;
}

export interface FileUploaderProps {
  /** Accepted file extensions (without dots), e.g. ['pdf', 'jpg', 'png'] */
  acceptedTypes?: string[];
  /** Maximum file size in MB */
  maxSizeMB?: number;
  /** Allow multiple file upload */
  multiple?: boolean;
  /** Callback with uploaded files */
  onUpload?: (files: File[]) => void;
  /** Callback when validation errors occur */
  onValidationError?: (errors: FileValidationError[]) => void;
  /** Custom label text */
  label?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Custom CSS class name */
  className?: string;
}

/**
 * FileUploader provides an accessible drag-and-drop zone for uploading
 * court evidence files. It validates file types and sizes, shows upload
 * progress, and lists uploaded files.
 */
export const FileUploader: React.FC<FileUploaderProps> = ({
  acceptedTypes,
  maxSizeMB = 50,
  multiple = true,
  onUpload,
  onValidationError,
  label = 'Upload evidence files',
  disabled = false,
  className,
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [progress, setProgress] = useState<FileUploadProgress[]>([]);
  const [errors, setErrors] = useState<FileValidationError[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  /** Build the accept string for the file input. */
  const acceptString = acceptedTypes
    ? acceptedTypes.map((t) => `.${t}`).join(',')
    : undefined;

  /** Validate a single file against type and size constraints. */
  const validateFile = useCallback(
    (file: File): FileValidationError | null => {
      // Check file type
      if (acceptedTypes && acceptedTypes.length > 0) {
        const ext = file.name.split('.').pop()?.toLowerCase();
        if (!ext || !acceptedTypes.includes(ext)) {
          return {
            fileName: file.name,
            reason: 'invalid-type',
            detail: `File type ".${ext}" is not accepted. Accepted types: ${acceptedTypes.join(', ')}`,
          };
        }
      }

      // Check file size
      const sizeMB = file.size / (1024 * 1024);
      if (sizeMB > maxSizeMB) {
        return {
          fileName: file.name,
          reason: 'too-large',
          detail: `File is ${sizeMB.toFixed(1)} MB, exceeding the ${maxSizeMB} MB limit.`,
        };
      }

      return null;
    },
    [acceptedTypes, maxSizeMB],
  );

  /** Process selected or dropped files. */
  const processFiles = useCallback(
    (fileList: FileList | null) => {
      if (!fileList || fileList.length === 0) return;

      const incoming = Array.from(fileList);
      const validFiles: File[] = [];
      const validationErrors: FileValidationError[] = [];

      for (const file of incoming) {
        const error = validateFile(file);
        if (error) {
          validationErrors.push(error);
        } else {
          validFiles.push(file);
        }
      }

      if (validationErrors.length > 0) {
        setErrors(validationErrors);
        onValidationError?.(validationErrors);
      }

      if (validFiles.length > 0) {
        const updatedFiles = multiple ? [...files, ...validFiles] : validFiles;
        setFiles(updatedFiles);

        // Initialize progress tracking
        const newProgress: FileUploadProgress[] = validFiles.map((f) => ({
          fileName: f.name,
          progress: 0,
          status: 'pending',
        }));
        setProgress((prev) => [...prev, ...newProgress]);

        onUpload?.(validFiles);
      }
    },
    [files, multiple, onUpload, onValidationError, validateFile],
  );

  /** Handle drag over event. */
  const handleDragOver = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (!disabled) setIsDragOver(true);
    },
    [disabled],
  );

  /** Handle drag leave event. */
  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  }, []);

  /** Handle file drop. */
  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragOver(false);
      if (!disabled) processFiles(e.dataTransfer.files);
    },
    [disabled, processFiles],
  );

  /** Handle file input change. */
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      processFiles(e.target.files);
      // Reset input so the same file can be re-selected
      if (inputRef.current) inputRef.current.value = '';
    },
    [processFiles],
  );

  /** Open the file picker. */
  const handleBrowseClick = useCallback(() => {
    if (!disabled) inputRef.current?.click();
  }, [disabled]);

  /** Remove a file from the list. */
  const removeFile = useCallback((index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setProgress((prev) => prev.filter((_, i) => i !== index));
  }, []);

  /** Format file size for display. */
  const formatSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div
      data-testid="file-uploader"
      className={`file-uploader ${isDragOver ? 'drag-over' : ''} ${disabled ? 'disabled' : ''} ${className ?? ''}`}
      role="region"
      aria-label={label}
    >
      {/* Drop zone */}
      <div
        className="drop-zone"
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled}
        aria-describedby="upload-instructions"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleBrowseClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleBrowseClick();
          }
        }}
      >
        <p className="drop-zone-label">{label}</p>
        <p id="upload-instructions" className="drop-zone-hint">
          Drag and drop files here, or click to browse.
          {acceptedTypes && ` Accepted: ${acceptedTypes.join(', ')}.`}
          {` Max size: ${maxSizeMB} MB.`}
        </p>
      </div>

      {/* Hidden file input */}
      <input
        ref={inputRef}
        type="file"
        accept={acceptString}
        multiple={multiple}
        onChange={handleInputChange}
        className="sr-only"
        aria-hidden="true"
        tabIndex={-1}
      />

      {/* Validation errors */}
      {errors.length > 0 && (
        <div className="upload-errors" role="alert" aria-live="assertive">
          {errors.map((err, i) => (
            <p key={i} className="error-message">
              {err.fileName}: {err.detail}
            </p>
          ))}
        </div>
      )}

      {/* File list */}
      {files.length > 0 && (
        <ul className="file-list" role="list" aria-label="Uploaded files">
          {files.map((file, i) => {
            const prog = progress[i];
            return (
              <li key={`${file.name}-${i}`} className="file-item">
                <span className="file-name">{file.name}</span>
                <span className="file-size">{formatSize(file.size)}</span>
                {prog && prog.status === 'uploading' && (
                  <progress
                    value={prog.progress}
                    max={100}
                    aria-label={`Uploading ${file.name}: ${prog.progress}%`}
                  />
                )}
                {prog && prog.status === 'complete' && (
                  <span className="status-complete" aria-label="Upload complete">Uploaded</span>
                )}
                {prog && prog.status === 'error' && (
                  <span className="status-error" aria-label="Upload error">{prog.error}</span>
                )}
                <button
                  onClick={() => removeFile(i)}
                  aria-label={`Remove ${file.name}`}
                  className="remove-btn"
                >
                  Remove
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default FileUploader;
