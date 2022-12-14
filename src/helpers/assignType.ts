import { PickedDataKeys, FilterKeys, InputTypes } from "../../interfaces";

export function assignType(key: FilterKeys): InputTypes {
  if (
    key === PickedDataKeys.applicationType ||
    key === PickedDataKeys.actionType
  ) {
    return "select";
  }
  if (key === PickedDataKeys.logId || key === PickedDataKeys.applicationId) {
    return "input";
  }
  return "date-picker";
}
