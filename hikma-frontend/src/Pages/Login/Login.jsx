import React from 'react'
import { useState } from 'react'
import './Login.css'
import { loginAdmin } from '../../services/authService'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { toast } from 'react-toastify'


const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await loginAdmin(email, password);
            console.log("Login response:", response.data);

            if (response.data && response.data.token) {
                const adminFlag = response.data.isAdmin === true || response.data.admin === true;
                login(response.data.token, adminFlag);
                toast.success('Login successful! Welcome back, Admin.', {
                    position: "top-right",
                    autoClose: 3000,
                });
                navigate('/admin/home/hero');
            } else {
                toast.error("Login failed - no token received");
            }
        }
        catch (error) {
            console.error("Login error:", error);
            toast.error("Invalid credentials or server error");
        }
        finally {
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
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    {/*passowrd*/}
                    <div className='form-group mb-3'>
                        <label>Password</label>
                        <div className='password-wrapper'>
                            <input type={showPassword ? 'text' : 'password'}
                                className='form-control'
                                placeholder='Enter your password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
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
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
            </div>

        </div>
    )
}

export default Login
