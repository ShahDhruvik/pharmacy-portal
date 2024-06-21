/* eslint-disable no-extra-semi */
import { Box, Button, Card, CardActions, CardMedia, Divider, Grid, Typography } from '@mui/material'
import { File } from 'buffer'
import { useRef, useState } from 'react'
import {
  Control,
  Controller,
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormTrigger,
  UseFormWatch,
} from 'react-hook-form'

type Props = {
  setValue: UseFormSetValue<any>
  watch: UseFormWatch<any>
  errors: FieldErrors<any>
  register: UseFormRegister<any>
  trigger: UseFormTrigger<any>
  control: Control<any>
  readOnly: boolean
}

const ImageForm = ({ setValue, watch, errors, register, trigger, control, readOnly }: Props) => {
  const [currentFileName, setCurrentFileName] = useState('')
  const fileInputRef = useRef(null)
  //handleFile change
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files && e.target.files[0]
    if (selectedFile) {
      const url = URL.createObjectURL(selectedFile)
      const img = new Image()
      const objectUrl = URL.createObjectURL(selectedFile)
      img.onload = function () {
        if (currentFileName?.includes('logo')) {
          setValue(currentFileName, { document: selectedFile, url: url })
          setCurrentFileName('')
          if ((fileInputRef?.current as any)?.value) {
            ;(fileInputRef.current as any).value = ''
          }
          return
        }
        if (!((this as any).width > 720 && (this as any).height > 540)) {
          alert('Minimum image size required: 720 px width by 540 px height')
        } else {
          setValue(currentFileName, { document: selectedFile, url: url })
          setCurrentFileName('')
          if ((fileInputRef?.current as any)?.value) {
            ;(fileInputRef.current as any).value = ''
          }
        }
        URL.revokeObjectURL(objectUrl)
      }
      img.src = objectUrl
    }
  }

  const handleFileButtonClick = (fileName: string) => {
    if (fileInputRef.current) {
      ;(fileInputRef.current as any).click()
      setCurrentFileName(fileName)
    }
  }
  const handleFileRemove = (fileName: string) => {
    setValue(fileName, { document: null, url: '' })
    trigger(fileName)
  }
  return (
    <Box className='mt-12'>
      <label htmlFor='fileInput' style={{ display: 'none' }}>
        <input
          id='fileInput'
          type='file'
          onChange={handleFileChange}
          style={{ display: 'none' }}
          ref={fileInputRef}
        />
      </label>
      <Box>
        <>
          <Typography>Logos</Typography>
          <Divider />
          <Grid container spacing={2} className='pt-2 mb-4'>
            <Grid item xs={3}>
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  component='img'
                  sx={{
                    width: '290px',
                    height: '160px',
                    objectFit: 'contain',
                  }}
                  image={watch('sqLogo')?.url ?? '/default-image.png'}
                  onClick={() => {
                    !readOnly && handleFileButtonClick('sqLogo')
                  }}
                />

                {!readOnly && (
                  <CardActions className='d-flex flex-col justify-center'>
                    <div className='flex justify-center'>
                      <Button
                        size='small'
                        onClick={(e) => {
                          handleFileButtonClick('sqLogo')
                        }}
                      >
                        Upload Sqaure Logo
                      </Button>
                      <Button
                        size='small'
                        onClick={(e) => {
                          handleFileRemove('sqLogo')
                        }}
                      >
                        Remove
                      </Button>
                    </div>
                    {(errors as any)?.sqLogo && (
                      <p className='font-medium text-mRed-main text-xs'>
                        {(errors as any)?.sqLogo?.message as string}
                      </p>
                    )}
                    {/* <Button size="small">Take Picture</Button> */}
                  </CardActions>
                )}
              </Card>
            </Grid>
            <Grid item>
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  component='img'
                  sx={{
                    width: '290px',
                    height: '160px',
                    objectFit: 'contain',
                  }}
                  image={watch('rectLogo')?.url ?? '/default-image.png'}
                  onClick={() => {
                    !readOnly && handleFileButtonClick('rectLogo')
                  }}
                />
                {!readOnly && (
                  <CardActions className='d-flex justify-center'>
                    <Button
                      size='small'
                      onClick={(e) => {
                        handleFileButtonClick('rectLogo')
                      }}
                    >
                      Upload Rectangle Logo
                    </Button>
                    <Button
                      size='small'
                      onClick={(e) => {
                        handleFileRemove('rectLogo')
                      }}
                    >
                      Remove
                    </Button>
                    {/* <Button size="small">Take Picture</Button> */}
                  </CardActions>
                )}
              </Card>
            </Grid>
          </Grid>
        </>
        <>
          <Typography className='pt-4'>Practice Photos</Typography>
          <Divider />
        </>
        <Grid container spacing={4} className='pt-2'>
          {[0, 1, 2, 3, 4, 5, 6, 7].map((imageIndex) => {
            return (
              <Grid item xs={3} key={imageIndex}>
                <Card sx={{ maxWidth: 345 }}>
                  <CardMedia
                    component='img'
                    sx={{
                      width: '290px',
                      height: '160px',
                    }}
                    image={watch(`images.${imageIndex}`)?.url ?? '/default-image.png'}
                    onClick={() => {
                      !readOnly && handleFileButtonClick(`images.${imageIndex}`)
                    }}
                  />
                  {!readOnly && (
                    <CardActions className='d-flex justify-center'>
                      <Button
                        size='small'
                        onClick={(e) => {
                          handleFileButtonClick(`images.${imageIndex}`)
                        }}
                      >
                        Upload
                      </Button>
                      <Button
                        size='small'
                        onClick={(e) => {
                          handleFileRemove(`images.${imageIndex}`)
                        }}
                      >
                        Remove
                      </Button>
                      {/* <Button size="small">Take Picture</Button> */}
                    </CardActions>
                  )}
                </Card>
              </Grid>
            )
          })}
        </Grid>
      </Box>
    </Box>
  )
}

export default ImageForm
