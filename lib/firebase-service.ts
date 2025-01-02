export async function saveSurveyResponse(response: any) {
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
    const snapshot = await firestore
      .collection('survey-responses')
      .where('categoryId', '==', categoryId)
      .where('state', '==', state)
      .get()

    const responses = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as SurveyResponse[]

    const stats = responses.reduce((acc, response) => {
      response.answers.forEach(answer => {
        const key = `${answer.questionId}`
        if (!acc[key]) {
          acc[key] = {}
        }
        if (!acc[key][answer.answer]) {
          acc[key][answer.answer] = 0
        }
        acc[key][answer.answer]++
      })
      return acc
    }, {} as Record<string, Record<string, number>>)

    return { success: true, stats }
  } catch (error) {
    console.error('Error getting survey stats:', error)
    return { success: false, error }
  }
} 