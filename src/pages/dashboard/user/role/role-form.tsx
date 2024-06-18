import FormBottomBar from '@/components/common-components/FormBottomBar'
import FormDrawer from '@/components/common-components/FormDrawer'
import FormTopBar from '@/components/common-components/FormTopBar'
import AvatarInput from '@/components/form-inputs/AvatarInput'
import CheckBoxInput from '@/components/form-inputs/CheckBoxInput'
import TxtInput from '@/components/form-inputs/TxtInput'
import { Role, RoleFormFields } from '@/types/role.types'
import { txtFieldValidation } from '@/utils/form.validation'
import {
  Alert,
  Avatar,
  Button,
  FormLabel,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import DeleteIcon from '@mui/icons-material/Delete'
import theme from '@/theme/defaultTheme'
import { useLoading } from '@/context/LoadingContext'
import { COMMON_MESSAGE } from '@/utils/commonMessages'
import { createRole, editRole } from '@/lib/role'
import { VITE_APP_IMAGE_URL } from '@/utils/envVariables'
import { CONST_APP_IMAGE_URL } from '@/utils/constants'

type Props = {
  openFormDrawer: boolean
  setOpenFormDrawer: Dispatch<SetStateAction<boolean>>
  entity: Role | undefined
}

const UserForm = ({ openFormDrawer, setOpenFormDrawer, entity }: Props) => {
  const { loading, setLoading } = useLoading()
  const {
    control,
    setValue,
    trigger,
    watch,
    reset,
    register,
    formState: { errors },
  } = useForm<RoleFormFields>({
    defaultValues: {
      name: '',
      color: '#ff0000',
      data: [],
      description: '',
      displayName: '',
      icon: { file: null, url: '' },
      active: true,
    },
  })
  const fieldW = watch()
  const { append, remove, fields } = useFieldArray({
    control,
    name: 'data',
    rules: { validate: (val) => val?.length !== 0 || COMMON_MESSAGE.DataArrayValidation },
  })

  const onSubmitHandle = async () => {
    setLoading({ isLoading: true, loadingProps: { btnLoading: true } })
    if (!entity) {
      const tigCreate = await trigger('data')
      if (tigCreate) {
        const res = await createRole(fieldW)
        if (res) {
          setOpenFormDrawer(false)
        }
      }
    } else {
      console.log('object')
      const tigEdit = await trigger(['name', 'displayName'])
      console.log(tigEdit)
      if (tigEdit) {
        const res = await editRole(entity?.internalId, entity?.icon as string, fieldW)
        if (res) {
          setOpenFormDrawer(false)
        }
      }
    }
    setLoading({ isLoading: false })
  }
  useEffect(() => {
    if (openFormDrawer) {
      if (entity) {
        const emptyFile = new File([], 'emptyFile.txt', { type: 'text/plain' })
        reset({
          name: entity?.name,
          displayName: entity?.displayName,
          description: entity?.description,
          icon: {
            file: emptyFile,
            url: (VITE_APP_IMAGE_URL || CONST_APP_IMAGE_URL) + entity?.icon ?? '',
          },
          color: entity?.color,
        })
      }
      console.log('set Edit Fields')
    } else {
      reset()
    }
  }, [openFormDrawer, entity])
  return (
    <FormDrawer openFormDrawer={openFormDrawer} setOpenFormDrawer={setOpenFormDrawer} width='50%'>
      <FormTopBar entityName='User' setOpenFormDrawer={setOpenFormDrawer} />
      <div className='flex-1 p-container'>
        <div className='bg-mLightWhite-main p-container shadow-cardShadow flex flex-col gap-3'>
          <div className='flex gap-3'>
            <TxtInput
              control={control}
              handleChange={() => {
                trigger('name')
              }}
              label='Name*'
              name='name'
              placeholder=''
              validation={txtFieldValidation(true)}
              size='small'
            />
            <TxtInput
              control={control}
              label='Display Name*'
              name='displayName'
              placeholder=''
              validation={txtFieldValidation(true)}
              size='small'
              handleChange={() => {
                trigger('displayName')
              }}
            />
          </div>
          <div>
            <TxtInput
              control={control}
              label='Description'
              name='description'
              placeholder=''
              validation={{}}
              size='small'
              multiline={2}
              handleChange={() => {}}
            />
          </div>
          <div className='flex gap-3'>
            <div className='flex gap-5 items-center flex-1'>
              {!entity && (
                <div>
                  <CheckBoxInput
                    control={control}
                    name='active'
                    setValue={setValue}
                    trigger={trigger}
                    handleToggle={() => {}}
                    notRequired={true}
                  />
                  <FormLabel>Active</FormLabel>
                </div>
              )}
              <AvatarInput control={control} name='icon' setValue={setValue} />
              <input type='color' {...register('color')} />
            </div>
            {!entity && (
              <Button
                variant='text'
                color='mPink'
                onClick={async () => {
                  const tig = await trigger(['name', 'displayName'])
                  if (tig) {
                    const { data, ...rest } = fieldW
                    append(rest)
                    reset((frm) => {
                      return {
                        ...frm,
                        name: '',
                        displayName: '',
                        description: '',
                        active: true,
                        color: '',
                        icon: { file: null, url: '' },
                      }
                    })
                    trigger('data')
                  }
                }}
              >
                Add+
              </Button>
            )}
          </div>
        </div>
        {!entity && (
          <TableContainer component={Paper} sx={{ marginTop: '20px' }}>
            <Table sx={{ minWidth: '100%' }} aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell>Icon</TableCell>
                  <TableCell align='right'>Name</TableCell>
                  <TableCell align='right'>Display Name</TableCell>
                  <TableCell align='right'>Description</TableCell>
                  <TableCell align='right'>Color</TableCell>
                  <TableCell align='right'>Active</TableCell>
                  <TableCell align='right'>Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {fields.map((row, index) => (
                  <TableRow
                    key={row.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component='th' scope='row' sx={{ p: 0, px: 1 }}>
                      <Avatar src={row?.icon?.url ?? ''} />
                    </TableCell>
                    <TableCell align='right'>{row?.name ?? ''}</TableCell>
                    <TableCell align='right'>{row?.displayName ?? ''}</TableCell>
                    <TableCell align='right'>{row?.description ?? ''}</TableCell>
                    <TableCell align='right'>
                      {' '}
                      <input type='color' value={row?.color as string} onChange={() => {}} />
                    </TableCell>
                    <TableCell align='right'>{row?.active ? 'Yes' : 'No'}</TableCell>
                    <TableCell align='right'>
                      <IconButton
                        onClick={() => {
                          remove(index)
                        }}
                      >
                        <DeleteIcon sx={{ color: theme?.palette?.mPink?.main }} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
        {errors?.data && (
          <Alert severity='info' sx={{ marginTop: '20px' }}>
            {errors?.data?.root?.message ?? ''}
          </Alert>
        )}
      </div>
      <FormBottomBar handleClick={onSubmitHandle} loading={loading} />
    </FormDrawer>
  )
}

export default UserForm
