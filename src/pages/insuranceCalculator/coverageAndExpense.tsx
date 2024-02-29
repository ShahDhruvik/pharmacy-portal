/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react'
import TxtInput from '@/components/TxtInput'
import { theme } from '@/context/ThemeProvider'
import { Drawer, Button, Divider, IconButton } from '@mui/material'
import {
  txtFieldValidation,
  numberFieldValidation,
  acDefaultValue,
  searchSelectValidation,
} from '@/utils/form.validation'
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form'
import SelectInput from '@/components/SelectInput'
import { SelectDDL } from '@/types/common'
import {
  dropdownAddedCoverage,
  dropdownClinic,
  dropdownFamily,
  dropdownRelation,
  dropdownSpentOn,
} from '@/lib/DropDownApis'
import { useLoading } from '@/context/LoadingContext'
import { useToast } from '@/hooks/useToast'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import CancelIcon from '@mui/icons-material/Cancel'
import {
  createCoverage,
  createExpense,
  editCoverage,
  editExpense,
  getAllDetails,
} from '@/lib/InsuranceCalculator'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import Spinner from '@/components/spinner'
import { MANAGE_STATE } from '@/components/SmallCard'
import { currencySymbol } from '@/utils/constants'

type Props = {
  handleClose: () => void
  open: boolean
  manageState: any
}

enum TYPE_ENUM {
  ADD_COVERAGE = 'ADD_COVERAGE',
  EDIT_COVERAGE = 'EDIT_COVERAGE',
  ADD_EXPENSE = 'ADD_EXPENSE',
  EDIT_EXPENSE = 'EDIT_EXPENSE',
  VIEW_EXPENSE = 'VIEW_EXPENSE',
}

enum CoverageTypeEnum {
  Dental = 'Dental',
  Vision = 'Vision',
  Drug = 'Drug',
  Health = 'Health',
}

const coverageType: SelectDDL[] = [
  {
    _id: CoverageTypeEnum.Dental,
    label: CoverageTypeEnum.Dental,
  },
  {
    _id: CoverageTypeEnum.Vision,
    label: CoverageTypeEnum.Vision,
  },
  {
    _id: CoverageTypeEnum.Drug,
    label: CoverageTypeEnum.Drug,
  },
  {
    _id: CoverageTypeEnum.Health,
    label: CoverageTypeEnum.Health,
  },
]

const CoverageAndExpenseBar = ({ open, handleClose, manageState }: Props) => {
  const { setLoading, loading } = useLoading()
  const showToast = useToast()
  const [item, setItems] = useState(false)
  const [type, setType] = useState('')
  const [member, setMember] = useState('')
  const [memberInternalId, setMemberInternalId] = useState('')
  const [familyData, setFamilyData] = useState<any[]>([])
  const [clinicData, setClinicData] = useState<SelectDDL[]>([])
  const [coverageData, setCoverageData] = useState<SelectDDL[]>([])
  const [addedCoverageId, setAddedCoverageId] = useState('')
  const [spentOnData, setSpentOnData] = useState<SelectDDL[]>([])
  const [data, setData] = useState<any[]>([])
  const [entity, setEntity] = useState<any>(null)
  const [show, setShow] = useState(false)
  const [deleted, setDeleted] = useState<any[]>([])
  const [clinic, setClinic] = useState('')

  const { control, getValues, reset, setValue, setError, clearErrors, handleSubmit, watch } =
    useForm({
      defaultValues: {
        familyMember: acDefaultValue,
        coverageType: acDefaultValue,
        coverageDetails: [{ name: '', amount: '' }] as any[],
        clinic: acDefaultValue,
        clinicName: '',
        coverageDetailId: acDefaultValue,
        amount: '',
        coverageId: acDefaultValue,
        accountId: '',
      },
    })
  const Watch = watch('familyMember') as any
  const coverageWatch = watch('coverageId') as any

  const drpFamily = async () => {
    const res = await dropdownFamily(setLoading, showToast)
    if (res) {
      setFamilyData(res)
    }
  }
  useEffect(() => {
    if (manageState === MANAGE_STATE.COVERAGE_AND_EXPENSE) {
      drpFamily()
    }
  }, [manageState])

  const drpClinic = async () => {
    const res = await dropdownClinic(setLoading, showToast)
    if (res) {
      setClinicData(res)
    }
  }
  useEffect(() => {
    if (type === TYPE_ENUM.ADD_EXPENSE) {
      drpClinic()
    }
  }, [type])

  const drpCoverage = async (id: string) => {
    if (memberInternalId !== '') {
      const res = await dropdownAddedCoverage(setLoading, showToast, id)
      if (res) {
        setCoverageData(res)
      }
    }
  }

  // useEffect(() => {
  //   if (type === TYPE_ENUM.ADD_EXPENSE) {
  //     drpCoverage(memberInternalId)
  //   }
  // }, [memberInternalId, type])

  const drpSpentOn = async (id: string) => {
    const res = await dropdownSpentOn(setLoading, showToast, id)
    if (res) {
      setSpentOnData(res)
    }
  }

  useEffect(() => {
    if (type === TYPE_ENUM.ADD_EXPENSE) {
      if (coverageWatch?._id !== '00') {
        setAddedCoverageId(coverageWatch?.internalId)
      }
    }
  }, [coverageWatch, type])

  useEffect(() => {
    if (addedCoverageId !== '' && type === TYPE_ENUM.ADD_EXPENSE) {
      drpSpentOn(addedCoverageId)
    }
  }, [coverageWatch, type])

  // useEffect(() => {
  //   if (familyData?.length > 0) {
  //     setMember(familyData[0]._id)
  //     setMemberInternalId(familyData[0].internalId)
  //   }
  // }, [familyData])

  useEffect(() => {
    if (Watch._id !== '00') {
      // setMemberInternalId(familyData[0].internalId)
      setMember(Watch?._id)
      setMemberInternalId(Watch?.internalId)
    }
  }, [Watch])

  const getData = async (id: string) => {
    const response = await getAllDetails(setLoading, showToast, id)
    if (response) {
      setData(response)
    }
  }

  useEffect(() => {
    if (type === '' && memberInternalId !== '') {
      getData(memberInternalId)
    }
    if (type === TYPE_ENUM.ADD_EXPENSE) {
      drpCoverage(memberInternalId)
    }
  }, [type, memberInternalId])

  const { fields, append, remove } = useFieldArray({
    control: control,
    name: 'coverageDetails',
  })

  const handleAppendClick = () => {
    append({ name: '', amount: '' })
  }

  useEffect(() => {
    if (entity) {
      setValue('accountId', entity?.accountId)
      setValue('coverageType', {
        label: entity?.coverageType,
        _id: entity?.coverageType,
      })
      setValue('clinic', {
        label: entity?.practice?.name,
        _id: entity?.practiceId,
      })
      setValue('coverageDetailId', {
        label: entity?.coverageDetail?.name,
        _id: entity?.coverageDetailId,
      })
      setValue('clinicName', entity?.otherPracticeName)
      setValue('amount', entity?.amount)
      setValue('coverageId', entity?.coverageId)
      const updateCoverageDetails = entity?.AccountCoverageDetails?.map((x: any) => {
        return {
          name: x?.name,
          amount: x?.amount,
          id: x?.id,
          accountId: x?.accountId,
        }
      })
      setDeleted(updateCoverageDetails), setValue('coverageDetails', updateCoverageDetails)
    } else {
      reset()
    }
  }, [entity])

  const onSubmitHandle: SubmitHandler<any> = async (data: any) => {
    console.log(data, 'data')

    if (type === TYPE_ENUM.ADD_COVERAGE) {
      const res = await createCoverage(setLoading, showToast, { ...data, accountId: member })
      if (res?.status === 201) {
        setItems(false)
        // getData()
      }
      setType('')
      reset()
    }
    if (type === TYPE_ENUM.EDIT_COVERAGE) {
      const res = await editCoverage(setLoading, showToast, {
        ...data,
        deleted: deleted,
        id: entity?.id,
      })
      if (res?.status === 201) {
        setItems(false)
        // getData()
      }
      setType('')
      reset()
    }
    if (type === TYPE_ENUM.ADD_EXPENSE) {
      const res = await createExpense(setLoading, showToast, { ...data, accountId: member })
      if (res?.status === 201) {
        setItems(false)
        // getData()
      }
      setType('')
      reset()
    }
    if (type === TYPE_ENUM.VIEW_EXPENSE && show) {
      const res = await editExpense(
        setLoading,
        showToast,
        {
          ...data,
        },
        entity?.internalId,
      )
      if (res?.status === 201) {
        setItems(false)
        // getData()
      }
      setType('')
      reset()
    }
  }

  if (!loading.isLoading && !loading.isIndependentLoader) {
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
        <form onSubmit={handleSubmit(onSubmitHandle)}>
          <div
            className={`flex ${
              type === '' ? 'justify-between' : `justify-end`
            } items-center mb-3 sticky top-0 z-10 py-[10px] bg-lightGray-main`}
            id='header'
          >
            {type === '' && (
              <Button
                variant='text'
                color='mMidBlue'
                sx={{
                  color: theme.palette.mMidBlue?.main,
                  minWidth: 'max-content',
                  fontSize: '1rem',

                  height: 20,
                }}
                onClick={() => {
                  setType(TYPE_ENUM.ADD_COVERAGE)
                  setItems((prevItems) => !prevItems)
                }}
                disableRipple
              >
                Add Coverage
              </Button>
            )}
            <Button
              variant='text'
              color='mMidBlue'
              sx={{
                color: theme.palette.mMidBlue?.main,
                minWidth: 'max-content',
                fontSize: '1rem',
                height: 20,
              }}
              onClick={() => {
                if (type !== '') {
                  setType('')
                }
                if (type === '') {
                  handleClose()
                }
                setEntity(null)
                setClinic('')
                reset()
              }}
              disableRipple
            >
              Done
            </Button>
          </div>
          {type === '' && (
            <div className='flex flex-col gap-5 mb-3'>
              <div>
                <h2 className='text-2xl'>Insurance Details</h2>
                <Divider
                  sx={{ borderColor: theme.palette.mDarkGray?.main, borderWidth: '1.5px' }}
                />
                <div className='mt-8 mb-4'>
                  <SelectInput
                    options={familyData as any}
                    name={'familyMember'}
                    control={control}
                    label={'Family Member*'}
                    setValue={setValue}
                    setError={setError}
                    clearErrors={clearErrors}
                    validation={searchSelectValidation('Family Member')}
                    selectDefault={true}
                    // handleChange={() => {
                    //   setMemberInternalId('')
                    // }}
                  />
                </div>
                <div className='flex justify-between mt-2 mb-3'>
                  <Button
                    variant='contained'
                    color='mPink'
                    sx={{
                      minWidth: 160,
                    }}
                    onClick={() => {
                      setType(TYPE_ENUM.VIEW_EXPENSE)
                      setItems((prevItems) => !prevItems)
                    }}
                    disableRipple
                  >
                    View Expense
                  </Button>
                  <Button
                    variant='contained'
                    color='mPink'
                    sx={{
                      minWidth: 160,
                    }}
                    onClick={() => {
                      setType(TYPE_ENUM.ADD_EXPENSE)
                      setItems((prevItems) => !prevItems)
                    }}
                    disableRipple
                  >
                    Add Expense
                  </Button>
                </div>
                <div>
                  {data.length > 0 ? (
                    data?.map((x) => (
                      <div className='mb-3'>
                        <div className='flex items-center justify-between'>
                          <h2 className='font-medium text-lg'>{x?.coverageType}</h2>
                          <Button
                            variant='text'
                            color='mMidBlue'
                            sx={{
                              color: theme.palette.mMidBlue?.main,
                              minWidth: 'max-content',
                            }}
                            onClick={() => {
                              setEntity(x)
                              setType(TYPE_ENUM.EDIT_COVERAGE)
                            }}
                            disableRipple
                          >
                            Edit
                          </Button>
                        </div>
                        {x?.AccountCoverageDetails.map((y: any) => (
                          <div className='mb-4'>
                            <div className='flex flex-col gap-2'>
                              <span className='text-xl font-medium text-end'>
                                {y?.AccountExpenses?.length > 0
                                  ? `${currencySymbol} ${y?.AccountExpenses?.reduce(
                                      (accumulator: any, currentValue: any) => {
                                        return accumulator + Number(currentValue.amount)
                                      },
                                      0,
                                    )}`
                                  : `${currencySymbol} ${0}`}
                              </span>
                              {y?.AccountExpenses?.length > 0 && y?.amount ? (
                                <div className='w-full rounded-full h-1.5 dark:bg-lightBlue-main'>
                                  <div
                                    className='bg-pink-main h-1.5 rounded-full'
                                    style={{
                                      width: `${
                                        Number(y?.amount) <
                                        Number(
                                          y?.AccountExpenses?.reduce(
                                            (accumulator: any, currentValue: any) => {
                                              return accumulator + Number(currentValue.amount)
                                            },
                                            0,
                                          ),
                                        )
                                          ? 100
                                          : (y?.AccountExpenses?.reduce(
                                              (accumulator: any, currentValue: any) => {
                                                return accumulator + Number(currentValue.amount)
                                              },
                                              0,
                                            ) /
                                              y?.amount) *
                                            100
                                      }%`,
                                    }}
                                  />
                                </div>
                              ) : (
                                <div className='w-full rounded-full h-1.5 dark:bg-lightBlue-main'>
                                  <div
                                    className='bg-pink-main h-1.5 rounded-full'
                                    style={{ width: '0%' }}
                                  />
                                </div>
                              )}

                              <div className='flex justify-between text-darkGray-main text-sm'>
                                <span>{y?.name}</span>
                                <span>{`${currencySymbol} ${y?.amount}`}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ))
                  ) : (
                    <div className='flex flex-col items-center justify-center h-40'>
                      <div className='bg-lightBlue-light border-2 border-black-light rounded-md text-center py-7 '>
                        You don't have any coverage details, please add coverage details.
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          {(type === TYPE_ENUM.ADD_COVERAGE || type === TYPE_ENUM.EDIT_COVERAGE) && (
            // <form className='w-full' onSubmit={handleSubmit(onSubmitHandle)}>
            <div className='flex flex-col gap-5 mb-3'>
              <h2 className='text-2xl'>Add Coverage</h2>
              <Divider sx={{ borderColor: theme.palette.mDarkGray?.main, borderWidth: '1.5px' }} />
              <div className='mt-8 mb-4'>
                <SelectInput
                  options={coverageType as any}
                  name={'coverageType'}
                  control={control}
                  label={'Coverage  Type*'}
                  setValue={setValue}
                  setError={setError}
                  clearErrors={clearErrors}
                  validation={searchSelectValidation('Coverage')}
                  isDisabled={type === TYPE_ENUM.EDIT_COVERAGE ? true : false}
                />
                <div className='mt-4 border-2 px-4 pt-3 border-pink-main border-dotted rounded-md'>
                  <span>Coverage Details</span>
                  <div role='button' onClick={handleAppendClick} className='flex justify-end mb-2'>
                    <AddCircleIcon sx={{ width: 20, height: 20 }} />
                  </div>
                  {fields?.map((x, i) => {
                    return (
                      <div className='mb-5' key={i}>
                        <div className='flex items-center gap-3 mb-5' key={x.id}>
                          <TxtInput
                            control={control}
                            handleChange={() => {}}
                            name={`coverageDetails.${i}.name`}
                            placeholder='Details'
                            validation={txtFieldValidation(true)}
                            label='Details*'
                          />
                          <TxtInput
                            control={control}
                            handleChange={() => {}}
                            name={`coverageDetails.${i}.amount`}
                            placeholder='Amount'
                            validation={txtFieldValidation(true, 'PositiveNumbers')}
                            label='Amount*'
                          />
                          {i === 0 ? (
                            <div>
                              <CancelIcon
                                sx={{ width: 20, height: 20, pointerEvents: 'none', opacity: 0.5 }}
                              />
                            </div>
                          ) : (
                            <div role='button' onClick={() => remove(i)}>
                              <CancelIcon sx={{ width: 20, height: 20 }} />
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
              <div className='flex mt-2 mb-3 justify-end'>
                <Button
                  variant='contained'
                  color='mPink'
                  sx={{
                    minWidth: 165,
                  }}
                  disableRipple
                  type='submit'
                >
                  Submit
                </Button>
              </div>
            </div>
            // </form>
          )}
          {type === TYPE_ENUM.ADD_EXPENSE && (
            // <form className='w-full' onSubmit={handleSubmit(onSubmitHandle)}>
            <div className='flex flex-col gap-5 mb-3'>
              <div>
                <h2 className='text-2xl'>Add New Expense</h2>
                <Divider
                  sx={{ borderColor: theme.palette.mDarkGray?.main, borderWidth: '1.5px' }}
                />
                <div className='mt-8 mb-4'>
                  <div className='mb-3'>
                    <SelectInput
                      options={clinicData as any}
                      name={'clinic'}
                      control={control}
                      label={'Clinic*'}
                      setValue={setValue}
                      setError={setError}
                      clearErrors={clearErrors}
                      validation={searchSelectValidation('Clinic')}
                      handleChange={() => {
                        setClinic(getValues('clinic') && getValues('clinic')?.label)
                      }}
                    />
                  </div>
                  {clinic === 'Other' && (
                    <div className='mb-3'>
                      <TxtInput
                        control={control}
                        handleChange={() => {}}
                        name={'clinicName'}
                        placeholder='Clinic Name'
                        validation={txtFieldValidation(false)}
                        label='Clinic Name'
                      />
                    </div>
                  )}
                  <div className='mb-3'>
                    <SelectInput
                      options={coverageData as any}
                      name={'coverageId'}
                      control={control}
                      label={'Coverage  Type*'}
                      setValue={setValue}
                      setError={setError}
                      clearErrors={clearErrors}
                      validation={searchSelectValidation('Coverage')}
                      handleChange={() => {}}
                    />
                  </div>
                  <div className='mb-3'>
                    <SelectInput
                      options={spentOnData as any}
                      name={'coverageDetailId'}
                      control={control}
                      label={'Spent On*'}
                      setValue={setValue}
                      setError={setError}
                      clearErrors={clearErrors}
                      validation={searchSelectValidation('Coverage')}
                    />
                  </div>
                  <div className='mb-3'>
                    <TxtInput
                      control={control}
                      handleChange={() => {}}
                      name={`amount`}
                      placeholder='Amount'
                      validation={txtFieldValidation(true)}
                      label='Amount*'
                    />
                  </div>
                </div>
                <div className='flex mt-2 mb-3 justify-end'>
                  <Button
                    variant='contained'
                    color='mPink'
                    sx={{
                      minWidth: 165,
                    }}
                    type='submit'
                    disableRipple
                  >
                    Add
                  </Button>
                </div>
              </div>
            </div>
            // </form>
          )}
          {type === TYPE_ENUM.VIEW_EXPENSE && (
            <div className='flex flex-col gap-5 mb-3'>
              <div>
                <h2 className='text-2xl'>All Coverage</h2>
                <Divider
                  sx={{ borderColor: theme.palette.mDarkGray?.main, borderWidth: '1.5px' }}
                />
                {data.length > 0 &&
                  data.map((x) => (
                    <div className='my-3'>
                      <div className='flex items-center justify-between'>
                        <h2 className='font-medium'>{x?.coverageType}</h2>
                        <Button
                          variant='text'
                          color='mMidBlue'
                          sx={{
                            color: theme.palette.mMidBlue?.main,
                            minWidth: 'max-content',
                          }}
                          onClick={() => {
                            setEntity(x)
                            setType(TYPE_ENUM.EDIT_COVERAGE)
                          }}
                          disableRipple
                        >
                          Edit
                        </Button>
                      </div>
                      {x?.AccountCoverageDetails.map((y: any) => (
                        <>
                          <div className='mb-4'>
                            <div className='flex flex-col gap-2'>
                              <span className='text-xl font-medium text-end'>
                                {y?.AccountExpenses?.length > 0
                                  ? `${currencySymbol} ${y?.AccountExpenses?.reduce(
                                      (accumulator: any, currentValue: any) => {
                                        return accumulator + Number(currentValue.amount)
                                      },
                                      0,
                                    )}`
                                  : `${currencySymbol} ${0}`}
                              </span>
                              {y?.AccountExpenses?.length > 0 && y?.amount ? (
                                <div className='w-full rounded-full h-1.5 dark:bg-lightBlue-main'>
                                  <div
                                    className='bg-pink-main h-1.5 rounded-full'
                                    style={{
                                      width: `${
                                        Number(y?.amount) <
                                        Number(
                                          y?.AccountExpenses?.reduce(
                                            (accumulator: any, currentValue: any) => {
                                              return accumulator + Number(currentValue.amount)
                                            },
                                            0,
                                          ),
                                        )
                                          ? 100
                                          : (y?.AccountExpenses?.reduce(
                                              (accumulator: any, currentValue: any) => {
                                                return accumulator + Number(currentValue.amount)
                                              },
                                              0,
                                            ) /
                                              y?.amount) *
                                            100
                                      }%`,
                                    }}
                                  />
                                </div>
                              ) : (
                                <div className='w-full rounded-full h-1.5 dark:bg-lightBlue-main'>
                                  <div
                                    className='bg-pink-main h-1.5 rounded-full'
                                    style={{ width: '0%' }}
                                  />
                                </div>
                              )}

                              <div className='flex justify-between text-darkGray-main text-sm'>
                                <span>{y?.name}</span>
                                <span>{`${currencySymbol} ${y?.amount}`}</span>
                              </div>
                            </div>
                          </div>
                          {y?.AccountExpenses?.length > 0 && (
                            <table className='flex flex-col mb-8'>
                              <th className='flex justify-between w-full text-start font-light'>
                                <td className='w-3/5'>Clinic</td>
                                <td className='w-1/4'>Spent</td>
                                <td className='w-[15%]'>Action</td>
                              </th>
                              <Divider
                                sx={{
                                  borderColor: theme.palette.mDarkGray?.main,
                                  borderWidth: '2px',
                                }}
                              />
                              {y?.AccountExpenses?.length > 0 &&
                                y?.AccountExpenses.map((z: any) => (
                                  <>
                                    <tr
                                      className='flex text-start w-full items-center text-black-main border-b-[1px] border-black-main h-10'
                                      key={Math.random()}
                                    >
                                      <td className='w-3/5'>{z?.PracticeInfo?.name}</td>
                                      <td className='w-1/4'>{`${currencySymbol} ${z?.amount}`}</td>
                                      <td className='w-[15%]'>
                                        {!show && (
                                          <Button
                                            variant='text'
                                            color='mMidBlue'
                                            sx={{
                                              color: theme.palette.mMidBlue?.main,
                                              minWidth: 'max-content',
                                            }}
                                            onClick={() => {
                                              setEntity(z)
                                              setShow(!show)
                                            }}
                                            disableRipple
                                          >
                                            Edit
                                          </Button>
                                        )}
                                        {show && entity.internalId === z.internalId && (
                                          <div className='flex gap-1'>
                                            <div
                                              role='button'
                                              onClick={() => {
                                                setShow(false)
                                              }}
                                            >
                                              <CancelIcon
                                                sx={{
                                                  width: 20,
                                                  height: 20,
                                                  pointerEvents: 'none',
                                                  color: theme.palette.mOrange?.main,
                                                }}
                                              />
                                            </div>
                                            <button type='submit'>
                                              <CheckCircleIcon
                                                sx={{
                                                  width: 20,
                                                  height: 20,
                                                  color: theme.palette.mGreen?.main,
                                                }}
                                              />
                                            </button>
                                          </div>
                                        )}
                                      </td>
                                    </tr>
                                    {show && entity.internalId === z.internalId && (
                                      <div className='my-1'>
                                        <span>Expense</span>
                                        <div className='mt-3 mb-2'>
                                          <TxtInput
                                            control={control}
                                            handleChange={() => {}}
                                            name={'amount'}
                                            placeholder='Amount'
                                            validation={txtFieldValidation(true, 'PositiveNumbers')}
                                            label='Amount*'
                                          />
                                        </div>
                                        <Divider
                                          sx={{
                                            borderColor: theme.palette.mDarkGray?.main,
                                            borderWidth: '0.5px',
                                          }}
                                        />
                                      </div>
                                    )}
                                  </>
                                ))}
                            </table>
                          )}
                        </>
                      ))}
                    </div>
                  ))}
              </div>
            </div>
          )}
        </form>
      </Drawer>
    )
  } else {
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
        <div className='min-h-screen flex items-center justify-center'>
          <Spinner />
        </div>
      </Drawer>
    )
  }
}

export default CoverageAndExpenseBar
