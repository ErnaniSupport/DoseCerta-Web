export function isoToBR(data) {
  if (!data) return "";
  return data.split("T")[0].split("-").reverse().join("/");
}

export function brToISO(data) {
  if (!data) return "";
  if (data.includes("-")) return data;
  return data.split("/").reverse().join("-");
}

export function toInputDate(data) {
  if (!data) return "";
  return data.split("T")[0];
}