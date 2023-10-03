import AssessmentWhiteBox from '@/components/AssessmentWhiteBox'
import CheckBoxInput from '@/components/CheckBoxInput'
import { qNAList, useAssessment } from '@/context/AssessmentContext'
import { theme } from '@/context/ThemeProvider'
import { useToast } from '@/hooks/useToast'
import { AssessmentState } from '@/types/assessmentTypes'
import { Button, Divider, FormControlLabel, ListItemButton } from '@mui/material'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

type Props = {}

// const qNAList = [
//   {
//     _id: 0,
//     question: 'What care are you interested in?',
//     options: [
//       { _id: 0, txt: 'Sexual Health' },
//       { _id: 1, txt: 'Mental Health' },
//       { _id: 2, txt: 'Visual Health' },
//       { _id: 3, txt: 'Dental Health' },
//       { _id: 4, txt: 'General Health' },
//       { _id: 5, txt: 'Visual Health' },
//       { _id: 6, txt: 'Dental Health' },
//       { _id: 7, txt: 'General Health' },
//       { _id: 8, txt: 'General Health' },
//       { _id: 9, txt: 'General Health' },
//       { _id: 10, txt: 'General Health' },
//       { _id: 11, txt: 'General Health' },
//     ],
//   },
//   {
//     _id: 1,
//     question: 'What care are you interested in?',
//     options: [
//       { _id: 0, txt: 'Sexual Health' },
//       { _id: 1, txt: 'Mental Health' },
//       { _id: 2, txt: 'Visual Health' },
//       { _id: 3, txt: 'Dental Health' },
//       { _id: 4, txt: 'General Health' },
//       { _id: 5, txt: 'Visual Health' },
//       { _id: 6, txt: 'Dental Health' },
//       { _id: 7, txt: 'General Health' },
//     ],
//   },
//   {
//     _id: 2,
//     question: 'What care are you interested in?',
//     options: [
//       { _id: 0, txt: 'Sexual Health' },
//       { _id: 1, txt: 'Mental Health' },
//       { _id: 2, txt: 'Visual Health' },
//     ],
//   },
// ]

const AssistQNA = (props: Props) => {
  const showToast = useToast()
  const { question, answer, setAnswer, setQuestion } = useAssessment()
  const { control, handleSubmit } = useForm({
    defaultValues: {
      ansChecked: false,
    },
  })
  const onSubmitHandle = (data: any) => {
    const isAnswered = answer?.find((ans) => ans.questionId === question._id)
    if (isAnswered) {
      console.log(data)
      console.log(answer)
    } else {
      showToast('error', 'Please select an answer')
      return
    }
  }
  return (
    <AssessmentWhiteBox name='Daisy'>
      <div>
        <div className='min-h-[350px]  max-h-[350px] overflow-y-scroll hideScroll pt-3 pb-5'>
          <h1>{question.qes}</h1>
          {question?.options.map((y) => {
            const selectedAnswer = answer?.find((ans) => ans.answerId === y._id)
            return (
              <ListItemButton
                sx={{
                  backgroundColor:
                    selectedAnswer?.answerId === y._id && selectedAnswer.questionId === question._id
                      ? theme.palette.mDarkGray?.main
                      : '',
                  color:
                    selectedAnswer?.answerId === y._id && selectedAnswer.questionId === question._id
                      ? theme.palette.mWhite?.main
                      : '',

                  width: 400,
                  px: '5px',
                  py: '3px',
                  border: `2px solid ${theme.palette.mMediumGray?.main}`,
                  borderRadius: '5px',
                  my: '8px',
                  fontSize: '14px',
                  fontWeight: 500,
                  ':hover': {
                    backgroundColor:
                      selectedAnswer?.answerId === y._id &&
                      selectedAnswer.questionId === question._id
                        ? theme.palette.mDarkGray?.main
                        : '',
                    color:
                      selectedAnswer?.answerId === y._id &&
                      selectedAnswer.questionId === question._id
                        ? theme.palette.mWhite?.main
                        : '',
                  },
                }}
                key={y._id}
                onClick={() => {
                  const prevSelectedAns = answer?.filter((sel) => sel.questionId !== question._id)
                  if (prevSelectedAns) {
                    setAnswer([
                      ...answer?.filter((ans) => ans.questionId !== question._id),
                      { answerId: y._id, questionId: question._id },
                    ])
                  } else {
                    setAnswer([{ answerId: y._id, questionId: question._id }])
                  }
                }}
              >
                {y.label}
              </ListItemButton>
            )
          })}
        </div>
        <Divider
          sx={{
            border: `2px solid ${theme.palette.mMediumGray?.main}`,
            borderRadius: '8px',
            overflowX: 'visible',
          }}
        />
        <form onSubmit={handleSubmit(onSubmitHandle)}>
          {question.isFinal && (
            <div className='flex flex-col items-center'>
              <FormControlLabel
                sx={{
                  '.MuiButtonBase-root': {
                    py: 0,
                    px: '2px',
                  },
                  mt: 1,
                }}
                control={<CheckBoxInput control={control} name='ansChecked' />}
                label={
                  <p className='text-sm'>
                    I have answered all the questions to best of my knowledge
                  </p>
                }
              />
              <p className='mt-1 max-w-lg text-sm'>
                Once you submit your response for the assessment based on the diagnosis you will be
                presented with treatment plan options. Please select one of the treatment plan for
                complete care.
              </p>
            </div>
          )}
          <div className={`my-2 flex justify-end ${question.isFinal ? 'gap-2' : ''}`}>
            {!question.isFinal && (
              <Button
                color='mPink'
                sx={{
                  padding: 0,
                  minWidth: 100,
                }}
                onClick={() => {
                  const isAnswered = answer?.find((ans) => ans.questionId === question._id)
                  if (isAnswered) {
                    const prevAns = question.options.find((op) => op._id === isAnswered.answerId)
                    if (prevAns) {
                      const nextQuestion = qNAList.find((qes) => qes._id === prevAns.nextId)
                      setQuestion(nextQuestion as AssessmentState['question'])
                    }
                  } else {
                    showToast('error', 'Please select an answer')
                  }
                }}
              >
                Next
              </Button>
            )}
            {question.isFinal && (
              <Button
                color='mLightBlack'
                sx={{
                  minWidth: 100,
                  maxHeight: 20,
                }}
                onClick={() => {
                  setAnswer([])
                  setQuestion(qNAList[0])
                }}
              >
                Restart assessment
              </Button>
            )}
            {question.isFinal && (
              <Button
                color='mPink'
                type='submit'
                sx={{
                  minWidth: 100,
                  maxHeight: 20,
                }}
              >
                Submit My response
              </Button>
            )}
          </div>
        </form>
      </div>
    </AssessmentWhiteBox>
  )
}

export default AssistQNA
