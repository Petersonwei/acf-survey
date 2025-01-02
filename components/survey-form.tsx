'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { Question, StateOption, SurveyAnswer } from '@/lib/types'
import { saveSurveyResponse } from '@/lib/firebase-service'

interface SurveyFormProps {
  stateOption: StateOption
  categoryId: string
}

export function SurveyForm({ stateOption, categoryId }: SurveyFormProps) {
  const router = useRouter()
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateAnswers = () => {
    const requiredQuestions = stateOption.questions
    const answeredQuestions = Object.keys(answers)
    return requiredQuestions.every(q => answeredQuestions.includes(q.id))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateAnswers()) {
      toast.error('請回答所有問題')
      return
    }

    setIsSubmitting(true)
    try {
      const userName = localStorage.getItem('surveyUser')
      if (!userName) {
        router.push('/')
        return
      }

      const formattedAnswers: SurveyAnswer[] = Object.entries(answers).map(([questionId, answer]) => ({
        questionId,
        answer
      }))

      const response = {
        id: Math.random().toString(36).substring(2, 9),
        userName,
        timestamp: new Date(),
        categoryId,
        state: stateOption.state,
        answers: formattedAnswers
      }

      const result = await saveSurveyResponse(response)
      if (result.success) {
        toast.success('問卷提交成功！')
        router.push('/thank-you')
      } else {
        throw new Error('Failed to save response')
      }
    } catch {
      toast.error('提交失敗，請稍後再試')
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderQuestion = (question: Question) => {
    switch (question.type) {
      case 'text':
        return (
          <Input
            value={answers[question.id] || ''}
            onChange={(e) => setAnswers({ ...answers, [question.id]: e.target.value })}
            placeholder="請輸入您的答案"
          />
        )
      case 'select':
        return (
          <Select
            value={answers[question.id] || ''}
            onValueChange={(value) => setAnswers({ ...answers, [question.id]: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="請選擇" />
            </SelectTrigger>
            <SelectContent>
              {question.options?.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )
      case 'radio':
        return (
          <RadioGroup
            value={answers[question.id] || ''}
            onValueChange={(value) => setAnswers({ ...answers, [question.id]: value })}
          >
            {question.options?.map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={`${question.id}-${option}`} />
                <Label htmlFor={`${question.id}-${option}`}>{option}</Label>
              </div>
            ))}
          </RadioGroup>
        )
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>{stateOption.description}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {stateOption.questions.map((question) => (
            <div key={question.id} className="space-y-2">
              <Label>{question.title}</Label>
              {renderQuestion(question)}
            </div>
          ))}
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? '提交中...' : '提交問卷'}
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
} 