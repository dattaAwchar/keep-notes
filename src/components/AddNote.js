import React, { useContext, useState } from 'react'
import NoteContext from "../context/notes/NoteContext"



const AddNote = () => {

    const context = useContext(NoteContext);
    const { addNote } = context;

    const [note, setNote] = useState({ title: "", description: "", tag:"" })

    const handleClick = (e) => {
        e.preventDefault()
        addNote(note.title, note.description, note.tag);
        setNote({title: "", description:"", tag:""})
    }

    const onchange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    return (
        <div className="container">
            <h2 className='my-4'>Add a Note</h2>
            <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label fw-bold">Title</label>
                    <input type="text" placeholder='Enter title here...' className="form-control" id="title" name='title' aria-describedby="emailHelp" onChange={onchange} value={note.title} minLength={3} required />

                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label fw-bold">Description</label>
                    <textarea className="form-control" placeholder='Enter description here...' type="text" id="description" name='description' rows="3" cols='4' onChange={onchange} value={note.description} minLength={3} required></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label fw-bold">Tag</label>
                    <select className="form-select" aria-label="Default select example" id="tag" name='tag' onChange={onchange} value={note.tag}>
                        <option selected>Select Note Type</option>
                        <option value="General Note">General Note</option>
                        <option value="Personal Note">Personal Note</option>
                        <option value="To-Do List">To-Do List</option>
                        <option value="Meetings/Appointments">Meetings/Appointments</option>
                        <option value="Reminders">Reminders</option>
                        <option value="Work/Project Updates">Work/Project Updates</option>
                        <option value="Learning/Research">Learning/Research</option>
                        <option value="Ideas/Brainstorming">Ideas/Brainstorming</option>
                        <option value="Important Contacts">Important Contacts</option>
                        <option value="Expenses/Finance">Expenses/Finance</option>
                        <option value="Health/Wellness">Health/Wellness</option>
                        <option value="Inspirational Quotes">Inspirational Quotes</option>
                    </select>

                </div>
                <button disabled={note.title.length < 3 || note.description.length < 3} type="submit" className="btn btn-primary my-3" onClick={handleClick}>Add Note</button>
            </form >
        </div >
    )
}

export default AddNote
