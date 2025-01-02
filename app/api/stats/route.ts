import { NextResponse } from 'next/server'
import { firestore } from '@/firebase/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const categoryId = searchParams.get('categoryId')
  const state = searchParams.get('state')

  if (!categoryId || !state) {
    return NextResponse.json({ success: false, error: 'Missing parameters' }, { status: 400 })
  }

  try {
    const snapshot = await firestore
      .collection('survey-responses')
      .where('categoryId', '==', categoryId)
      .where('state', '==', state)
      .get()

    const responses = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))

    return NextResponse.json({ success: true, responses })
  } catch (error) {
    console.error('Error getting stats:', error)
    return NextResponse.json({ success: false, error: 'Failed to get stats' }, { status: 500 })
  }
} 