import { ASSESST_AREA } from '@/utils/constants'
import { Dispatch, SetStateAction } from 'react'
export type CloseCardType = {
    id: number
    image: string
    btnTxt: string
    btnBelowtxt: string
    onClickFnc: () => void
}

type Question = { _id: string, qes: string, options: { _id: string, label: string, nextId: string }[], isFinal: boolean }
type Answer = { answerId: string, questionId: string }[]
type AssesstArea = Array<ASSESST_AREA.AUTH | ASSESST_AREA.FAQ | ASSESST_AREA.QNA | ASSESST_AREA.SLIDER>
export type AssessmentState = {
    question: Question;
    setQuestion: Dispatch<SetStateAction<Question>>;
    answer: Answer;
    setAnswer: Dispatch<SetStateAction<Answer>>;
    area: AssesstArea;
    setArea: Dispatch<SetStateAction<AssesstArea>>;
};
