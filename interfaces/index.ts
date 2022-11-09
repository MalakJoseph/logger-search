export type AuditLog = {
  logId: number;
  applicationId: number;
  applicationType: string;
  companyId: number;
  actionType: string;
  ip: string;
  userAgent: string;
  userId: number;
  source: string;
  ownerId: any;
  logInfo: string;
  creationTimestamp: string;
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
