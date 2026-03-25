/**
 * @module types
 *
 * Shared type definitions for the Justice Tech Component Library.
 * Includes common interfaces used across evidence, case, court,
 * communication, and layout component categories.
 */

export interface Party {
  id: string;
  name: string;
  role: 'petitioner' | 'respondent' | 'child' | 'attorney' | 'judge' | 'witness' | 'other';
  contact?: string;
}

export interface CaseStatus {
  id: string;
  label: string;
  stage: 'filed' | 'served' | 'discovery' | 'mediation' | 'hearing' | 'trial' | 'resolved';
  updatedAt: Date;
}

export interface Hearing {
  id: string;
  caseId: string;
  date: Date;
  courtroom: string;
  judge: string;
  type: string;
  notes?: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
  read: boolean;
  createdAt: Date;
}

export interface NavItem {
  id: string;
  label: string;
  icon?: string;
  href: string;
  badge?: number;
  children?: NavItem[];
}
