import React from 'react'

const Alert = (props) => {

    return (
        <>
            <div className="alert alert-success d-flex align-items-center " role="alert">
                <i className="fa-solid fa-circle-check me-2"></i>
                <div>
                    {props.message}
                </div>
            </div>
        </>
    )
}

export default Alert
