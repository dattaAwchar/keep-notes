import React from 'react'

const Noteitem = (props) => {

    const { note } = props;

    return (
        <div className='col-md-3 my-3'>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description} Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus eveniet architecto modi tempora aperiam inventore quidem nemo, ut saepe non sit amet! Enim, voluptatem obcaecati sit soluta alias fugiat pariatur.
                    </p>
                    <i className="fa-solid fa-pen-to-square mx-2"/>
                    <i className="fa-solid fa-trash mx-2"/>
                </div>
            </div>
        </div>
    )
}

export default Noteitem
