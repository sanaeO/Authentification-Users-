import { useState } from 'react'
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import { FaSignInAlt } from "react-icons/fa"
import './Register.css'

import { useNavigate } from "react-router-dom"
import { useDispatch , useSelector } from "react-redux"
import SpinnerComp from "../components/SpinnerComp"
import { register , reset , login } from "../features/Auth/authSlice"
import { toast } from "react-toastify"
import { useEffect } from 'react'

function Login()
{

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user , isLoading , isSuccess , isError , message} = useSelector( (state) => state.auth)

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess || user) {
      navigate('/')
    }

    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])

    // use State fro form Data : 
    const [formData , setformData] = useState({

        email:"" ,
        password :"" ,
    })   

    // Get data 

    const { email , password }  = formData;

    // onChange()
    const onChange = (e) => {
      setformData( (prevState) => ({
          ...prevState , 
          [e.target.name] : e.target.value
      }))
  } 

  // Submit : 
    function onSubmit(e)
    {
        e.preventDefault();
        // 
        const userData = {
          email,
          password
        }
        //
        dispatch(login(userData))
       
    }
    if (isLoading) {
        return <SpinnerComp />
      }

    return (
        <section>
            <div className="head">
               <h3> <FaSignInAlt /> Login </h3>
               <p>Hello , Again  </p>
            </div>

        <Form className="form" onSubmit={onSubmit}>
        
          
          <div className="form-group">
            <input type="email" value={email}  id="email" name="email"   className='form-control' placeholder="Input your Email " onChange={onChange}/>
          </div>
          <div className="form-group">
            <input type="password" value={password} name="password" id="password"   className='form-control' placeholder="Input your Password " onChange={onChange}/>
          </div>
          
          <Button variant="primary" type="submit" >Sign In </Button>

    </Form>
        </section>
    );
}
export default Login ;