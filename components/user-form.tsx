'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { toast } from 'sonner'

export function UserForm() {
  const router = useRouter()
  const [userName, setUserName] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!userName.trim()) return

    setIsLoading(true)
    try {
      // Store username in localStorage
      localStorage.setItem('surveyUser', userName)
      router.push('/general-info')
    } catch {
      toast.error('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>歡迎參加問卷調查</CardTitle>
          <CardDescription>請輸入您的姓名以開始問卷</CardDescription>
        </CardHeader>
        <CardContent>
          <Input
            placeholder="您的姓名"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
            disabled={isLoading}
          />
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? '處理中...' : '開始問卷'}
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
} 