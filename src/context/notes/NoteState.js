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
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZjYzdmZDUwNmNjNjU1ZDVlZTBlMjY3In0sImlhdCI6MTcyNDY3ODEwMX0.-RzJX4HGnO8CV-1-U7kXjpdep3mRDwK84x-cN--WRnA"
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
        'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZjYzdmZDUwNmNjNjU1ZDVlZTBlMjY3In0sImlhdCI6MTcyNDY3ODEwMX0.-RzJX4HGnO8CV-1-U7kXjpdep3mRDwK84x-cN--WRnA"
      },
      body: JSON.stringify({title, description, tag})
    });

    const json = await response.json();
    console.log(json);

    console.log("adding a new note");

    const note = {
      "user": "66cc7fd506cc655d5ee0e267",
      "title": title,
      "description": description,
      "tag": tag,
      "_id": "66cc80b6688134ec00cb4643",
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
        'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZjYzdmZDUwNmNjNjU1ZDVlZTBlMjY3In0sImlhdCI6MTcyNDY3ODEwMX0.-RzJX4HGnO8CV-1-U7kXjpdep3mRDwK84x-cN--WRnA"
      },
      body: JSON.stringify({title, description, tag})
    });
    const json = await response.json();
    console.log(json)

    let newNotes = JSON.parse(JSON.stringify(notes))

    // Logic to edit client
    for (let i = 0; i < newNotes.length; i++) {
      const element = newNotes[i];
      if (element._id === id) {
        newNotes[i].title = title
        newNotes[i].description = description
        newNotes[i].tag = tag
        break;
      }
    }
    setNotes(newNotes)
  }

  // Delete a Note
  const deleteNote = async (id) => {
    // API Call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZjYzdmZDUwNmNjNjU1ZDVlZTBlMjY3In0sImlhdCI6MTcyNDY3ODEwMX0.-RzJX4HGnO8CV-1-U7kXjpdep3mRDwK84x-cN--WRnA"
      }
    });
    const json = response.json();
    console.log(json)


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