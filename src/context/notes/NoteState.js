// NoteState.js
import React, { useState } from 'react';
import ContextNote from './ContextNote';

const NoteState = (props) => {
  const host = "http://localhost:5000"

  const initialNotes = []
  const [notes, setNotes] = useState(initialNotes);



  // Add Notes
  const AddNotes = async (title, description, tags) => {
    const response = await fetch(`${host}/api/notes/addNotes`, {
      method: "POST",
      headers: {
        'content-type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tags })
    })
    const itemNote = {
      "_id": Math.random().toString(), // unique id
      "user": "68263d43656a7a0a260cec94",
      "title": title,
      "description": description,
      "tags": tags,
      "Date": new Date().toISOString(),
      "__v": 0
    };
    setNotes(notes.concat(itemNote));
  };
const EditNotes = async (id, title, description, tags) => {
  // API Call
  const response = await fetch(`${host}/api/notes/updateNote/${id}`, {
    method: "PUT",
    headers: {
      'Content-Type': 'application/json',
      'auth-token': localStorage.getItem('token')
    },
    body: JSON.stringify({ title, description, tags })
  });

  if (!response.ok) {
    console.error("Update failed:", await response.text());
    return;
  }

  const updatedNote = await response.json();
  console.log("Updated Note from server:", updatedNote);

  // Replace updated note in state
  setNotes(prevNotes =>
    prevNotes.map(note =>
      note._id === id ? updatedNote : note
    )
  );
};
  // Delete Note
  const DeleteNote = async (id) => {
    const response = await fetch(`${host}/api/notes/deleteNote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')

      }
    });
    const data = await response.json();  // ✅ sirf yahan use karo
    console.log("Fetched Notes:", data);
    const newNotes = notes.filter((note) => note._id !== id);
    setNotes(newNotes);
  };

  const GetNotes = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/notes/userAllNote", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        }
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response:", errorText);
        return;
      }

      const data = await response.json();  // ✅ sirf yahan use karo
      console.log("Fetched Notes:", data);
      setNotes(data);

    } catch (error) {
      console.error("Fetch failed:", error);
    }
  };



  return (
    <ContextNote.Provider value={{ notes, AddNotes, EditNotes, DeleteNote, GetNotes }}>
      {props.children}
    </ContextNote.Provider>
  );
};

export default NoteState;
