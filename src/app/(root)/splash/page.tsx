'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function SplashPage() {
  const router = useRouter()

  useEffect(() => {
    const visited = sessionStorage.getItem('visited')
    if (visited) {
      router.replace('/') // مستقیم برو صفحه اصلی
    } else {
      sessionStorage.setItem('visited', 'true')
      setTimeout(() => {
        router.replace('/') // بعد از اسپلش برو صفحه اصلی
      }, 2000)
    }
  }, [router])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <h1 className="text-3xl font-bold">Aropet</h1>
    </div>
  )
}
