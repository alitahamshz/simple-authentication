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
// این تابع را می‌توانید بیرون کامپوننت تعریف کنید
export const normalizePhoneNumber = (phone: string): string => {
  if (!phone) return "";

  // حذف هر کاراکتر غیر عددی به جز + در ابتدای رشته
  const cleaned = phone.replace(/[^\d+]/g, "");

  // حالت +989...
  if (cleaned.startsWith("+989")) {
    return "0" + cleaned.substring(3);
  }
  // حالت 00989...
  if (cleaned.startsWith("00989")) {
    return "0" + cleaned.substring(4);
  }
  // حالت 9... (بدون صفر اول)
  if (cleaned.startsWith("9") && cleaned.length === 10) {
      return "0" + cleaned;
  }
  
  // اگر هیچکدام نبود، خود رشته را برگردان
  return cleaned;
};