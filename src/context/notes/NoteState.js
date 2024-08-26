import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
const notesInitial = [
    {
      "_id": "66cc0d3afd5e355a4f7d1eff",
      "user": "66cc02c6b48057327a4b893a",
      "title": "This is personal",
      "description": "Please add personal note in the note book",
      "tag": "personal, mine",
      "__v": 0
    },
    {
      "_id": "66cc0d3afd5e355a4f7d1f01",
      "user": "66cc02c6b48057327a4b893a",
      "title": "This is personal",
      "description": "Please add personal note in the note book",
      "tag": "personal, mine",
      "__v": 0
    },
    {
      "_id": "66cc0d3afd5e355a4f7d1f02",
      "user": "66cc02c6b48057327a4b893a",
      "title": "This is personal",
      "description": "Please add personal note in the note book",
      "tag": "personal, mine",
      "__v": 0
    },
    {
      "_id": "66cc0d3afd5e355a4f7d1f03",
      "user": "66cc02c6b48057327a4b893a",
      "title": "This is personal",
      "description": "Please add personal note in the note book",
      "tag": "personal, mine",
      "__v": 0
    },
    {
      "_id": "66cc0d3afd5e355a4f7d1f04",
      "user": "66cc02c6b48057327a4b893a",
      "title": "This is personal",
      "description": "Please add personal note in the note book",
      "tag": "personal, mine",
      "__v": 0
    },
    {
      "_id": "66cc0d3afd5e355a4f7d1f05",
      "user": "66cc02c6b48057327a4b893a",
      "title": "This is personal",
      "description": "Please add personal note in the note book",
      "tag": "personal, mine",
      "__v": 0
    },
    {
      "_id": "66cc0d3afd5e355a4f7d1f61",
      "user": "66cc02c6b48057327a4b893a",
      "title": "This is personal",
      "description": "Please add personal note in the note book",
      "tag": "personal, mine",
      "__v": 0
    },
    {
      "_id": "66cc0d3afd5e355a4f7d1f51",
      "user": "66cc02c6b48057327a4b893a",
      "title": "This is personal",
      "description": "Please add personal note in the note book",
      "tag": "personal, mine",
      "__v": 0
    }
  ]
  const [notes, setNotes] = useState(notesInitial)

  // Add a Note
  const addNote = (title, description, tag) => {
    console.log("adding a new note");
    
    // TODO: API Call
    const note = {"_id": "66cc03afd5e3525a4f7d1f51",
      "user": "66cc02c6b48057327a4b893a",
      "title": title,
      "description": description,
      "tag": tag,
      "__v": 0}
    setNotes(notes.concat(note))
  }

//   Edit a Note
  const editNote = () => {
  }

  // Delete a Note
  const deleteNote = (id) => {
    // TODO: API Call
    console.log("deleting note with id" + id);
    const newNotes = notes.filter((note)=> {return note._id!==id})
    setNotes(newNotes)
  }

    return (
    <NoteContext.Provider value={{notes, addNote, editNote, deleteNote}}>
        {props.children}
    </NoteContext.Provider>
    )
}

export default NoteState;