import { theme } from '@/context/ThemeProvider'
import { Drawer, Button, Tabs, Tab, Badge, Divider, Checkbox } from '@mui/material'
import { useState } from 'react'
import { DrawerState, FieldProfState, HeadProfState, SelectDDL } from '@/types/common'
import { DRAWERSTATE } from '@/utils/constants'
import { SubmitHandler, useForm } from 'react-hook-form'
import { acDefaultValue, searchSelectValidation, txtFieldValidation } from '@/utils/form.validation'
import TxtInput from '@/components/TxtInput'
import SelectInput from '@/components/SelectInput'
import CheckBoxInput from '@/components/CheckBoxInput'
import EditIcon from '@mui/icons-material/Edit'
type Props = {
  handleClose: () => void
  open: boolean
}

export type FieldStateProps = {
  fieldName: FieldProfState | undefined
  data: string | undefined
  headName: HeadProfState | undefined
  isConfirm?: boolean
}
type MedicalFormFields = {
  email: string
  family: SelectDDL
  forms: { _id: number; label: string }[]
}
const MedicalFormBar = ({ open, handleClose }: Props) => {
  //Tab
  const [tabIndex, setTabIndex] = useState(0)
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue)
  }
  const familyOptions = [
    acDefaultValue,
    { _id: 'Mother', label: 'Mother' },
    { _id: 'Father', label: 'Father' },
  ]
  const formOptions = [
    { _id: 0, label: 'Patient Information Form' },
    { _id: 1, label: 'Medical Condition Form' },
  ]

  const { control, setError, setValue, clearErrors, getValues, reset, handleSubmit } = useForm({
    defaultValues: {
      email: '',
      family: acDefaultValue,
      forms: [{ _id: 0, label: 'Patient Information Form' }],
    },
  })
  const onSubmitHandle: SubmitHandler<MedicalFormFields> = (data) => {
    console.log(data)
  }
  return (
    <Drawer
      anchor='right'
      open={open}
      onClose={handleClose}
      sx={{
        width: '25%',
        '& .MuiDrawer-paper': {
          width: '25%',
          px: '20px',
          backgroundColor: theme.palette.mLightGray?.main,
        },
      }}
    >
      <Tabs
        value={tabIndex}
        onChange={handleTabChange}
        centered
        variant='fullWidth'
        TabIndicatorProps={{
          sx: {
            backgroundColor: theme.palette.mPink?.main,
          },
        }}
      >
        <Tab label={<p className='capitalize'>My Forms</p>} value={0} />
        <Tab
          label={
            <Badge>
              <p className='capitalize'>Requested Forms</p>
            </Badge>
          }
          value={1}
        />
      </Tabs>
      {tabIndex == 0 && (
        <form onSubmit={handleSubmit(onSubmitHandle)}>
          <div className='pt-5 flex flex-col gap-5 min-h-screen'>
            <TxtInput
              control={control}
              name='email'
              handleChange={() => {}}
              placeholder='Enter email'
              validation={txtFieldValidation(true, 'Email')}
            />
            <SelectInput
              control={control}
              clearErrors={clearErrors}
              label='Family Member'
              name='family'
              options={familyOptions}
              setError={setError}
              setValue={setValue}
              validation={searchSelectValidation('Family Member')}
            />
            <div>
              <p className='font-semibold text-xl ml-[6px] '>Select Forms</p>
              <Divider sx={{ borderColor: theme.palette.mDarkGray?.main, borderWidth: '1.5px' }} />
            </div>
            <div className='flex flex-col gap-3 flex-1 overflow-y-scroll hideScroll'>
              {formOptions.map((x) => {
                return (
                  <div
                    key={x._id}
                    className='flex items-center justify-between bg-white-main px-2 rounded-md'
                  >
                    <div className='flex items-center gap-2'>
                      <Checkbox
                        checked={getValues('forms').find((y) => y._id === x._id) ? true : false}
                        onChange={(e, checked) => {
                          if (checked) {
                            reset((formValues) => {
                              return {
                                ...formValues,
                                forms: [...formValues.forms, x],
                              }
                            })
                          } else {
                            reset((formValues) => {
                              const filteredForms = formValues.forms.filter((t) => t._id !== x._id)
                              return {
                                ...formValues,
                                forms: [...filteredForms],
                              }
                            })
                          }
                        }}
                      />
                      <p
                        className={`${
                          getValues('forms').find((y) => y._id === x._id)
                            ? 'text-blue-main'
                            : 'text-black-main'
                        }`}
                      >
                        {x.label}
                      </p>
                    </div>
                    <EditIcon sx={{ fontSize: 20 }} />
                  </div>
                )
              })}
            </div>
            <div className='sticky bottom-0 flex items-end justify-end bg-lightGray-main py-5 w-full'>
              <Button color='mPink' type='submit'>
                Submit Selected Forms
              </Button>
            </div>
          </div>
        </form>
      )}
      {tabIndex == 1 && <div>Item One</div>}
    </Drawer>
  )
}

export default MedicalFormBar
