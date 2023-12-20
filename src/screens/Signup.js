import React, { useState } from 'react'
import { Link,useNavigate  } from 'react-router-dom'
import Navbar from '../components/Navbar';
function Signup() {
    const navigate = useNavigate()
    const [credentials, setcredentials] = useState({ name: "", email: "", geolocation: "", password: "" })
    const handleSubmit = async (e) => {


        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/CreateUser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: credentials.name,
                email: credentials.email,
                password: credentials.password,
                location: credentials.geolocation

            })

        })

        const json = await response.json()
        console.log(json)

        if (!json.success) {
            alert("Enter valid credentials")
        }
        navigate('/login')
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
            <div><Navbar></Navbar></div>

            <div className="container">
                <form onSubmit={ handleSubmit }>
                    <div className="form-group">
                        <label htmlFor="name">User name</label>
                        <input type="text" className="form-control" placeholder="Enter username" name='name' value={ credentials.name }
                            onChange={ changeHandler } />

                    </div>
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
                    <div className="form-group">
                        <label htmlFor="geolocation">Address</label>
                        <input type="text" className="form-control" id="geolocation" placeholder="Address"
                            onChange={ changeHandler } name='geolocation' value={ credentials.geolocation }
                        />
                    </div>

                    <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>


                    <Link to='/login' className='m-3 btn btn-succees'>Already a user?</Link>
                </form>
            </div>

        </div>
    )
}

export default Signup