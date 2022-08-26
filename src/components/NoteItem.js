import React from "react";
import { useState } from 'react';
import { useContext } from "react";
import  noteContext from "../context/notes/NoteContext";

const NoteItem = (props) => {
  const context = useContext(noteContext);
  const { note, updateNote } = props;
  const {deleteNote} = context;

  return (
    <div className="col-md-3 ">
      <div className="card my-3">
        <div className="card-body align-items-center">
          <div className="d-flex">
            <h5 className="card-title">{note.title}</h5>

            <i className="far fa-trash-alt mx-2" onClick={()=>{deleteNote(note._id)}}></i>
            <i className="fa-regular fa-pen-to-square mx-2" onClick={()=>{updateNote(note)}}></i>
          </div>
          <p className="card-text"> {note.description} </p>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
