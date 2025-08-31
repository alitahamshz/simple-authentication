// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { useUser } from "@/context/UserContext";

// interface Props {
//   children: React.ReactNode;
// }

// export default function ProtectedRoute({ children }: Props) {
//   const { user } = useUser();
//   const router = useRouter();
//   const [isClient, setIsClient] = useState(false);

//   useEffect(() => {
//     setIsClient(true);
//     if (!user) router.replace("/auth/login");
//   }, [user, router]);

//   if (!isClient || !user) return null; // قبل از mount و قبل از داشتن user چیزی نشون نده

//   return <>{children}</>;
// }
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";

interface Props {
  children: React.ReactNode;
  requireAuth?: boolean; // true برای صفحات محافظت‌شده، false برای login/register
}

export default function AuthGuard({ children, requireAuth = false }: Props) {
  const { user } = useUser();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    if (requireAuth && !user) {
      // صفحه محافظت‌شده و کاربر لاگین نیست → ریدایرکت به login
      router.replace("/auth/signin");
    } else if (!requireAuth && user) {
      // صفحه login/register و کاربر لاگین هست → ریدایرکت به داشبورد
      router.replace("/dashboard");
    }
  }, [user, router, requireAuth]);

  // تا قبل از mount و تا وقتی که user مشخص نیست، چیزی render نشه
  if (!isClient) return null;

  if (requireAuth && !user) return null;
  if (!requireAuth && user) return null;

  return <>{children}</>;
}
