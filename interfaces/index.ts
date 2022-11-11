export type AuditLog = {
  logId: number;
  applicationType: string;
  applicationId: number;
  actionType: string;
  logInfo: string;
  creationTimestamp: string;
  companyId: number;
  ip: string;
  userAgent: string;
  userId: number;
  source: string;
  ownerId: any;
};

export type Data = {
  success: boolean;
  elapsed: number;
  result: {
    totalPages: number;
    number: number;
    recordsTotal: number;
    recordsFiltered: number;
    auditLog: AuditLog[];
  };
};

export type PickedDataKeys =
  | "logId"
  | "applicationType"
  | "applicationId"
  | "actionType"
  | "logInfo"
  | "creationTimestamp";

export type PickedLogs = Pick<AuditLog, PickedDataKeys>[];
