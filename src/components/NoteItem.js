import React, { useContext } from 'react';
import ContextNote from '../context/notes/ContextNote';

const NoteItem = ({ note, updateNote }) => {
  const { DeleteNote } = useContext(ContextNote);

  return (
    <div className="card my-3">
      <div className="card-body">
        <h5 className="card-title text-center">{note.title}</h5>
        <p className="card-text text-center">{note.description}</p>
        <div className="text-center">
          <i
            className="fa-solid fa-trash mx-2 text-center"
            onClick={() => DeleteNote(note._id)}
          ></i>
          <i
            className="fa-solid fa-pen-to-square mx-2 text-center"
            onClick={() => updateNote(note)}
          ></i>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
