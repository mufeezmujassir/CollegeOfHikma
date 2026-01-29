import React from 'react'
import { useState } from 'react'
import './Login.css'
import { loginAdmin } from '../../services/authService'
import{useNavigate} from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'


const Login = () => {

    const[email,setEmail]=useState('');
    const[password,setPassword]=useState('');
    const[showPassword,setShowPassword]=useState(false);
    const[loading,setLoading]=useState(false);
    const navigate=useNavigate();
    const { login } = useAuth();

    const handleSubmit= async(e)=>{
        e.preventDefault();
        // Handle login logic here
        setLoading(true);

        try{
            const response=await loginAdmin(email,password);
            console.log("Login response:", response.data); // debug log

            if (response.data && response.data.token) {
                // backend may return `isAdmin` or `admin` field — accept both
                const adminFlag = response.data.isAdmin === true || response.data.admin === true;
                // use context login to store token and admin flag
                login(response.data.token, adminFlag);
                alert(response.data.message);
                navigate('/admin/home/hero');
            } else {
                alert("Login failed - no token received");
            }
        }
        catch(error){
            console.error("Login error:", error); // debug log
            alert("Invalid credentials or server error");
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
