import React, { useContext, useEffect } from 'react'
import noteContext from '../context/notes/NoteContext'

const About = () => {
  const a = useContext(noteContext)
  useEffect(()=>{
    a.update();
  }, [])
  return (
    <div>
      This is About and my name is {a.state.name} and I am from {a.state.city}
    </div>
  )
}

export default About
