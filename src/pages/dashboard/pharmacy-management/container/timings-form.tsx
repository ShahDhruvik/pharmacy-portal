/* eslint-disable no-unsafe-optional-chaining */
import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Collapse,
  Divider,
  FormControlLabel,
  Switch,
  Typography,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { cloneDeep, divide } from 'lodash'
import { useState } from 'react'
import { LocalizationProvider, StaticTimePicker } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { TimePicker } from '@mui/x-date-pickers/TimePicker'
import FormDrawer from '@/components/common-components/FormDrawer'
import {
  Control,
  FieldErrors,
  UseFormClearErrors,
  UseFormRegister,
  UseFormSetError,
  UseFormSetValue,
  UseFormTrigger,
  UseFormWatch,
  useFieldArray,
} from 'react-hook-form'
import TimeInput from '@/components/form-inputs/TimeInput'
import { dateSelectValidation } from '@/utils/form.validation'
type Props = {
  setValue: UseFormSetValue<any>
  watch: UseFormWatch<any>
  defaultTimeValues: any
  errors: FieldErrors<any>
  register: UseFormRegister<any>
  trigger: UseFormTrigger<any>
  control: Control<any>
  clearErrors: UseFormClearErrors<any>
  setError: UseFormSetError<any>
  readOnly: boolean
}
const TimingsForm = ({
  setValue,
  watch,
  errors,
  clearErrors,
  setError,
  control,
  readOnly,
  defaultTimeValues,
}: Props) => {
  const operatingTiming = watch('operatingTiming')
  const dataBreaksMonday = useFieldArray({ control, name: `operatingTiming.${0}.breaks` })
  const dataBreaksTuesday = useFieldArray({ control, name: `operatingTiming.${1}.breaks` })
  const dataBreaksWednesday = useFieldArray({ control, name: `operatingTiming.${2}.breaks` })
  const dataBreaksThursday = useFieldArray({ control, name: `operatingTiming.${3}.breaks` })
  const dataBreaksFriday = useFieldArray({ control, name: `operatingTiming.${4}.breaks` })
  const dataBreaksSaturday = useFieldArray({ control, name: `operatingTiming.${5}.breaks` })
  const dataBreaksSunday = useFieldArray({ control, name: `operatingTiming.${6}.breaks` })
  const operatingTimingData = [
    {
      index: 0,
      breaks: dataBreaksMonday,
    },
    {
      index: 1,
      breaks: dataBreaksTuesday,
    },
    {
      index: 2,
      breaks: dataBreaksWednesday,
    },
    {
      index: 3,
      breaks: dataBreaksThursday,
    },
    {
      index: 4,
      breaks: dataBreaksFriday,
    },
    {
      index: 5,
      breaks: dataBreaksSaturday,
    },
    {
      index: 6,
      breaks: dataBreaksSunday,
    },
  ]
  return (
    <div className=' flex flex-col gap-5'>
      {operatingTimingData.map((x) => {
        return (
          <div className='bg-mLightWhite-main shadow-cardShadow' key={x?.index}>
            <div className='flex justify-between items-center px-container'>
              <p className='font-semibold'>{operatingTiming[x?.index].day}</p>
              <Switch
                checked={operatingTiming[x?.index].offDay}
                disabled={readOnly}
                onChange={(event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
                  setValue(`operatingTiming.${x?.index}.offDay`, checked)
                }}
              />
            </div>
            <Collapse in={!operatingTiming[x?.index].offDay}>
              <Divider sx={{ mb: 2 }} />
              <div className='px-container flex '>
                <div className='flex flex-1 items-center gap-5'>
                  <div className='basis-1/3'>
                    <p>Start Time</p>
                    <TimeInput
                      control={control}
                      clearErrors={clearErrors}
                      handleChange={() => {}}
                      label=''
                      name={`operatingTiming.${x?.index}.startTime`}
                      required={true}
                      setError={setError}
                      setValue={setValue}
                      validation={dateSelectValidation('Start Time')}
                      size='small'
                      actions={['accept']}
                      isDisabled={readOnly}
                    />
                  </div>
                  <div className='basis-1/3'>
                    <p>End Time</p>
                    <TimeInput
                      control={control}
                      clearErrors={clearErrors}
                      handleChange={() => {}}
                      label=''
                      name={`operatingTiming.${x?.index}.endTime`}
                      required={true}
                      setError={setError}
                      setValue={setValue}
                      validation={dateSelectValidation('End Time')}
                      size='small'
                      actions={['accept']}
                      isDisabled={readOnly}
                    />
                  </div>
                </div>
                <div>
                  <Button
                    color='mPink'
                    onClick={() => {
                      setValue(`operatingTiming.${x?.index}`, {
                        ...operatingTiming[x?.index],
                        ...defaultTimeValues,
                      })
                    }}
                    disabled={readOnly}
                  >
                    Reset
                  </Button>
                </div>
              </div>
              <Divider sx={{ my: 2 }} />
              <div className='px-container flex '>
                <div className='flex flex-1 items-center gap-5'>
                  <div className='basis-1/3'>
                    <p>Start Lunch Time</p>
                    <TimeInput
                      control={control}
                      clearErrors={clearErrors}
                      handleChange={() => {}}
                      label=''
                      name={`operatingTiming.${x?.index}.lunchTimeStart`}
                      required={true}
                      setError={setError}
                      setValue={setValue}
                      validation={dateSelectValidation('Start Lunch Time')}
                      size='small'
                      actions={['accept']}
                      isDisabled={readOnly}
                    />
                  </div>
                  <div className='basis-1/3'>
                    <p>End Lunch Time</p>
                    <TimeInput
                      control={control}
                      clearErrors={clearErrors}
                      handleChange={() => {}}
                      label=''
                      name={`operatingTiming.${x?.index}.lunchTimeEnd`}
                      required={true}
                      setError={setError}
                      setValue={setValue}
                      validation={dateSelectValidation('End Lunch Time')}
                      size='small'
                      actions={['accept']}
                      isDisabled={readOnly}
                    />
                  </div>
                </div>
                <div>
                  <Button
                    color='mPink'
                    onClick={() => {
                      setValue(`operatingTiming.${x?.index}`, {
                        ...operatingTiming[x?.index],
                        ...defaultTimeValues,
                      })
                    }}
                    disabled={readOnly}
                  >
                    Reset
                  </Button>
                </div>
              </div>
              <Divider sx={{ mt: 2 }} />
              <div className='px-container pb-container'>
                <div className='flex justify-between items-center '>
                  <p className='font-semibold'>Breaks</p>
                  <Button
                    color='mPink'
                    onClick={() => {
                      console.log(defaultTimeValues)
                      x?.breaks.append({
                        // startTime: defaultTimeValues?.lunchTimeStart,
                        // endTime: defaultTimeValues?.lunchTimeEnd,
                        startTime: null,
                        endTime: null,
                      })
                    }}
                    disabled={readOnly}
                  >
                    Add +
                  </Button>
                </div>
                <div className='flex flex-col gap-3'>
                  {x?.breaks?.fields.map((brk, i) => {
                    return (
                      <div className='flex items-center gap-5'>
                        <div className='basis-1/3'>
                          <TimeInput
                            control={control}
                            clearErrors={clearErrors}
                            handleChange={() => {}}
                            label='Start Time'
                            name={`operatingTiming.${x?.index}.breaks.${i}.startTime`}
                            required={true}
                            setError={setError}
                            setValue={setValue}
                            validation={dateSelectValidation('Start Time')}
                            size='small'
                            actions={['accept']}
                            isDisabled={readOnly}
                          />
                        </div>
                        <div className='basis-1/3'>
                          <TimeInput
                            control={control}
                            clearErrors={clearErrors}
                            handleChange={() => {}}
                            label='End Time'
                            name={`operatingTiming.${x?.index}.breaks.${i}.endTime`}
                            required={true}
                            setError={setError}
                            setValue={setValue}
                            validation={dateSelectValidation('End Time')}
                            size='small'
                            actions={['accept']}
                            isDisabled={readOnly}
                          />
                        </div>
                        <div>
                          <Button
                            disabled={readOnly}
                            color='mPink'
                            onClick={() => {
                              x?.breaks?.remove(i)
                            }}
                          >
                            <DeleteIcon />
                          </Button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </Collapse>
          </div>
        )
      })}
    </div>
  )
}

export default TimingsForm
