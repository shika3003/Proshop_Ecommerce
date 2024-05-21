import React from 'react'
import ReactDOM from 'react-dom/client'
// import HomeScreen from './Screens/HomeScreen'
// import 'bootstrap/dist/css/bootstrap.min.css'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'

import { Provider } from 'react-redux'
import store from './store.js'
import './assets/styles/index.css'
import './assets/styles/bootstrap.custom.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import ProductScreen from './Screens/ProductScreen'
import HomeScreen from './Screens/HomeScreen'
import CartScreen from './Screens/CartScreen.jsx'
import LoginScreen from './Screens/LoginScreen.jsx'
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<HomeScreen />}></Route>
      <Route path='/product/:id' element={<ProductScreen />}></Route>
      <Route path='/cart' element={<CartScreen />}></Route>
      <Route path='/login' element={<LoginScreen />}></Route>
    </Route>
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
)

reportWebVitals()
