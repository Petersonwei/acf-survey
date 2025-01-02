import { firestore } from '@/firebase/server'
import { SurveyResponse } from './types'

export async function getSurveyStats(categoryId: string, state: string) {
  const snapshot = await firestore
    .collection('survey-responses')
    .where('categoryId', '==', categoryId)
    .where('state', '==', state)
    .get()

  const responses = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as SurveyResponse[]

  return responses
} 