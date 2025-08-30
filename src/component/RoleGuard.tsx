/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
// components/RoleGuard.tsx
'use client'
import { useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import { useRouter } from 'next/navigation'

type Props = {
  allowedRoles: string[]
  children: React.ReactNode
}

export default function RoleGuard({ allowedRoles, children }: Props) {
  const [allowed, setAllowed] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const cookie = document.cookie
      .split('; ')
      .find(c => c.startsWith('access_token='))

    if (!cookie) {
      router.push('/login')
      return
    }

    const token = cookie.split('=')[1]
    try {
      const decoded: any = jwtDecode(token)
      if (allowedRoles.includes(decoded.role)) {
        setAllowed(true)
      } else {
        router.push('/not-authorized')
      }
    } catch {
      router.push('/login')
    }
  }, [])

  if (!allowed) return null
  return <>{children}</>
}
