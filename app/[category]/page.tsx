'use client'

import { useParams } from 'next/navigation'
import { notFound } from 'next/navigation'
import { categories } from '@/lib/data'
import { StateSelector } from '@/components/state-selector'

export default function CategoryPage() {
  const params = useParams()
  const category = categories.find(c => c.id === params.category)

  if (!category) {
    notFound()
  }

  return (
    <main className="container mx-auto py-10 px-4">
      <StateSelector 
        category={category}
      />
    </main>
  )
} 