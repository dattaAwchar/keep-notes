import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import backgroundImage from './LoginBackground.jpg'

const Login = (props) => {

    const [credentials, setCredentials] = useState({ email: "", password: "" })
    let navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json()
        console.log(json)
        if (json.success) {
            // save the auth token and redirece
            localStorage.setItem("token", json.authtoken)
            props.showAlert("Logged in Successfully", "success")
            navigate("/");

        }
        else {
            props.showAlert('Invalid Details', "danger")

        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <>
            <div className="container d-grid p-2 justify-content-center">
                <h1 className='text-center'>Login to keep-notes</h1>
                <form onSubmit={handleSubmit} className='mt-3'>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" value={credentials.email} onChange={onChange} />
                        <div id="email" className="form-text pe-5 me-5">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" name='password' id="password" value={credentials.password} onChange={onChange} />
                    </div>

                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </>
    )
}

export default Login
