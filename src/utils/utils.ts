import moment from 'jalali-moment';

export function formatPrice(price: number | null | undefined): string {
  // بررسی می‌کنیم که ورودی یک عدد معتبر باشد
  if (price === null || price === undefined || isNaN(Number(price))) {
    return '0';
  }

  // از toLocaleString برای جدا کردن سه‌رقم استفاده می‌کنیم
  return price.toLocaleString('fa-IR');
}


export function toPersianDate(isoDate: string | Date): string {
  return moment(isoDate)
    .locale('fa')
    .format('D MMMM YYYY');
}

export function toPersianDateTime(isoDate: string | Date): string {
  return moment(isoDate)
    .locale('fa')
    .format('D MMMM YYYY، ساعت HH:mm:ss');
}
