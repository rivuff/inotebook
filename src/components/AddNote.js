import React from 'react'
import { useState } from 'react';
import { useContext } from "react";
import  noteContext from "../context/notes/NoteContext";

function AddNote() {

    const context = useContext(noteContext);
    const {addNote} = context;

    const [note, setNote] = useState({title: "", description : "", tag : "default"})
    const handleClick = (e)=>{
        e.preventDefault();
        addNote(note.title,note.description,note.tag)
    }

    const onChange =(e)=>{
        setNote({...note, [e.target.name]: e.target.value})
    }

  return (
    <div>
        <div className="container">
        <h2>Add a Note</h2>
        <form action="" className='my-3'>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              placeholder="your name"
            onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="desc" className="form-label">
              Description
            </label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              rows="3"
              onChange={onChange}
            ></textarea>
          </div>

          <div className="mb-3">
            <label htmlFor="tag"  className="form-label">
              Tag
            </label>
            <input
              type="text"
              className="form-control"
              id="tag"
              name="tag"
              placeholder="tag"
            onChange={onChange}
            />
          </div>

          <div className="col-auto">
            <button type="submit" className="btn btn-primary" onClick={handleClick}>
              add Note
            </button>
          </div>
        </form>
      </div>

    </div>
  )
}

export default AddNote;