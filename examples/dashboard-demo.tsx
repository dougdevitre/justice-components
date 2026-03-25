/**
 * Example: Complete dashboard using multiple Justice OS components
 *
 * Demonstrates how to compose DashboardShell, StatusTracker,
 * FileUploader, and other components into a working case
 * management dashboard.
 */

import React, { useState, useCallback } from 'react';
import { DashboardShell } from '../src/layout/DashboardShell';
import { FileUploader } from '../src/evidence/FileUploader';
import { StatusTracker } from '../src/case/StatusTracker';
import type { CaseStatus, NavItem, Notification } from '../src/types';

// --- Sample data ---

const NAV_ITEMS: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: 'home', href: '/' },
  { id: 'cases', label: 'My Cases', icon: 'briefcase', href: '/cases', badge: 3 },
  { id: 'documents', label: 'Documents', icon: 'file-text', href: '/documents' },
  { id: 'calendar', label: 'Calendar', icon: 'calendar', href: '/calendar', badge: 1 },
  { id: 'messages', label: 'Messages', icon: 'message-circle', href: '/messages' },
  { id: 'settings', label: 'Settings', icon: 'settings', href: '/settings' },
];

const SAMPLE_STATUS: CaseStatus = {
  id: 'case-2024-001',
  label: 'Discovery',
  stage: 'discovery',
  updatedAt: new Date('2024-06-15'),
};

const CASE_STAGES = [
  'Filed',
  'Served',
  'Discovery',
  'Mediation',
  'Hearing',
  'Resolved',
];

const SAMPLE_NOTIFICATIONS: Notification[] = [
  {
    id: 'n1',
    title: 'Upcoming deadline',
    message: 'Discovery response due in 5 days',
    type: 'warning',
    read: false,
    createdAt: new Date(),
  },
  {
    id: 'n2',
    title: 'Document uploaded',
    message: 'Financial disclosure uploaded successfully',
    type: 'success',
    read: true,
    createdAt: new Date(Date.now() - 86400000),
  },
];

/**
 * DashboardDemo shows a complete case management dashboard
 * built with Justice OS components.
 */
const DashboardDemo: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [notifications] = useState(SAMPLE_NOTIFICATIONS);

  const handleFileUpload = useCallback((files: File[]) => {
    setUploadedFiles((prev) => [...prev, ...files]);
    console.log(`Uploaded ${files.length} file(s)`);
  }, []);

  // Sidebar navigation
  const sidebar = (
    <nav aria-label="Main navigation">
      <ul role="list">
        {NAV_ITEMS.map((item) => (
          <li key={item.id}>
            <a href={item.href} aria-current={item.id === 'dashboard' ? 'page' : undefined}>
              {item.label}
              {item.badge && (
                <span className="badge" aria-label={`${item.badge} pending`}>
                  {item.badge}
                </span>
              )}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );

  // Header actions (notification bell + profile)
  const headerActions = (
    <div className="header-actions">
      <button aria-label={`Notifications (${notifications.filter((n) => !n.read).length} unread)`}>
        Notifications
      </button>
      <button aria-label="User profile">Profile</button>
    </div>
  );

  return (
    <DashboardShell
      title="Justice OS - Case Dashboard"
      sidebar={sidebar}
      headerActions={headerActions}
    >
      {/* Case status overview */}
      <section aria-label="Case status">
        <h2>Case #2024-001: Smith v. Jones</h2>
        <StatusTracker status={SAMPLE_STATUS} stages={CASE_STAGES} />
      </section>

      {/* Two-column layout for key actions */}
      <div className="dashboard-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        {/* Evidence upload */}
        <section aria-label="Upload evidence">
          <h3>Upload Evidence</h3>
          <FileUploader
            acceptedTypes={['pdf', 'jpg', 'png', 'doc', 'docx']}
            maxSizeMB={25}
            multiple={true}
            onUpload={handleFileUpload}
            label="Drag and drop evidence files here"
          />
          {uploadedFiles.length > 0 && (
            <div className="uploaded-list">
              <h4>Recently Uploaded ({uploadedFiles.length})</h4>
              <ul>
                {uploadedFiles.map((f, i) => (
                  <li key={i}>{f.name} ({(f.size / 1024).toFixed(1)} KB)</li>
                ))}
              </ul>
            </div>
          )}
        </section>

        {/* Upcoming deadlines */}
        <section aria-label="Upcoming deadlines">
          <h3>Upcoming Deadlines</h3>
          <ul className="deadline-list">
            <li>
              <strong>Jun 20, 2024</strong> - Discovery response due
              <span className="badge-warning">5 days</span>
            </li>
            <li>
              <strong>Jul 01, 2024</strong> - Mediation session
              <span className="badge-info">16 days</span>
            </li>
            <li>
              <strong>Jul 15, 2024</strong> - Exhibit list deadline
              <span className="badge-info">30 days</span>
            </li>
          </ul>
        </section>
      </div>

      {/* Recent activity */}
      <section aria-label="Recent activity">
        <h3>Recent Activity</h3>
        <ul className="activity-feed">
          <li>Financial disclosure uploaded - 1 day ago</li>
          <li>Case status updated to Discovery - 3 days ago</li>
          <li>Service of process confirmed - 1 week ago</li>
          <li>Petition filed with court clerk - 2 weeks ago</li>
        </ul>
      </section>
    </DashboardShell>
  );
};

export default DashboardDemo;
