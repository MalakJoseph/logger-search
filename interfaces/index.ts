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

export enum PickedDataKeys {
  "logId" = "logId",
  "applicationType" = "applicationType",
  "applicationId" = "applicationId",
  "actionType" = "actionType",
  "logInfo" = "logInfo",
  "creationTimestamp" = "creationTimestamp",
}

export type PickedDataKeysType = keyof typeof PickedDataKeys;

export type PickedLogs = Pick<AuditLog, PickedDataKeysType>[];

export type FilterKeys =
  | "logId"
  | "applicationType"
  | "applicationId"
  | "actionType"
  | "fromData"
  | "toData";

export type InputTypes = "select" | "input" | "date-picker";
