import { theme } from '@/context/ThemeProvider'
import { Drawer, Button, Tabs, Tab, Badge, Divider, Checkbox, Avatar } from '@mui/material'
import { useEffect, useState } from 'react'
import { DrawerState, FieldProfState, HeadProfState, SelectDDL } from '@/types/common'
import { SubmitHandler, useForm } from 'react-hook-form'
import {
  acDefaultValue,
  dateSelectValidation,
  searchSelectValidation,
  txtFieldValidation,
} from '@/utils/form.validation'
import TxtInput from '@/components/TxtInput'
import SelectInput from '@/components/SelectInput'
import EditIcon from '@mui/icons-material/Edit'
import { DateInput } from '@/components/DateInput'
import { dropdownAssignedTo, dropdownOrg } from '@/lib/DropDownApis'
import { useLoading } from '@/context/LoadingContext'
import { useToast } from '@/hooks/useToast'
import { createTask, getAllTaskDetails } from '@/lib/Task'
import { CONST_APP_IMAGE_URL, formatDate } from '@/utils/constants'
import { useDrawerWidth } from '@/components/DrawerWidth'

type Props = {
  handleClose: () => void
  open: boolean
}

const TaskBar = ({ open, handleClose }: Props) => {
  //Tab
  const [tabIndex, setTabIndex] = useState(0)
  const [show, setShow] = useState(false)
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue)
  }
  const { setLoading, loading } = useLoading()
  const showToast = useToast()

  const [org, setOrg] = useState<SelectDDL[]>([])
  const [assignedTo, setAssignedTo] = useState<SelectDDL[]>([])
  const [data, setData] = useState<any[]>([])

  const { control, setError, setValue, clearErrors, getValues, reset, handleSubmit, watch } =
    useForm({
      defaultValues: {
        title: '',
        description: '',
        assignedTo: acDefaultValue,
        targetedDate: null as Date | null,
        orgId: acDefaultValue,
      },
    })
  const orgWatch = watch('orgId') as any

  const getData = async (type: number, orgId: any) => {
    const response = await getAllTaskDetails(setLoading, showToast, { type: type, orgId: orgId })
    if (response) {
      setData(response)
    }
  }

  useEffect(() => {
    setShow(false)
    reset()
    setData([])
    if (tabIndex === 0 && orgWatch._id !== '00') {
      getData(0, orgWatch?._id)
    }
    if (tabIndex === 1 && orgWatch._id !== '00') {
      getData(1, orgWatch?._id)
    }
  }, [open, tabIndex])

  const drpOrg = async () => {
    const res = await dropdownOrg(setLoading, showToast)
    if (res) {
      setOrg(res)
    }
  }
  useEffect(() => {
    drpOrg()
  }, [open])

  const drpAssignedTo = async () => {
    const res = await dropdownAssignedTo(setLoading, showToast)
    if (res) {
      setAssignedTo(res)
    }
  }
  useEffect(() => {
    if (show) {
      drpAssignedTo()
    }
  }, [show])

  const onSubmitHandle: SubmitHandler<any> = async (data) => {
    if (show) {
      const res = await createTask(setLoading, showToast, data)
      if (res?.status === 201) {
        setShow(false)
        // getData()
      }
      reset()
    }
  }
  const drawerWidth = useDrawerWidth()
  return (
    <Drawer
      anchor='right'
      open={open}
      onClose={handleClose}
      sx={{
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          px: '20px',
          backgroundColor: theme.palette.mLightGray?.main,
        },
      }}
    >
      <div
        className={`flex ${
          !show ? 'justify-between' : 'justify-end'
        } items-center mb-2 sticky top-0 z-10 py-[10px] bg-lightGray-main`}
        id='header'
      >
        {!show && (
          <Button
            variant='text'
            color='mMidBlue'
            sx={{
              color: theme.palette.mMidBlue?.main,
              minWidth: 'max-content',
              height: 20,
            }}
            onClick={() => {
              setShow(true)
            }}
            disableRipple
          >
            Add task
          </Button>
        )}
        <Button
          variant='text'
          color='mMidBlue'
          sx={{
            color: theme.palette.mMidBlue?.main,
            minWidth: 'max-content',
            height: 20,
          }}
          onClick={() => {
            if (show) {
              setShow(false)
            }
            handleClose()
          }}
          disableRipple
        >
          Done
        </Button>
      </div>
      <div>
        <SelectInput
          options={org as any}
          name={'orgId'}
          control={control}
          label={'Organization*'}
          setValue={setValue}
          setError={setError}
          clearErrors={clearErrors}
          validation={searchSelectValidation('Organization')}
          selectDefault={true}
        />
      </div>
      {!show && (
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
          <Tab label={<p className='capitalize'>Assigned</p>} value={0} />
          <Tab
            label={
              <Badge>
                <p className='capitalize'>Created</p>
              </Badge>
            }
            value={1}
          />
        </Tabs>
      )}
      {tabIndex === 0 && !show && (
        <div>
          {data?.length > 0 ? (
            data?.map((x) => (
              <div className='bg-white-main shadow-md border-[1px] border-black-main rounded-md py-2 my-3'>
                <span className='px-3'>{x?.taskTitle}</span>
                <Divider
                  sx={{
                    marginTop: '7px',
                  }}
                />
                <div className='px-3 py-2 h-24 min-h-24 flex flex-col justify-between'>
                  <div>{x?.description}</div>
                  <div className='flex justify-between items-center'>
                    <div className='bg-darkGray-main rounded-full h-10 w-10 flex items-center justify-center text-white-main'>
                      {x?.assignToName?.charAt(0).toUpperCase()}
                    </div>
                    <span>{formatDate(x?.createdAt)}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className='h-40 flex items-center justify-center'>
              There is nothing to show here!
            </div>
          )}
        </div>
      )}
      {tabIndex === 1 && !show && (
        <div>
          {data?.length > 0 ? (
            data?.map((x) => (
              <div
                className='bg-white-main shadow-md border-[1px] border-black-main rounded-md py-2 my-3'
                key={Math.random()}
              >
                <span className='px-3'>{x?.taskTitle}</span>
                <Divider
                  sx={{
                    marginTop: '7px',
                  }}
                />
                <div className='px-3 py-2 h-24 min-h-24 flex flex-col justify-between'>
                  <div>{x?.description}</div>
                  <div className='flex justify-between items-center'>
                    <div className='bg-darkGray-main rounded-full h-10 w-10 flex items-center justify-center text-white-main'>
                      {x?.assignToName?.charAt(0).toUpperCase()}
                    </div>
                    <span>{formatDate(x?.createdAt)}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className='h-40 flex items-center justify-center'>
              There is nothing to show here!
            </div>
          )}
        </div>
      )}
      {show && (
        <form onSubmit={handleSubmit(onSubmitHandle)}>
          <div className='pt-5 flex flex-col gap-5 min-h-screen'>
            <div>
              <p className='font-semibold text-xl ml-[6px] '>Add Task</p>
              <Divider
                sx={{ borderColor: theme.palette.mMediumGray?.main, borderWidth: '1/2px' }}
              />
            </div>
            <div className='flex flex-col flex-1 gap-5'>
              <TxtInput
                control={control}
                name='title'
                handleChange={() => {}}
                placeholder='Enter Title'
                validation={txtFieldValidation(true)}
                label='Title'
              />
              <TxtInput
                control={control}
                name='description'
                handleChange={() => {}}
                placeholder='Enter Description'
                validation={txtFieldValidation(false)}
                label='Description'
                multiline={4}
              />
              <SelectInput
                options={assignedTo as any}
                name={'assignedTo'}
                control={control}
                label={'Assign To*'}
                setValue={setValue}
                setError={setError}
                clearErrors={clearErrors}
                validation={searchSelectValidation('Assigned To')}
              />
              <DateInput
                name='targetedDate'
                control={control}
                clearErrors={clearErrors}
                handleChange={() => {}}
                validation={dateSelectValidation('Targeted Date')}
                label={'Target Date*'}
                setError={setError}
              />
            </div>
            <div className='sticky bottom-0 flex items-end justify-end bg-lightGray-main py-5 w-full gap-2'>
              <Button
                color='mPink'
                type='submit'
                sx={{ minWidth: '100px' }}
                onClick={() => {
                  setShow(false)
                }}
              >
                Cancel
              </Button>
              <Button color='mPink' type='submit' sx={{ minWidth: '100px' }}>
                Add Task
              </Button>
            </div>
          </div>
        </form>
      )}
    </Drawer>
  )
}

export default TaskBar
