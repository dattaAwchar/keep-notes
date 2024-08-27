import React, { useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const Navbar = () => {

    let location = useLocation()
    useEffect(() => {
        console.log(location.pathname)
    }, [location]);
    
    let navigate = useNavigate()
    
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    }    


    return (
        <>
            <nav className="navbar bg-primary navbar-expand-lg" data-bs-theme="dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Keep-Notes</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/' ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/about' ? "active" : ""}`} to="/about">About</Link>
                            </li>
                        </ul>
                        <form className="d-flex" role="search" data-bs-theme='light'>
                            <input className="form-control me-2" type="search" placeholder="Search Note" aria-label="Search" />
                            <Link className="btn btn-outline-light me-2" to='/search'>Search</Link>
                        </form>
                        {!localStorage.getItem('token')?<div>
                            <Link className="btn btn-outline-light me-2" to="/login">Login</Link>
                            <Link className="btn btn-outline-light" to="/signup">Signup</Link>
                        </div>: <button onClick={handleLogout} className='btn btn-outline-light'>Logout</button>}
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar
