import moment from "jalali-moment";

export function formatPrice(price: number | null | undefined): string {
  if (price === null || price === undefined || isNaN(Number(price))) {
    return "0";
  }

  return price.toLocaleString("fa-IR");
}

export function toPersianDate(isoDate: string | Date): string {
  return moment(isoDate).locale("fa").format("D MMMM YYYY");
}

export function toPersianDateTime(isoDate: string | Date): string {
  return moment(isoDate).locale("fa").format("D MMMM YYYY، ساعت HH:mm:ss");
}
