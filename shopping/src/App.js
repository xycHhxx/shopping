import IndexRouter from './router/IndexRouter'

//导入store
import { store, persistor } from './redux/store'
import { PersistGate } from 'redux-persist/lib/integration/react'
import { Provider } from 'react-redux'

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <IndexRouter></IndexRouter>
      </PersistGate>
    </Provider>
  )
}

export default App
