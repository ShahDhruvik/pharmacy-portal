import { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'

const auth = () => {
  return localStorage.getItem('token') !== null
}
const withAuthen = (Component: any) => {
  const isAuth = auth()
  return (props: any) => {
    if (isAuth) {
      return (<Component {...props} />) as ReactNode
    } else {
      return <Navigate to='/auth/log-in' />
    }
  }
}
const withAutho = (Component: any, allowedRoles: String[]) => {
  const isAuth = auth()
  const isRoleValid = allowedRoles.includes(localStorage.getItem('role') as string)
  return (props: any) => {
    if (isAuth && isRoleValid) {
      return (<Component {...props} />) as ReactNode
    } else {
      if (!isAuth) {
        return <Navigate to='/auth/log-in' />
      } else {
        return <Navigate to='/unauthorized' />
      }
    }
  }
}

export { withAuthen, withAutho }
