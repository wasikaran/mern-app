import React from 'react';
import { useContext } from 'react';
import ContextNote from '../context/notes/ContextNote';

const NoteItem = ({ note }) => {
        const { DeleteNote} = useContext(ContextNote);
    
    return (
        <div className="card my-3">
            <div className="card-body">
                <h5 className="card-title text-center">{note.title}</h5>
                <p className="card-text text-center">{note.description}</p>
                <div className="text-center">
                <i class="fa-solid fa-trash mx-2 text-center" onClick={()=>{DeleteNote(note._id)}}></i>
                <i class="fa-solid fa-pen-to-square mx-2 text-center"></i>
                    
                </div>


            </div>
        </div>
    );
};

export default NoteItem;
