import React from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
function Login() {
    const Navigate = useNavigate();
    const [credentials, setcredentials] = useState({ email: "", password: "" })
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/loginUser", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
            })
        })

        const json = await response.json()
        console.log(json)

        if (!json.success) {
            alert("Enter valid credentials")
        }
        if (json.success) {
            localStorage.setItem("authToken",json.authToken)
            localStorage.setItem("userEmail",credentials.email)
            console.log(localStorage.getItem("authToken"))
            Navigate('/')
        }
    }
    const changeHandler = (event) => {
        setcredentials(
            {
                ...credentials, [event.target.name]: event.target.value
            }
        )
    }
    return (
        <div>
            <div>
                <Navbar></Navbar>
            </div>

            <div className="container">
                <form onSubmit={ handleSubmit }>

                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input type="email" name='email' value={ credentials.email } className="form-control"
                            id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"
                            onChange={ changeHandler } />
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"
                            onChange={ changeHandler } name='password' value={ credentials.password }
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                    <Link to='/CreateUser' className='m-3 btn btn-success'>Create a account</Link>
                </form>
            </div></div>
    )
}

export default Login