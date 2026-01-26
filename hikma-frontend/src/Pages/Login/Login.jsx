import React from 'react'
import { useState } from 'react'
import './Login.css'
import { loginAdmin } from '../../services/authService'
import{useNavigate} from 'react-router-dom'


const Login = () => {

    const[email,setEmail]=useState('');
    const[password,setPassword]=useState('');
    const[showPassword,setShowPassword]=useState(false);
    const[loading,setLoading]=useState(false);
    const navigate=useNavigate();

    const handleSubmit= async(e)=>{
        e.preventDefault();
        // Handle login logic here
        setLoading(true);

        try{
            const response=await loginAdmin(email,password);

            localStorage.setItem("token",response.data.token);
            alert(response.data.message);

            navigate('/admin/home/hero');
        }
        catch(error){
            alert("invalid credentials");
            console.error("Login error:",error);
        }
        finally{
            setLoading(false);
        }

        
    }

  return (
    <div className='login-page'>
        <div className='login-card'>
            <h3 className='login-title'> Admin Portal</h3>
            <p className='login-subtitle'>
                College of Dharul Hikma Management System
            </p>

            <form onSubmit={handleSubmit}>
                
                {/*username*/}
                <div className="form-group mb-3">
                    <label>Email</label>
                    <input type='email'
                    className='form-control'
                    placeholder='Enter your email'
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    required
                    />
                </div>

                {/*passowrd*/}
                <div className='form-group mb-3'>
                    <label>Password</label>
                <div className='password-wrapper'>
                    <input type={showPassword?'text':'password'}
                    className='form-control'
                    placeholder='Enter your password'
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    required
                    />
                    <span
                    className="toggle-password"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? "Hide" : "Show"}
                    </span>
                </div>
                </div>

                {/*Submit button*/}
                <button type='submit' className='btn login-btn'
                disabled={loading}>
                    {loading?'Logging in...':'Login'}
                </button>
            </form>
        </div>
      
    </div>
  )
}

export default Login
