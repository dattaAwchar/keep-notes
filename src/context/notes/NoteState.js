import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {

  const host = "http://localhost:5000"

  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial)

  // Get all Notes
  const getNotes = async() => {
    // API Call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'Get',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZjYzAyYzZiNDgwNTczMjdhNGI4OTNhIn0sImlhdCI6MTcyNDY0NjExOH0.ykPVyQByx4SwTAIxS10-RRd2ivEcA1pUX4keMcu5IP0"
      }});
      const json = await response.json()
      console.log(json);
      setNotes(json)
        
    }


  // Add a Note
  const addNote = async(title, description, tag) => {

    // API Call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZjYzAyYzZiNDgwNTczMjdhNGI4OTNhIn0sImlhdCI6MTcyNDY0NjExOH0.ykPVyQByx4SwTAIxS10-RRd2ivEcA1pUX4keMcu5IP0"
      },
      body: JSON.stringify(title, description, tag)
    });

    console.log("adding a new note");

    const note = {
      "_id": "66cc03afd5e3525a4f7d1f51",
      "user": "66cc02c6b48057327a4b893a",
      "title": title,
      "description": description,
      "tag": tag,
      "__v": 0
    }
    setNotes(notes.concat(note))
  }

  //   Edit a Note
  const editNote = async (id, title, description, tag) => {
    // API Call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZjYzAyYzZiNDgwNTczMjdhNGI4OTNhIn0sImlhdCI6MTcyNDY0NjExOH0.ykPVyQByx4SwTAIxS10-RRd2ivEcA1pUX4keMcu5IP0"
      },
      body: JSON.stringify({title, description, tag})
    });
    const json =  response.json();


    // Logic to edit client
    for (let i = 0; i < notes.length; i++) {
      const element = notes[i];
      if (element._id === id) {
        element.title = title
        element.description = description
        element.tag = tag
      }
    }
  }

  // Delete a Note
  const deleteNote = (id) => {
    // TODO: API Call
    console.log("deleting note with id" + id);
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)
  }

  return (
    <NoteContext.Provider value={{ notes, addNote, editNote, deleteNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;