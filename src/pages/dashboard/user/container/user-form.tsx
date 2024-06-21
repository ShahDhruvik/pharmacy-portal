import FormBottomBar from '@/components/common-components/FormBottomBar'
import FormDrawer from '@/components/common-components/FormDrawer'
import FormTopBar from '@/components/common-components/FormTopBar'
import AvatarInput from '@/components/form-inputs/AvatarInput'
import CheckBoxInput from '@/components/form-inputs/CheckBoxInput'
import TxtInput from '@/components/form-inputs/TxtInput'
import { User, UserFormFields } from '@/types/user.types'
import {
  acDefaultValue,
  numberFieldValidation,
  searchSelectValidation,
  txtFieldValidation,
} from '@/utils/form.validation'
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
// import { createUser, editUser } from '@/lib/user'
import { VITE_APP_IMAGE_URL } from '@/utils/envVariables'
import { CONST_APP_IMAGE_URL, Dropdowns } from '@/utils/constants'
import { HandleControls, SelectDDL } from '@/types/common'
import { createUser, editUser } from '@/lib/user'
import SelectInput from '@/components/form-inputs/SelectInput'
import { dropdownRoles } from '@/lib/role'
import { Role } from '@/types/role.types'
import MultiSelectInput from '@/components/form-inputs/MultiSelectInput'
import { dropdownPharmacys } from '@/lib/pharmacy'

type Props = {
  openFormDrawer: boolean
  setOpenFormDrawer: Dispatch<SetStateAction<boolean>>
  entity: User | undefined
  handleReFetch: () => void
}

const UserForm = ({ openFormDrawer, setOpenFormDrawer, entity, handleReFetch }: Props) => {
  const { loading, setLoading } = useLoading()
  const [roles, setRoles] = useState<SelectDDL[]>([])
  const [pharmacy, setPharmacy] = useState<SelectDDL[]>([])
  const defaultValues = {
    email: '',
    name: '',
    lastName: '',
    pharmacyIds: [],
    phone: '',
    mobile: '',
    roleId: acDefaultValue,
    data: [],
    icon: { file: null, url: '' },
    active: true,
  }
  const {
    control,
    setValue,
    trigger,
    watch,
    reset,
    register,
    clearErrors,
    setError,
    formState: { errors },
  } = useForm<UserFormFields>({
    defaultValues: defaultValues,
  })
  const fieldW = watch()
  const { append, remove, fields } = useFieldArray({
    control,
    name: 'data',
    rules: { validate: (val) => val?.length !== 0 || COMMON_MESSAGE.DataArrayValidation },
  })
  const pharmacyArray = useFieldArray({
    control,
    name: 'pharmacyIds',
    // rules: {
    //   validate: (val) => val.length !== 0 || 'Select Pharmacy',
    // },
  })
  const onSubmitHandle = async () => {
    setLoading({ isLoading: true, loadingProps: { btnLoading: true } })
    if (!entity) {
      const tigCreate = await trigger(['data'])
      if (tigCreate) {
        const res = await createUser(fieldW)
        if (res) {
          setOpenFormDrawer(false)
          handleReFetch()
        }
      }
    } else {
      const tigEdit = await trigger(['roleId', 'pharmacyIds', 'name', 'phone', 'mobile', 'email'])
      if (tigEdit) {
        const res = await editUser(entity?.internalId, (entity?.profilePic as string) ?? '', fieldW)
        if (res) {
          setOpenFormDrawer(false)
          handleReFetch()
        }
      }
    }
    setLoading({ isLoading: false })
  }
  const getRolesDrp = async () => {
    const drpValues: SelectDDL[] = [acDefaultValue]
    const res = await dropdownRoles()
    if (res?.length > 0) {
      res?.map((rol: Role) => {
        drpValues.push({ _id: String(rol?.id), label: rol?.name, data: rol })
      })
    }
    setRoles(drpValues)
  }
  const getPharmacyDrp = async () => {
    const drpValues: SelectDDL[] = []
    const res = await dropdownPharmacys()
    if (res?.length > 0) {
      res?.map((phr: Role) => {
        drpValues.push({ _id: String(phr?.id), label: phr?.name, data: phr })
      })
    }
    setPharmacy(drpValues)
  }
  useEffect(() => {
    if (openFormDrawer) {
      getRolesDrp()
      getPharmacyDrp()
      if (entity) {
        const emptyFile = new File([], 'emptyFile.txt', { type: 'text/plain' })
        reset({
          name: entity?.name,
          phone: entity?.phone,
          mobile: entity?.mobile,
          email: entity?.email,
          roleId: entity?.PharmaOrgRole
            ? {
                _id: String(entity?.PharmaOrgRole?.id),
                label: entity?.PharmaOrgRole?.displayName,
                data: entity?.PharmaOrgRole,
              }
            : acDefaultValue,
          pharmacyIds:
            entity?.pharmacyData.length > 0
              ? (entity?.pharmacyData?.map((x) => {
                  return { _id: x?.id, label: x?.name }
                }) as unknown as SelectDDL[])
              : [],
          icon: {
            file: emptyFile,
            url: (VITE_APP_IMAGE_URL || CONST_APP_IMAGE_URL) + entity?.profilePic ?? '',
          },
        })
      }
      console.log('set Edit Fields')
    } else {
      reset(defaultValues)
    }
  }, [openFormDrawer, entity])
  return (
    <FormDrawer openFormDrawer={openFormDrawer} setOpenFormDrawer={setOpenFormDrawer} width='60%'>
      <FormTopBar
        entityName='User'
        setOpenFormDrawer={setOpenFormDrawer}
        handleReFetch={handleReFetch}
      />
      <div className='flex-1 p-container'>
        <div className='flex gap-5 items-center'>
          <div className='flex-1'>
            <SelectInput
              clearErrors={clearErrors}
              control={control}
              drpName={Dropdowns.Role}
              label='Role*'
              loading={loading}
              name='roleId'
              options={roles}
              setError={setError}
              setValue={setValue}
              validation={searchSelectValidation('Role')}
              size='small'
            />
          </div>
          <div className='flex-1'>
            <MultiSelectInput
              fields={pharmacyArray.fields}
              label='Pharmacy*'
              name='pharmacyIds'
              options={pharmacy}
              replace={pharmacyArray.replace}
              trigger={trigger}
              errors={errors.pharmacyIds?.root}
              loading={loading}
              dropdownName={Dropdowns.Pharmacy}
              sx={{
                flexGrow: 1,
              }}
              size='small'
              customPlaceHolder='Select'
            />
          </div>
        </div>
        <div className='bg-mLightWhite-main p-container shadow-cardShadow flex flex-col gap-3 mt-5'>
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
              handleChange={() => {
                trigger('mobile')
              }}
              label='Mobile*'
              name='mobile'
              placeholder=''
              validation={numberFieldValidation(true, 'Phone')}
              size='small'
              type='number'
            />
          </div>
          <div className='flex gap-3'>
            <TxtInput
              control={control}
              handleChange={() => {
                trigger('phone')
              }}
              label='Phone*'
              name='phone'
              placeholder=''
              validation={numberFieldValidation(true, 'Phone')}
              size='small'
              type='number'
            />
            <TxtInput
              control={control}
              label='Email*'
              name='email'
              placeholder=''
              validation={txtFieldValidation(true, 'Email')}
              size='small'
              handleChange={() => {
                trigger('email')
              }}
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
            </div>
            {!entity && (
              <Button
                variant='text'
                color='mPink'
                onClick={async () => {
                  const tig = await trigger([
                    'name',
                    'roleId',
                    'pharmacyIds',
                    'email',
                    'phone',
                    'mobile',
                  ])
                  if (tig) {
                    const { data, ...rest } = fieldW
                    append(rest)
                    reset((frm) => {
                      return {
                        ...frm,
                        name: '',
                        phone: '',
                        mobile: '',
                        email: '',
                        roleId: acDefaultValue,
                        pharmacyIds: [],
                        active: true,
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
                  <TableCell align='left'>Name</TableCell>
                  <TableCell align='left'>Phone</TableCell>
                  <TableCell align='left'>Mobile</TableCell>
                  <TableCell align='left'>Email</TableCell>
                  <TableCell align='left'>Role</TableCell>
                  <TableCell align='left'>Pharmacy</TableCell>
                  <TableCell align='left'>Active</TableCell>
                  <TableCell align='left'>Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {fields.map((row, index) => {
                  const pharmacyNames = row?.pharmacyIds
                    .map((x) => {
                      return x?.label
                    })
                    .join(' , ')
                  return (
                    <TableRow
                      key={row.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component='th' scope='row' sx={{ p: 0, px: 1 }}>
                        <Avatar src={row?.icon?.url ?? ''} />
                      </TableCell>
                      <TableCell align='right'>{row?.name ?? ''}</TableCell>
                      <TableCell align='right'>{row?.phone ?? ''}</TableCell>
                      <TableCell align='right'>{row?.mobile ?? ''}</TableCell>
                      <TableCell align='right'>{row?.email ?? ''}</TableCell>
                      <TableCell align='right'>{row?.roleId?.label ?? ''}</TableCell>
                      <TableCell align='right'>{pharmacyNames ?? ''}</TableCell>
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
                  )
                })}
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
