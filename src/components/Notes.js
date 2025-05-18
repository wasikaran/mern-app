import React, { useContext } from 'react';
import ContextNote from '../context/notes/ContextNote';
import NoteItem from './NoteItem';
import AddNote from './AddNote';

const Notes = () => {
    const { notes, AddNotes } = useContext(ContextNote);

    return (
        <>
        <AddNote />
        <div className="row my-3">
            <h2>Your Notes</h2>
            {notes.map((note, index) => (
                <div className="col-md-3" key={index}>
                    <NoteItem key={note.id} note={note} />
                </div>
            ))}
        </div>
        </>
    );
};

export default Notes;
