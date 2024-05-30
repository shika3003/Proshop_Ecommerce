import React from 'react'
import { useState ,useEffect} from 'react'
import {Link,useLocation,useNavigate} from 'react-router-dom'
import {Row,Col,Form,Button} from 'react-bootstrap'
import { useDispatch,useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer.jsx'
import Loader from '../components/Loader.jsx'
import {useRegisterMutation} from'../slices/usersApiSlice.js'
import {setCredentials} from '../slices/authSlice.js'
import { toast } from 'react-toastify'
import { red } from 'colors'
const RegisterScreen
 = () => {
    const[name,setname]=useState('');
    const [email,setemail]=useState('');
    const [password,setpassword]=useState('');
    const[confirmPassword,setconfirmPassword]=useState('');

    const dispatch=useDispatch();
    const navigate=useNavigate();
    const [register,{isLoading}]=useRegisterMutation();
    const {userInfo} =useSelector((state)=>state.auth)

    const {search}=useLocation()
    const sp=new URLSearchParams(search);

    // if loginned then only shipping page will be displayed on redirecting otherwise back to login page
    const redirect=sp.get('redirect')||'/';
    useEffect(()=>{
      if(userInfo)
        {
          navigate(redirect);
        }

    },[userInfo,redirect,navigate])



    const submitHandler=async(e)=>
        {
            e.preventDefault()
            if(password!=confirmPassword)
              {
                toast.error('Passwords do not match');
              }
              else
              {
                try{
                  const res=await register({name,email,password}).unwrap();
    
                  dispatch(setCredentials({...res}))
                  navigate(redirect)
                }
                catch(error)
                {
                  toast.error(error?.data?.message||error.error)
                }
              }
            
        }
  return (
    <FormContainer>
      <h1>Sign Up</h1>
      <Form onSubmit={submitHandler}>
      <Form.Group controlId='name' className='my-3'>
            <Form.Label>Name</Form.Label>
            <Form.Control type='text' placeholder='Enter name' value={name} onChange={(e)=>setname(e.target.value)}> 

            </Form.Control>

        </Form.Group>
        <Form.Group controlId='email' className='my-3'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control type='email' placeholder='Enter email' value={email} onChange={(e)=>setemail(e.target.value)}> 

            </Form.Control>

        </Form.Group>

        <Form.Group controlId='password' className='my-3'>
            <Form.Label>Password</Form.Label>
            <Form.Control type='password' placeholder='Enter password' value={password} onChange={(e)=>setpassword(e.target.value)}> 

            </Form.Control>

        </Form.Group>

        <Form.Group controlId='confirmpassword' className='my-3'>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type='confirmpassword' placeholder='Confirm password' value={confirmPassword} onChange={(e)=>setconfirmPassword(e.target.value)}> 

            </Form.Control>

        </Form.Group>

        <Button type='submit' variant='primary' className='mt-2' disabled={isLoading}>
            Register
        </Button>

        {isLoading&&<Loader />}
      </Form>

      <Row className='py-3'>
        <Col>
        Already have an account
        <Link to={redirect?`/login?redirect=${redirect}`:'/login'}>Login</Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default RegisterScreen

