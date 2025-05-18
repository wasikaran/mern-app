// NoteState.js
import React, { useState } from 'react';
import ContextNote from './ContextNote';

const NoteState = (props) => {
    const initialNotes = [
        {
            "_id": "1",
            "user": "68263d43656a7a0a260cec94",
            "title": "wasi",
            "description": "wasikaran",
            "tags": "general",
            "Date": "2025-05-16T12:33:15.059Z",
            "__v": 0
        },
        {
            "_id": "1",
            "user": "68263d43656a7a0a260cec94",
            "title": "wasi",
            "description": "wasikaran",
            "tags": "general",
            "Date": "2025-05-16T12:33:15.059Z",
            "__v": 0
        },
        {
            "_id": "1",
            "user": "68263d43656a7a0a260cec94",
            "title": "wasi",
            "description": "wasikaran",
            "tags": "general",
            "Date": "2025-05-16T12:33:15.059Z",
            "__v": 0
        },
        {
            "_id": "1",
            "user": "68263d43656a7a0a260cec94",
            "title": "wasi",
            "description": "wasikaran",
            "tags": "general",
            "Date": "2025-05-16T12:33:15.059Z",
            "__v": 0
        },
        {
            "_id": "1",
            "user": "68263d43656a7a0a260cec94",
            "title": "wasi",
            "description": "wasikaran",
            "tags": "general",
            "Date": "2025-05-16T12:33:15.059Z",
            "__v": 0
        },
        {
            "_id": "1",
            "user": "68263d43656a7a0a260cec94",
            "title": "wasi",
            "description": "wasikaran",
            "tags": "general",
            "Date": "2025-05-16T12:33:15.059Z",
            "__v": 0
        }
    ];

    const [notes, setNotes] = useState(initialNotes);

    // Add Notes
    const AddNotes = (title, description, tags) => {
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

    // Edit Notes (blank for now)
    const EditNotes = () => {
        // Add logic later
    };

    // Delete Note
    const DeleteNote = (id) => {
        const newNotes = notes.filter((note) => note._id !== id);
        setNotes(newNotes);
    };

    return (
        <ContextNote.Provider value={{ notes, AddNotes, EditNotes, DeleteNote }}>
            {props.children}
        </ContextNote.Provider>
    );
};

export default NoteState;
