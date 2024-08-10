import dayjs from "dayjs";

export function formattedData(date?: Date) {
  return dayjs(date).format("MMM/DD/YYYY (h:MM A)");
}
