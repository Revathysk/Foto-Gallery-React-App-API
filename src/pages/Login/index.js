import './styles.css'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'


const Login = ({ setUserLogin }) => {
    const [userName, setUserName] = useState('')
    const navigate = useNavigate()

    const handleChange = e => { setUserName(e.target.value) }
    const handleSubmit = e => {
        e.preventDefault()
        setUserLogin(userName)

        navigate('/photos')
    }

    return (
        <form id="login-form" className='mx-auto' onSubmit={handleSubmit}>
            <div className='login-div'>
                <div className="mb-3">
                    <label htmlFor="exampleInputUser1" className="form-label">User Name</label>
                    <input
                        type="text" className="form-control"
                        id="exampleInputUser1" aria-describedby="userHelp"
                        value={userName}
                        onChange={handleChange}
                    />
                    <div id="userHelp" className="form-text"> Type in Username or email Id </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </div>
        </form>
     
    );
}

export default Login;
