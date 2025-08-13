export const ConsultationStatus = {
  NEW: 'NEW',
  IN_PROGRESS: 'IN_PROGRESS',
  ANSWERED: 'ANSWERED',
  ARCHIVED: 'ARCHIVED'
} as const;

export type ConsultationStatus = typeof ConsultationStatus[keyof typeof ConsultationStatus];

export interface Consultation {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  status: ConsultationStatus;
  response?: string | null;
  createdAt: string;
  updatedAt: string;
}