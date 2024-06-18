import FormBottomBar from '@/components/common-components/FormBottomBar'
import FormDrawer from '@/components/common-components/FormDrawer'
import FormTopBar from '@/components/common-components/FormTopBar'
import React, { Dispatch, SetStateAction, useState } from 'react'

type Props = {
  openFormDrawer: boolean
  setOpenFormDrawer: Dispatch<SetStateAction<boolean>>
}

const UserForm = ({ openFormDrawer, setOpenFormDrawer }: Props) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [notFound, setNotFound] = useState<boolean>(false)
  return (
    <FormDrawer openFormDrawer={openFormDrawer} setOpenFormDrawer={setOpenFormDrawer} width='50%'>
      <form className='flex flex-col flex-1'>
        <FormTopBar entityName='User' setOpenFormDrawer={setOpenFormDrawer} />
        {loading ? (
          <div>Loading</div>
        ) : notFound ? (
          <div>Not Found</div>
        ) : (
          <div className='p-container flex-1'>hello</div>
        )}
        <FormBottomBar />
      </form>
    </FormDrawer>
  )
}

export default UserForm
