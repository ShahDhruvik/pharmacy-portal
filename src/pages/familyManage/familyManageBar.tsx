/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react'
import TxtInput from '@/components/TxtInput'
import { theme } from '@/context/ThemeProvider'
import {
  Drawer,
  Button,
  Divider,
  IconButton,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Tooltip,
  DialogTitle,
} from '@mui/material'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import SelectInput from '@/components/SelectInput'
import { DateInput } from '@/components/DateInput'
import {
  txtFieldValidation,
  dateSelectValidation,
  numberFieldValidation,
  searchSelectValidation,
  acDefaultValue,
} from '@/utils/form.validation'
import { createFamily, deleteFamily, editFamily, getAllFamily } from '@/lib/Family'
import { useLoading } from '@/context/LoadingContext'
import { useToast } from '@/hooks/useToast'
import { ALIGN_DIALOG, formatDate, splitDescription } from '@/utils/constants'
import Spinner from '@/components/spinner'
import CustomDialog from '@/components/Dialog-custom'
import CloseIcon from '@mui/icons-material/Close'
import { FamilyField } from '@/types/FamilyTypes'

type Props = {
  handleClose: () => void
  open: boolean
}

export const enum FAMILY_RELATION {
  SELF = 'Self',
  SPOUSE = 'Spouse',
  SON = 'Son',
  DAUGHTER = 'Daughter',
  MOTHER = 'Mother',
  FATHER = 'Father',
  FATHER_IN_LAW = 'Father In Law',
  MOTHER_IN_LAW = 'Mother In Law',
  BROTHER = 'Brother',
  SISTER = 'Sister',
}

const relation = [
  {
    _id: 1,
    label: FAMILY_RELATION.SELF,
  },
  {
    _id: 2,
    label: FAMILY_RELATION.SPOUSE,
  },
  {
    _id: 3,
    label: FAMILY_RELATION.SON,
  },
  {
    _id: 4,
    label: FAMILY_RELATION.DAUGHTER,
  },
  {
    _id: 5,
    label: FAMILY_RELATION.MOTHER,
  },
  {
    _id: 6,
    label: FAMILY_RELATION.FATHER,
  },
  {
    _id: 7,
    label: FAMILY_RELATION.MOTHER_IN_LAW,
  },
  {
    _id: 8,
    label: FAMILY_RELATION.FATHER_IN_LAW,
  },
  {
    _id: 9,
    label: FAMILY_RELATION.BROTHER,
  },
  {
    _id: 10,
    label: FAMILY_RELATION.SISTER,
  },
]

const FamilyManageBar = ({ open, handleClose }: Props) => {
  const [entity, setEntity] = useState<FamilyField | undefined>()
  const [item, setItems] = useState(false)
  const [type, setType] = useState('')

  const { setLoading, loading } = useLoading()
  const showToast = useToast()
  const [data, setData] = useState<FamilyField[]>([])
  const [openPopup, setOpenPopup] = useState(false)
  const [id, setId] = useState('')

  const { control, setValue, setError, clearErrors, handleSubmit, reset } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      contactNo: '',
      accRelation: acDefaultValue,
      profileEmail: '',
      dob: null as Date | null,
      gender: 'male',
    },
  })

  const handleItemClick = () => {
    setType('add')
    setEntity(undefined)
    setItems((prevItems) => !prevItems)
  }

  const handleEdit = (item: any) => {
    setType('edit')
    setEntity(item)
    setItems(true)
  }

  const handleOpen = (item: string) => {
    setOpenPopup(true)
    setId(item)
  }

  const handleClosePopup = () => {
    setOpenPopup(false)
  }

  const handleDelete = async () => {
    const res = await deleteFamily(setLoading, showToast, id)
    if (res) {
      setOpenPopup(false)
      getData()
    }
  }

  const getData = async () => {
    const response = await getAllFamily(setLoading, showToast)
    if (response) {
      setData(response.Accounts)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  const onSubmitHandle: SubmitHandler<any> = async (data: FamilyField) => {
    if (type === 'add') {
      const res = await createFamily(setLoading, showToast, data)
      if (res?.status === 201) {
        setItems(false)
        getData()
      }
      setType('')
      reset()
    }
    if (type === 'edit') {
      const res = await editFamily(setLoading, showToast, data, entity?.internalId as string)
      if (res?.status === 200) {
        setItems(false)
        getData()
      }
    }
  }

  useEffect(() => {
    if (entity) {
      setValue('firstName', entity?.firstName)
      setValue('lastName', entity?.lastName)
      setValue('contactNo', entity?.contactNo)
      setValue('accRelation', {
        label: entity.accRelation,
        _id: entity.accRelation,
      })
      setValue('profileEmail', entity?.profileEmail)
      setValue('dob', entity?.dob ? new Date(entity?.dob) : null)
      setValue('gender', entity.gender)
    } else {
      reset()
    }
  }, [entity])

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
        <div>
          <div
            className={`flex justify-end items-center mb-3 sticky top-0 z-10 py-[10px] bg-lightGray-main`}
            id='header'
          >
            <Button
              variant='text'
              color='mMidBlue'
              sx={{
                color: theme.palette.mMidBlue?.main,
                minWidth: 'max-content',
                fontSize: '1rem',

                height: 20,
              }}
              onClick={handleClose}
              disableRipple
            >
              Cancel
            </Button>
          </div>
          <div className='flex flex-col gap-5 mb-3'>
            <div>
              <div className='flex justify-between items-center'>
                <h2>My Family Manage</h2>
                <Button
                  variant='text'
                  color='mMidBlue'
                  sx={{
                    color: theme.palette.mMidBlue?.main,
                    minWidth: 'max-content',
                    fontSize: '1rem',

                    height: 20,
                  }}
                  onClick={handleItemClick}
                  disableRipple
                >
                  {!item ? 'Add' : 'Cancel'}
                </Button>
              </div>
              <Divider sx={{ borderColor: theme.palette.mDarkGray?.main, borderWidth: '1.5px' }} />
              {!item && (
                <table className='flex flex-col my-2'>
                  <th className='flex justify-between w-full text-start font-light'>
                    <td className='w-1/2'>Name(Age)</td>
                    <td className='w-1/4'>Relation</td>
                    <td className='w-1/4 text-center'>Action</td>
                  </th>

                  {data?.map((x: FamilyField) => (
                    <tr
                      className='flex px-2 text-start w-full items-center hover:bg-blue-main hover:border-none rounded-md hover:text-white-main text-black-main border-[1px] border-black-main my-1'
                      key={Math.random()}
                    >
                      <td className='w-1/2'>
                        {splitDescription(x.firstName, 10)} ({x?.age})
                      </td>
                      <td className='w-1/4'>{x.accRelation}</td>
                      <td className='w-1/4 flex'>
                        <Tooltip title='Edit' arrow placement='left'>
                          <IconButton
                            onClick={() => {
                              handleEdit(x)
                            }}
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title='Delete' arrow placement='left'>
                          <IconButton
                            onClick={() => {
                              handleOpen(x?.internalId)
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </td>
                    </tr>
                  ))}
                </table>
              )}
              {item && (
                <div className='my-3'>
                  <form className='w-full' onSubmit={handleSubmit(onSubmitHandle)}>
                    <div className='flex gap-4 mb-3'>
                      <TxtInput
                        placeholder={'Enter First Name'}
                        name={'firstName'}
                        control={control}
                        handleChange={() => {}}
                        validation={{ ...txtFieldValidation(true) }}
                        label='First Name*'
                      />
                    </div>
                    <div className='flex gap-4 mb-3'>
                      <TxtInput
                        placeholder={'Enter Last Name'}
                        name={'lastName'}
                        control={control}
                        handleChange={() => {}}
                        validation={{ ...txtFieldValidation(true) }}
                        label='Last Name*'
                      />
                    </div>
                    <div className='flex gap-4 mb-3'>
                      <TxtInput
                        placeholder={'Enter ContactNo'}
                        name={'contactNo'}
                        control={control}
                        handleChange={() => {}}
                        validation={{ ...numberFieldValidation(false, 'Phone') }}
                        label='Contact No'
                      />
                    </div>
                    <div className='flex gap-4 mb-3'>
                      <SelectInput
                        options={relation as any}
                        name={'accRelation'}
                        control={control}
                        label={'Relation*'}
                        setValue={setValue}
                        setError={setError}
                        clearErrors={clearErrors}
                        validation={searchSelectValidation('Relation')}
                      />
                    </div>
                    <div className='flex gap-4 mb-3'>
                      <TxtInput
                        placeholder={'Enter Email'}
                        name={'profileEmail'}
                        control={control}
                        handleChange={() => {}}
                        validation={{ ...txtFieldValidation(false, 'Email') }}
                        label='Email'
                      />
                    </div>
                    <div className='flex gap-5 mb-3'>
                      <DateInput
                        name='dob'
                        control={control}
                        clearErrors={clearErrors}
                        handleChange={() => {}}
                        validation={{ ...dateSelectValidation('date of birth') }}
                        label={'Date of Birth*'}
                        setError={setError}
                      />
                    </div>
                    <div className='flex gap-4 mb-3'>
                      <FormLabel id='demo-row-radio-buttons-group-label'>Gender</FormLabel>
                      <Controller
                        name='gender'
                        control={control}
                        defaultValue='male'
                        render={({ field }) => (
                          <RadioGroup
                            {...field}
                            row
                            aria-labelledby='demo-row-radio-buttons-group-label'
                          >
                            <FormControlLabel value='female' control={<Radio />} label='Female' />
                            <FormControlLabel value='male' control={<Radio />} label='Male' />
                            <FormControlLabel value='other' control={<Radio />} label='Other' />
                          </RadioGroup>
                        )}
                      />
                    </div>
                    <div className='flex justify-end py-3 w-full gap-5'>
                      <Button
                        variant='contained'
                        color='mPink'
                        sx={{
                          minWidth: '150px',
                        }}
                        type='submit'
                      >
                        Submit
                      </Button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
        <CustomDialog
          action={{ component: null, isAction: false }}
          handleClose={handleClosePopup}
          open={openPopup}
          header={{
            component: (
              <DialogTitle
                sx={{
                  padding: '16px 24px 14px 24px',
                }}
              >
                <div className='flex justify-end items-baseline -mt-2 -mr-4'>
                  <button onClick={handleClosePopup}>
                    <CloseIcon />
                  </button>
                </div>
              </DialogTitle>
            ),
            isHeader: true,
          }}
          align={ALIGN_DIALOG.MID_RIGHT}
          maxWidth='sm'
        >
          <div className=' flex flex-col gap-4 items-center'>
            <p className='p-2 rounded-md  '>Are you sure you want to delete?</p>
            <div className='flex justify-between gap-3 '>
              <Button color='mPink' sx={{ minWidth: '140px' }} onClick={handleClosePopup}>
                No
              </Button>
              <Button color='mPink' sx={{ minWidth: '140px' }} onClick={handleDelete}>
                Yes
              </Button>
            </div>
          </div>
        </CustomDialog>
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

export default FamilyManageBar
