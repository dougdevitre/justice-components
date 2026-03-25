/**
 * @module @justice-os/components
 *
 * Justice Tech Component Library -- reusable building blocks
 * for the justice tech ecosystem.
 *
 * Provides 20+ production-ready, WCAG 2.1 AA accessible
 * components purpose-built for justice applications.
 */

// Evidence components
export { FileUploader } from './evidence/FileUploader';
export { EvidenceViewer } from './evidence/EvidenceViewer';
export { ChainOfCustody } from './evidence/ChainOfCustody';

// Case components
export { StatusTracker } from './case/StatusTracker';
export { TimelineView } from './case/TimelineView';
export { PartyManager } from './case/PartyManager';

// Court components
export { CourtCalendar } from './court/CourtCalendar';
export { HearingCard } from './court/HearingCard';
export { JudgeInfo } from './court/JudgeInfo';

// Communication components
export { NotificationCenter } from './communication/NotificationCenter';
export { SecureMessaging } from './communication/SecureMessaging';
export { AIAssistantWidget } from './communication/AIAssistantWidget';

// Layout components
export { DashboardShell } from './layout/DashboardShell';
export { SideNav } from './layout/SideNav';
export { CommandPalette } from './layout/CommandPalette';

// Types
export * from './types';
