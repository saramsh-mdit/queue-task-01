import xlsx from "node-xlsx";

type Sheet = {
  name: string;
  data: any[][];
}[];

function getSheetFromFile(path: string) {
  const sheet = xlsx.parse(path);
  return sheet;
}

function getEmailFromSheet(data: Sheet): string[] {
  const emails: string[] = [];
  data.forEach((page) => {
    page.data.forEach((email) => emails.push(email[0]));
  });
  return emails;
}

export function getEmailFromExcel(path: string) {
  const sheetData = getSheetFromFile(path);
  const emails = getEmailFromSheet(sheetData);
  return emails;
}
