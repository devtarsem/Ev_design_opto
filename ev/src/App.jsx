
import './App.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Home from './components/home'
import Design from './components/evDesign'
import Compute from './components/compute'

const router = createBrowserRouter([
  {
    path : '/',
    element : <Home/>,
    
  }
  ,
  {
    path : '/ev-design',
    element : <Design/>,
    
  }
  ,
  {
    path : '/computation',
    element : <Compute/>
  }
  
      
])

function App() {

  return (
    <RouterProvider router={router}/>
  )
}

export default App
