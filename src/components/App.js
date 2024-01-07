import { Layout } from "./Layout";
import {Route, Routes} from 'react-router-dom'
import { HomePage } from "pages/HomePage";
import { ContactsPage } from "pages/ContactsPage";
import { LoginPage } from "pages/LoginPage";
import { RegisterPage } from "pages/RegisterPage";
import { fetchCurrentUser } from "../redux/auth/authThunk";
import { useEffect } from "react";
import { useDispatch } from "react-redux";


const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchCurrentUser())
  }, [dispatch])
  

  
    return (
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<HomePage/>}/>
          <Route path='contacts' element={<ContactsPage/>}/>
          <Route path='login' element={<LoginPage/>}/>
          <Route path='register' element={<RegisterPage/>}/>
        </Route>
      </Routes>
    )
}

export default App;
