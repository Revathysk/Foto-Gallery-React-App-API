import React, { useState , useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import UserContext from '../../context/Usercontext';

import './styles.css';

const Login = ( {setUser, setUserLogin} ) => {

    const user= useContext(UserContext);
    const [userName, setUserName] = useState('');
    const [pwd,setPwd] = useState('');
    const [loginMessage,setLoginMessage] = useState('')
    const [signUpMessage,setSignUpMessage] = useState('')
    const [firstName,setFirstName] = useState('')
    const [lastName,setLastName] = useState('')
    const [newUserName,setNewUserName] = useState('')
    const [newPwd,setNewPwd] = useState('')

    const navigate = useNavigate();
    //const handleChange = e => { setUserName(e.target.value) }

    const handleSignup= async(e) =>{
        e.preventDefault()

        console.log("handle Signup");

        const newUser = {
            firstname: firstName,
            lastname : lastName,
            username : newUserName,
            password : newPwd
        }      

        try {
            console.log("new User: ", newUser.firstname ,newUser.lastname)
            
            const response= await axios.post('http://localhost:8080/api/v1/adduser',newUser)         
                 console.log(response.status)
                if(response.status===200){
                    setFirstName('')
                    setLastName('')
                    setNewUserName('')
                    setNewPwd('')
                    setSignUpMessage('Signed up successfully. Please login!') 
                }                
                
        }
        catch(err){
            console.log(err)
            setSignUpMessage('Ops! Username taken. Try adding a number') ;            
        }
    }

    const handleSubmit = async(e) => {
        
        e.preventDefault()

        try {
            console.log(userName);
            const response = await axios.get(`http://localhost:8080/api/v1/user/${userName}`);
            console.log('user search result:', response);
            
            if (response.status === 200 && response.data.length > 0) {                
                console.log("User Found");                
                if (response.data[0].password === pwd) {
                    setUser (response.data[0].firstname)
                    setUserLogin(userName);
                    navigate('/favorites');                     
                }
                else{
                    setUserName('');
                    setPwd('');
                    setLoginMessage('Invalid credential. Password is case sensitive');
                }
            }
            
            else {                
                // when fecth user returns length zero 
                setLoginMessage("User not found");
            }             
        } 
        catch (err) {
            console.log(err);
        }                
    }

    return (
        <div className="user-main-div">
        <form id="login-form1" className='mx-auto' onSubmit={handleSubmit}>
            <div className='login-div'>

                <div className="mb-3">
                    <label htmlFor="exampleInputUser1" className="form-label">User Name</label>
                    <input
                        type="text" className="form-control"
                        id="exampleInputUser1" aria-describedby="userHelp"
                        value={userName}
                        onChange={e => setUserName(e.target.value) }
                    />
                    <div id="userHelp" className="form-text"> Type in Username </div>
                </div>

                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input 
                    type="password" className="form-control" id="exampleInputPassword1" 
                    value={pwd}
                    onChange={e => setPwd(e.target.value) }
                    />
                </div>
                <div id="userHelp" className="form-text"> {loginMessage} </div>

                <button type="submit" className="btn btn-primary"> Login </button>

            </div>
        </form>

        <div className='line'> </div>

        <form id="login-form2" className='mx-auto' onSubmit={handleSignup}>
        <div className='login-div'>
            
            <div className="mb-3">
                <label htmlFor="exampleInputUser2" className="form-label">First Name</label>
                <input
                    type="text" className="form-control"
                    id="exampleInputUser2" aria-describedby="userHelp"
                    value={firstName}
                    onChange={e => setFirstName(e.target.value) }
                />                
            </div>

            <div className="mb-3">
                <label htmlFor="exampleInputUser3" className="form-label">Last Name</label>
                <input
                    type="text" className="form-control"
                    id="exampleInputUser3" aria-describedby="userHelp"
                    value={lastName}
                    onChange={e => setLastName(e.target.value) }
                />
                
            </div>

            <div className="mb-3">
                <label htmlFor="exampleInputUser4" className="form-label">User Name</label>
                <input
                    type="text" className="form-control"
                    id="exampleInputUser4" aria-describedby="userHelp"
                    value={newUserName}
                    onChange={e => setNewUserName(e.target.value) }
                />                 
            </div>

            <div className="mb-3">
                <label htmlFor="exampleInputPassword2" className="form-label">Password</label>
                <input 
                type="password" className="form-control" id="exampleInputPassword2" 
                value={newPwd}
                onChange={e => setNewPwd(e.target.value) }
                />
            </div>

            <div id="userHelp" className="form-text"> {signUpMessage} </div>

            <button type="submit" className="btn btn-primary"> SignUp </button>

        </div>
    </form>
    </div>
    );
}

export default Login;
