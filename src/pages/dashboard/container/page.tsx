import Card from '../../../components/Card'
import { VITE_APP_TITLE } from '../../../utils/envVariables'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { fetchTodos } from '../../../store/slices/User/todo.fetch'
type Props = {}
const Dashboard = ({}: Props) => {
  const { todos } = useAppSelector((state) => state.todos)
  const dispatch = useAppDispatch()
  const storeRolesGroups = async () => await dispatch(fetchTodos())
  useEffect(() => {
    storeRolesGroups()
  }, [])
  console.log(VITE_APP_TITLE)
  return (
    <>
      <section>
        <div className='min-h-screen bg-red-400  '>
          {todos.records.map((x) => {
            return (
              <h4 className='' key={x.id}>
                {`${x.id}) ${x.title}`}
              </h4>
            )
          })}
          <Card />
        </div>
      </section>
    </>
  )
}

export default Dashboard
