import { SurveyResponse } from './types'

export async function saveSurveyResponse(response: SurveyResponse) {
  try {
    const res = await fetch('/api/survey', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(response)
    })
    
    const data = await res.json()
    return data
  } catch (error) {
    console.error('Error saving survey response:', error)
    return { success: false, error }
  }
}

export async function getSurveyStats(categoryId: string, state: string) {
  try {
    const res = await fetch(`/api/stats?categoryId=${categoryId}&state=${state}`)
    const data = await res.json()
    return data
  } catch (error) {
    console.error('Error getting survey stats:', error)
    return { success: false, error }
  }
} 