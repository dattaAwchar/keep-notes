import React from 'react'

const Noteitem = (props) => {

    const { note } = props;

    return (
        <div className='col-md-3 my-3'>
            <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">{note.title}</h5>
                        <p className="card-text">{note.description}</p>
                        <a href="/" className="btn btn-primary mx-2 my-1">Edit Note</a>
                        <a href="/" className="btn btn-primary mx-2 my-1">Delete Note</a>
                    </div>
            </div>
        </div>
    )
}

export default Noteitem
