import React, { useEffect, useState } from 'react'
import "../Authorization.css";
import * as api  from '../../../api/index';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const [user, setUser] = useState({ email: '', password: '' });
    const [error, setError] = useState("");

    const navigate = useNavigate();

    //Redirecting to Home Page if User is already Logged
    useEffect(() => {
        if(localStorage.getItem("logged")) navigate("/");
    }, [navigate]);

    //Sending user details to the Sever for User Authentication
    const handleSubmit = async (e) => {
        e.preventDefault();
        await api.loginUser(user)
            .then((response) => {
                localStorage.setItem("logged", true);
                localStorage.setItem("User", JSON.stringify(response.data.data));

                window.dispatchEvent(new Event("storage"));

                navigate("/");
            })
            .catch((error) => {
                setError(error.response.data.msg);
            });
    }

    return (
        <div className='container'>
            <div className='error'>
                {error}
            </div>
            <div className='card'>
                <h1 className='heading'>Login</h1>
                <form onSubmit={handleSubmit}>
                    <div className='inputs'>
                        <label>Email</label>
                        <input type='email' placeholder='Email' name='Email' value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} required />
                    </div>
                    <div className='inputs'>
                        <label>Password</label>
                        <input type='password' placeholder='Password' name='Password' value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} required />
                    </div>
                    <div className='submitBtnDiv'>
                        <input type='submit' value="Submit" className='submitBtn' />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login