export type AuditLog = {
  logId: number;
  applicationType: string | null;
  applicationId: number | null;
  actionType: string;
  logInfo: string | null;
  creationTimestamp: string;
  companyId: number | null;
  ip: string;
  userAgent: string;
  userId: number | null;
  source: string | null;
  ownerId: number | null;
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
