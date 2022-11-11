export function capitalizeString(str: string) {
  if (str === "creationTimestamp") {
    return "Date : Time";
  }

  const pascalStr = str[0].toUpperCase() + str.slice(1);
  const splittedStr = pascalStr.split(/(?=[A-Z])/);

  if (splittedStr[1] === "Id") {
    splittedStr[1] = "ID";
  }

  const capitalizedStr = splittedStr.join(" ");

  return capitalizedStr;
}
