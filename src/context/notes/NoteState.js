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
      "_id": "66cc0d3afd5e355a4f7d1f01",
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
      "_id": "66cc0d3afd5e355a4f7d1f01",
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
      "_id": "66cc0d3afd5e355a4f7d1f01",
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
    }
  ]

  const [notes, setNotes] = useState(notesInitial)
    return (
    <NoteContext.Provider value={{notes, setNotes}}>
        {props.children}
    </NoteContext.Provider>
    )
}

export default NoteState;