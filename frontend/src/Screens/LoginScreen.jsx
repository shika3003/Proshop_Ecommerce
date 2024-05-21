import React from 'react'
import { useState ,useEffect} from 'react'
import {Link,useLocation,useNavigate} from 'react-router-dom'
import {Row,Col,Form,Button} from 'react-bootstrap'
import { useDispatch,useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import Loader from '../components/Loader'
import {useLoginMutation} from'../slices/usersApiSlice.js'
import {setCredentials} from '../slices/authSlice.js'
import { toast } from 'react-toastify'
import { red } from 'colors'
const LoginScreen = () => {
    const [email,setemail]=useState('');
    const [password,setpassword]=useState('');

    const dispatch=useDispatch();
    const navigate=useNavigate();
    const [login,{isLoading}]=useLoginMutation();
    const {userInfo} =useSelector((state)=>state.auth)

    const {search}=useLocation()
    const sp=new URLSearchParams(search);
    const redirect=sp.get('redirect')||'/';
    useEffect(()=>{
      if(userInfo)
        {
          navigate(redirect);
        }

    },[userInfo,redirect,navigate])



    const submitHandler=(e)=>
        {
            e.preventDefault()
            console.log('Submit')
        }
  return (
    <FormContainer>
      <h1>Sign In</h1>
      <Form onSubmit={submitHandler}>
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

        <Button type='submit' variant='primary' className='mt-2'>
            Sign In
        </Button>
      </Form>

      <Row className='py-3'>
        <Col>
        New Customer?<Link to='/register'>Register</Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default LoginScreen
