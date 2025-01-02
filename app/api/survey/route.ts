import { NextResponse } from 'next/server'
import { firestore } from '@/firebase/server'
import { SurveyResponse } from '@/lib/types'

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const docRef = await firestore.collection('survey-responses').add({
      ...data,
      timestamp: new Date()
    })
    
    return NextResponse.json({ success: true, id: docRef.id })
  } catch (error) {
    console.error('Error saving survey response:', error)
    return NextResponse.json({ success: false, error: 'Failed to save response' }, { status: 500 })
  }
} 