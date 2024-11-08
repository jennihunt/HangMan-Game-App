import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./loginForm.css"

export default function LoginForm(){

    const navigate = useNavigate();
    const [login, setlogin] = useState([])
    const [password, setpassword] = useState('');
    const [username, setusername] = useState('');
    const [registerusername, setregisterusername] = useState('');
    const [registerpassword, setregisterpassword] = useState('');
    const [registerStatus, setRegisterStatus] = useState('');

    const handleRegister = (e) => {
        e.preventDefault();
        if (registerusername !== '' && registerpassword !== '') {
            axios
                .post(
                    "http://localhost:8080/register",
                    {
                        username: registerusername,
                        password: registerpassword
                    },
                    {
                        withCredentials: true,
                    }
                )
                .then((res) => {
                    setRegisterStatus(res.data)
                     console.log(res.data)
                })
                .catch((error) => {
                    setRegisterStatus(error)
                    console.error(error)
                });
        }
        setRegisterStatus('')
    };

    const submitLogin = (e) => {
        e.preventDefault();
        if (password !== '' && username !== '')
            axios.post('http://localhost:8080/login',
                {
                    username: username,
                    password: password
                },
                {
                    withCredentials: true,
                }
            )
                .then((res) => {
                    setpassword("")
                    setusername("")
                    // navigate("/plantrip")
                    navigate('/update')
                    setlogin(res.data)
                })
                .catch(error => {
                    console.error('Error:', error)
                    setlogin(error)
                })
    }


    const handleLogout = (e) => {
        e.preventDefault();
        axios
            .post(
                "http://localhost:8080/logout",
                {},
                {
                    withCredentials: true,
                }
            )
            .then((res) => {
                // console.log(res.data);
                // setUserState(null);
                // setIsLoggedOut(true); if i want any output
            })
            .catch((error) => console.error(error));
    };


    return(
        <div id="loginDiv">
            {/* Log-in */}
            <div className='txt-block'>
                    <h1><u>Log-In</u></h1>
                    <form>
                        <label>User Name:</label>
                        <input
                            required
                            type="text"
                            value={username}
                            className="logininput"
                            onChange={e => setusername(e.target.value)}
                        /><br />

                        <label>Password:</label>
                        <input
                            required
                            type="password"
                            value={password}
                            className="logininput"
                            onChange={e => setpassword(e.target.value)}
                        /><br />

                        <button className="submitbtn" type="submit " onClick={submitLogin}>Login to Start Planning Today</button>
                        <button className="submitbtn" type="submit " onClick={handleLogout}>Log-Out</button><br/><br/>
                        {login}
                    </form>
                </div>

                <div className='txt-block-right'>
                    <h1><u>Register</u></h1>
                    <form>
                        <label>User Name:</label>
                        <input
                            type="text"
                            value={registerusername}
                            className="logininput"
                            onChange={e => setregisterusername(e.target.value)}
                            required
                        /><br />

                        <label>Password:</label>
                        <input
                            type="password"
                            value={registerpassword}
                            className="logininput"
                            onChange={e => setregisterpassword(e.target.value)}
                            required
                        /><br />

                        <button className="submitbtn" type="submit " onClick={handleRegister}>Register Today</button><br />
                        <h4> {!registerStatus ? "" : registerStatus}</h4>
                    </form>
                </div>

        </div>
    )
}