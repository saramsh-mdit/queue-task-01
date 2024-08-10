import dayjs from "dayjs";

export function formattedData(date: string) {
  return dayjs(date).format("MMM/DD/YYYY");
}
