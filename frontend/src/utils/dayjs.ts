import dayjs from "dayjs";

export function formattedData(date: string | Date) {
  return dayjs(date).format("MMM/DD/YYYY");
}
