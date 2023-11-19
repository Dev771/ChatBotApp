import React, { useState } from 'react'
import "../Authorization.css";
import * as api from '../../../api/index';
import { useNavigate } from 'react-router-dom';

const Registeration = () => {

    const [user, setUser] = useState({ username: '', email: '', password: '' });
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        api.registerUser(user)
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
                <h1 className='heading'>Registeration</h1>
                <form onSubmit={handleSubmit}>
                    <div className='inputs'>
                        <label>Username</label>
                        <input type='text' placeholder='Username' name='username' value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })} required />
                    </div>
                    <div className='inputs'>
                        <label>Email</label>
                        <input type='email' placeholder='Email' name='email' value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} required />
                    </div>
                    <div className='inputs'>
                        <label>Password</label>
                        <input type='password' placeholder='Password' name='password' value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} required />
                    </div>
                    <div className='submitBtnDiv'>
                        <input type='submit' value="Submit" className='submitBtn' />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Registeration;