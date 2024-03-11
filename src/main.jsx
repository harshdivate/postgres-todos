import React, { StrictMode } from 'react'
import './index.css'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter as Router , Routes , Route  } from 'react-router-dom'
import Home from './Home.jsx'
import { Provider } from 'react-redux'
import { store } from './Store/Store.js'
import LoginSuccess from './LoginSuccess/LoginSuccess.jsx'
import LoginForm from './LoginForm/LoginForm.jsx'
import { CookiesProvider } from 'react-cookie'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import persistReducer from 'redux-persist/es/persistReducer'

const persistor = persistStore(store);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    {/* <CookiesProvider defaultSetOptions={{ path: '/' }}> */}
      <PersistGate  loading={null} persistor={persistor}>
   <Router>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/home" element={<LoginSuccess/>}/>
      <Route path='/login' element={<LoginForm/>}/>
    </Routes>
   </Router>
   </PersistGate>
   {/* </CookiesProvider> */}
  </Provider>
  
)
