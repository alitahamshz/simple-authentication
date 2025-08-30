
'use client';

import { useEffect } from 'react';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    // می‌توانید خطا را لاگ کنید یا اقدامات دیگری انجام دهید
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2>متأسفیم، خطایی رخ داده است.</h2>
      <button onClick={() => reset()}>تلاش مجدد</button>
    </div>
  );
}
