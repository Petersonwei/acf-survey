'use client'

import { UserForm } from '@/components/user-form'

export default function Home() {
  return (
    <main className="container mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold mb-4">澳洲職場人活動問卷系統</h1>
      <div className="max-w-md mx-auto">
        <UserForm />
      </div>
    </main>
  )
}