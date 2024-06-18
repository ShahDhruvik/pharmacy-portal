import { Avatar, Button } from '@mui/material'
import { ChangeEvent, useRef } from 'react'
import { Control, Controller, UseFormSetValue } from 'react-hook-form'
import AddLocationIcon from '@mui/icons-material/AddLocation'

type Props = {
  name: string
  control: Control<any>
  setValue: UseFormSetValue<any>
}

const AvatarInput = ({ name, control, setValue }: Props) => {
  const fileInputRef = useRef<any>(null)
  const handleFileButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }
  const handleSelectFile = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files && e.target.files[0]
    if (selectedFile) {
      const url = URL.createObjectURL(selectedFile)
      setValue(name, { file: selectedFile, url: url })
    }
  }
  const handleClearFile = () => {
    fileInputRef.current.value = null
    setValue(name, { file: null, url: '' })
  }
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        return (
          <div className='flex items-center gap-5'>
            <Avatar src={field?.value?.url} />
            <Button
              variant='text'
              color='mPink'
              startIcon={<AddLocationIcon />}
              onClick={handleFileButtonClick}
            >
              <label htmlFor='fileInput' style={{ display: 'none' }}>
                <input
                  id='fileInput'
                  type='file'
                  onChange={handleSelectFile}
                  style={{ display: 'none' }}
                  ref={fileInputRef}
                />
              </label>
              Select Icon Select Icon
            </Button>
            <Button
              variant='text'
              color='mPink'
              onClick={handleClearFile}
              disabled={field?.value?.file === null}
            >
              Clear Icon
            </Button>
          </div>
        )
      }}
    />
  )
}

export default AvatarInput
