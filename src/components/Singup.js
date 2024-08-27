import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Singup = (props) => {

    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", confirmPassword: "" })
    let navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        const {name, email, password} = credentials;
        const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });
        const json = await response.json()
        console.log(json)
        if (json.success) {
            // save the auth token and redirect
            localStorage.setItem("token", json.authtoken)
            navigate("/");
            props.showAlert("Account Create Successfully", "success")
        }
        else {
            props.showAlert("Invalid Credentials", "danger")
        }
    }
    
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <>
            <div className="container d-grid p-2  justify-content-center">
                <h1 className='text-center'>Signup to keep-notes</h1>
                <form onSubmit={handleSubmit} className='mt-3'>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" id="name" name='name' placeholder='Enter your name' onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="email" name='email' placeholder='Enter your email' onChange={onChange} aria-describedby="emailHelp"/>
                        <div id="email" className="form-text pe-5 me-5">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" name='password' id="password" placeholder='Enter password' onChange={onChange} minLength={5} required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                        <input type="password" className="form-control" name='confirmPassword' id="confirmPassword" placeholder='Enter confirm password' onChange={onChange} minLength={5} required/>
                    </div>

                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </>
    )
}

export default Singup
