import React, {useContext} from 'react'
import NoteContext from "../context/notes/NoteContext"
import Noteitem from './Noteitem';

const Notes = () => {

    const context = useContext(NoteContext);
    const { notes, setNotes } = context;

    return (
        <div className="row">
            <h2 className='my-4'>Your Note</h2>
            {notes.map((note) => {
                return <Noteitem key={note._id} note={note}/>
            })}
        </div>
    )
}

export default Notes
