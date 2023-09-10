// This is wrapped around to limit the usage of data stored in the redux store
import store from './store'
import { Provider } from 'react-redux'

export default function ReduxProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>
}
