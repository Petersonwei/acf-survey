'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Category, State } from '@/lib/types'
import { SurveyForm } from './survey-form'

interface StateSelectorProps {
  category: Category
}

export function StateSelector({ category }: StateSelectorProps) {
  const [selectedState, setSelectedState] = useState<State | null>(null)

  const selectedStateOption = selectedState 
    ? category.stateOptions.find(option => option.state === selectedState)
    : null

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{category.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <Select onValueChange={(value) => setSelectedState(value as State)}>
            <SelectTrigger>
              <SelectValue placeholder="選擇您的所在地" />
            </SelectTrigger>
            <SelectContent>
              {category.stateOptions.map((option) => (
                <SelectItem key={option.state} value={option.state}>
                  {option.state}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {selectedStateOption && (
        <SurveyForm 
          stateOption={selectedStateOption}
          categoryId={category.id}
        />
      )}
    </div>
  )
}