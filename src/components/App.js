import { Layout } from "./Layout";
import {Route, Routes} from 'react-router-dom'
import { HomePage } from "pages/HomePage/HomePage";
import { ContactsPage } from "pages/ContactsPage/ContactsPage";
import { LoginPage } from "pages/LoginPage/LoginPage";
import { RegisterPage } from "pages/RegisterPage/RegisterPage";
import { AddContactPage } from "pages/AddContactPage/AddContactsPage";
import { ContactDetails } from "pages/ContactDetails/ContactsDetails";
import { fetchCurrentUser } from "../redux/auth/authThunk";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { RestrictedRoute } from "./Routes/RestrictedRoute";
import { PrivateRoute } from "./Routes/PrivateRoute";



const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchCurrentUser())
  }, [dispatch])
  

  
    return (
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<HomePage/>}/>
          <Route path='login' element={<RestrictedRoute element={LoginPage} />}/>
          <Route path='register' element={<RestrictedRoute element={RegisterPage} />}/>
          <Route path='contacts' element={<PrivateRoute element={ContactsPage}/>}/>
          <Route path='contacts/add' element={<PrivateRoute element={AddContactPage}/>}/>
          <Route path='contacts/:id' element={<PrivateRoute element={ContactDetails}/>}/>
        </Route>
      </Routes>
    )
}

export default App;
