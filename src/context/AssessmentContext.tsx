import { AssessmentState } from '@/types/assessmentTypes'
import { ASSESST_AREA } from '@/utils/constants'
import { ReactNode, createContext, useContext, useState } from 'react'

const AssessmentContext = createContext<AssessmentState | undefined>(undefined)

export const qNAList: AssessmentState['question'][] = [
  {
    _id: '00',
    qes: 'What care are you interested in?',
    options: [
      { _id: 'L0', label: 'Sexual Health', nextId: '01' },
      { _id: 'L1', label: 'Mental Health', nextId: '01' },
      { _id: 'L2', label: 'Visual Health', nextId: '01' },
    ],
    isFinal: false,
  },
  {
    _id: '01',
    qes: 'Do you smoke often?',
    options: [
      { _id: 'L10', label: 'Yes', nextId: '01' },
      { _id: 'L11', label: 'No', nextId: '01' },
    ],
    isFinal: true,
  },
]
export function AssessmentProvider({ children }: { children: ReactNode }) {
  const [question, setQuestion] = useState<AssessmentState['question']>(qNAList[0])
  const [answer, setAnswer] = useState<AssessmentState['answer']>()
  const [area, setArea] = useState<AssessmentState['area']>([ASSESST_AREA.AUTH, ASSESST_AREA.FAQ])
  const contextValue: AssessmentState = {
    question: question as AssessmentState['question'],
    setQuestion: setQuestion as AssessmentState['setQuestion'],
    answer: answer as AssessmentState['answer'],
    setAnswer: setAnswer as AssessmentState['setAnswer'],
    area: area as AssessmentState['area'],
    setArea: setArea as AssessmentState['setArea'],
  }
  return <AssessmentContext.Provider value={contextValue}>{children}</AssessmentContext.Provider>
}

export function useAssessment() {
  const context = useContext(AssessmentContext)
  if (!context) {
    throw new Error('useLoading must be used within AssessmentProvider')
  }
  return context
}
