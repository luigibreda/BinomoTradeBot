import moment from "moment";

export function daysDifference(date: any) {
  const suppliedDate = moment(date);
  const today = moment();
  const diffInDays = suppliedDate.diff(today, "days");

  if (diffInDays > 0) {
    return `em ${diffInDays} dias`;
  } else if (diffInDays < 0) {
    return `${Math.abs(diffInDays)} dias atrás`;
  } else {
    return "hoje";
  }
}
