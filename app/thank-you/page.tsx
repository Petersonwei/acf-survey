'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function ThankYouPage() {
  const router = useRouter()

  useEffect(() => {
    if (!localStorage.getItem('surveyUser')) {
      router.push('/')
    }
  }, [router])

  return (
    <main className="container mx-auto py-10 px-4">
      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>感謝您的參與！</CardTitle>
          </CardHeader>
          <CardContent>
            <p>您的回答已經成功提交。</p>
          </CardContent>
          <CardFooter>
            <Button onClick={() => router.push('/')}>返回首頁</Button>
          </CardFooter>
        </Card>
      </div>
    </main>
  )
} 