import React, { useContext, useEffect, useState } from 'react';
import ContextNote from '../context/notes/ContextNote';
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import { Modal, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const Notes = () => {
  const { notes, GetNotes, EditNotes } = useContext(ContextNote);

  const [note, setNote] = useState({ id: "", title: "", description: "", tags: "" });
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  

  useEffect(() => {
    if(localStorage.getItem('token')){

      GetNotes();
    }
    else{
        navigate('/login');
    }
  }, []);

  const handleClose = () => {
    setShow(false);
    setNote({ id: "", title: "", description: "", tags: "" }); // Reset note
  };

  const handleShow = () => setShow(true);

  const updateNote = (currentNote) => {
    setNote({
      id: currentNote._id,
      title: currentNote.title,
      description: currentNote.description,
      tags: currentNote.tags || "",
    });
    handleShow();
  };

  const handleChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (note.title.trim() && note.description.trim()) {
      EditNotes(note.id, note.title, note.description, note.tags);
      handleClose();
    } else {
      alert("Title aur Description required hain.");
    }
  };

  return (
    <>
      <AddNote />

      {/* Edit Note Modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={note.title}
                onChange={handleChange}
                placeholder="Enter title"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                value={note.description}
                onChange={handleChange}
                placeholder="Enter description"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Tags</Form.Label>
              <Form.Control
                type="text"
                name="tags"
                value={note.tags}
                onChange={handleChange}
                placeholder="Enter tags"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Cancel</Button>
          <Button variant="primary" onClick={handleSave}>Save Changes</Button>
        </Modal.Footer>
      </Modal>

      {/* Notes Display */}
      <div className="container row my-4">
        <h2>Your Notes</h2>
        {notes.length === 0 && <p>No notes available.</p>}
        {notes.map((note) => (
          <div className="col-md-3 mb-3" key={note._id}>
            <NoteItem note={note} updateNote={updateNote} />
          </div>
        ))}
      </div>
    </>
  );
};

export default Notes;
