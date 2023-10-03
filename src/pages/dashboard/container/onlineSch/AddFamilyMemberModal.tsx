import SvgIcon from '../../../../components/SvgIcon'
import CustomDialog from '../../../../components/Dialog-custom'
import { Button, DialogContentText, DialogTitle, Divider } from '@mui/material'
import { theme } from '../../../../context/ThemeProvider'
import TxtInput from '@/components/TxtInput'
import SelectInput from '@/components/SelectInput'
import { DateInput } from '@/components/DateInput'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FamilyMemberFormField } from '@/types/onlineSchedulingTypes'
import { txtFieldValidation, dateSelectValidation } from '../../../../utils/form.validation'

type Props = {
  handleClose: () => void
  open: boolean
}

const FamilyMemberModal = ({ handleClose, open }: Props) => {
  const { control, setValue, setError, clearErrors, handleSubmit, reset } = useForm({
    defaultValues: {
      name: '',
      relation: '',
      dob: null as Date | null,
    } as FamilyMemberFormField,
  })

  const onSubmitHandle: SubmitHandler<FamilyMemberFormField> = (data) => {
    console.log(data)
    handleClose()
    reset()
  }

  return (
    <>
      <CustomDialog
        open={open}
        handleClose={handleClose}
        maxHeight={510}
        maxWidth={'lg'}
        header={{
          isHeader: true,
          component: (
            <DialogTitle id='scroll-dialog-title'>
              <div className='flex justify-between items-center'>
                <div>
                  <h1 className='leading-3'>Add Family Member</h1>
                </div>
                <div>
                  <button
                    onClick={() => {
                      handleClose()
                    }}
                  >
                    <SvgIcon iconName='cancel' svgProp={{ fill: theme.palette.mDarkGray?.main }} />
                  </button>
                </div>
              </div>
              <Divider sx={{ border: '3px solid', color: `${theme.palette.mDarkGray?.main}` }} />
            </DialogTitle>
          ),
        }}
        action={{
          isAction: false,
          component: 'heyy',
        }}
      >
        <DialogContentText id='scroll-dialog-description' tabIndex={-1}>
          <div className='flex w-[600px] py-5'>
            <form className='w-full' onSubmit={handleSubmit(onSubmitHandle)}>
              <div className='flex gap-4 mb-5'>
                <TxtInput
                  placeholder={'Enter name here'}
                  name={'name'}
                  control={control}
                  handleChange={() => {}}
                  validation={{ ...txtFieldValidation(true) }}
                />
                <SelectInput
                  options={[]}
                  name={'relation'}
                  control={control}
                  label={'Select primary reason for contact'}
                  setValue={setValue}
                  setError={() => {}}
                  clearErrors={() => {}}
                  validation={'Required'}
                />
              </div>
              <div className='flex gap-5 mb-5'>
                <DateInput
                  name='dateVal'
                  control={control}
                  clearErrors={clearErrors}
                  handleChange={() => {}}
                  validation={{ ...dateSelectValidation('date of birth') }}
                  label={'Date'}
                  setError={setError}
                />
              </div>
              <div className='flex justify-end py-5 w-full gap-5'>
                <Button
                  variant='contained'
                  color='mPink'
                  sx={{
                    minWidth: '150px',
                  }}
                  type='submit'
                >
                  Add
                </Button>
                <Button
                  variant='contained'
                  color='mPink'
                  sx={{
                    minWidth: '150px',
                  }}
                  onClick={() => {
                    handleClose()
                    reset()
                  }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </DialogContentText>
      </CustomDialog>
    </>
  )
}

export default FamilyMemberModal
