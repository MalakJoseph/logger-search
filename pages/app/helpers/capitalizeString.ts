export function capitalizeString(str: string) {
  const pascalStr = str[0].toUpperCase() + str.slice(1);
  const splittedStr = pascalStr.split(/(?=[A-Z])/);
  const capitalizedStr = splittedStr.join(" ");

  return capitalizedStr;
}
