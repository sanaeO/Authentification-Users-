import { useState } from 'react'
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import Row from "react-bootstrap/Row"
import { FaUser } from "react-icons/fa"
import './Register.css'
import { useNavigate } from "react-router-dom"
import { useDispatch , useSelector } from "react-redux"
import SpinnerComp from "../components/SpinnerComp"
import { register , reset } from "../features/Auth/authSlice"
import { toast } from "react-toastify"
import { useEffect } from 'react'

function Register()
{   
   // Initialisation :
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { user , isLoading , isSuccess , isError , message} = useSelector( (state) => state.auth)

  // use Effect

  useEffect(()=> {
    if(isError)
    {
      toast.error(message)
    }
    if(isSuccess || user /* user means : already Logged in*/ )
    {
      navigate("/")
    }
    dispatch(reset())

  } , [ user , isLoading , isSuccess , isError , message , dispatch , navigate ])


    // use State fro form Data : 
    const [formData , setformData] = useState({
      //  INITIALISATION
        name :"",
        email:"" ,
        password :"" ,
        confPassword :"",
    })    

    // Get data 
    const {name , email , password , confPassword}  = formData;

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
        // passwords
        if(password !== confPassword)
        {
          toast.error("Passwords Do Not Much !! ")
        }
        else{
           const userData = {
            name , email , password 
          }
          dispatch(register(userData))
        }
    }

    // Check if is Loading :
    if(isLoading)
    {
     return  <SpinnerComp />
    }

    // Return
    return (
        <section>
            <div className="head">
               <h3> <FaUser /> Register </h3>
               <p>Please , Create an Account </p>
            </div>

        <Form className="form" onSubmit={onSubmit}>
        
          <div className="form-group">
            <input type="text" value={name} id="name" name="name"   className='form-control' placeholder="Input your Name " onChange={onChange}/>
          </div>
          <div className="form-group">
            <input type="email" value={email}  id="email" name="email"   className='form-control' placeholder="Input your Email " onChange={onChange}/>
          </div>
          <div className="form-group">
            <input type="password" value={password} name="password" id="password"   className='form-control' placeholder="Input your Password " onChange={onChange}/>
          </div>
          <div className="form-group">
            <input type="password" value={confPassword}  id="confPassword" name="confPassword"   className='form-control' placeholder="Input your Password again" onChange={onChange} />
          </div>
          <Button variant="primary" type="submit" >Sign Up </Button>
{/* 
      <Form.Group as={Row} className="mb-3" controlId="formHorizontalName">
        <Form.Label column sm={2}>
         Name 
        </Form.Label>
        <Col sm={10}>
          <Form.Control 
           type="text"
           placeholder="Name"
           value = {name}
           onChange={onChange} />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
        <Form.Label column sm={2}>
          Email
        </Form.Label>
        <Col sm={10}>
          <Form.Control
           type="email"
           placeholder="Email"  
           value= {email}
           onChange={onChange} />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
        <Form.Label column sm={2}>
          Password
        </Form.Label>
        <Col sm={10}>
        <Form.Control
           type="password"
           placeholder="Password" 
           value = {password}
           onChange={onChange} />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formHorizontalConfPassword">
        <Form.Label column sm={2}>
          Confirmed Password 
        </Form.Label>
        <Col sm={10}>
          <Form.Control 
          type="password" 
          placeholder="Confirmed Password" 
          value={confPassword}
          onChange={onChange} />
        </Col>
      </Form.Group> 
    
      <Form.Group as={Row} className="mb-3">
        <Col sm={{ span: 10, offset: 2 }}>
          <Button type="submit">Sign In</Button>
        </Col>
      </Form.Group>
      */}
    </Form>
        </section>
    );
}
export default Register ;