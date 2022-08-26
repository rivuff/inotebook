import React from "react";
import NoteContext from "./NoteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [
    {
      _id: "62f49595ded3cfc3234f6b73f2",
      user: "62efd4292e4f3e09f88b7152",
      title: "my nameis",
      description: "I dont want to sleep ",
      tag: "personal",
      date: "2022-08-11T05:37:25.873Z",
      __v: 0,
    },
    {
      _id: "62f531db32cf426d7685edcd32",
      user: "62efd4292e4f3e09f88b7152",
      title: "my father name is",
      description: "I dont want wake up ",
      tag: "profit",
      date: "2022-08-11T16:44:11.274Z",
      __v: 0,
    },
  ];
  const [notes, setNotes] = useState(notesInitial);

  //get al notes

  const getNotes =async (title, description, tag) => {
    //TODO API call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJlZmQ0MjkyZTRmM2UwOWY4OGI3MTUyIn0sImlhdCI6MTY2MDAyODYzMH0.ivislnGWTEmyFS_Np7jzhFnjRjHEw6TIuvyCIhWlmbI",
      },
    });

    const json = await response.json();
    console.log(json);
    setNotes(json)
  };

  
  //Add notes

  const addNote =async (title, description, tag) => {
    //TODO API call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJlZmQ0MjkyZTRmM2UwOWY4OGI3MTUyIn0sImlhdCI6MTY2MDAyODYzMH0.ivislnGWTEmyFS_Np7jzhFnjRjHEw6TIuvyCIhWlmbI",
      },
      body: JSON.stringify({title,description,tag}),
    });

    console.log("adding a note")
    //fetching notes
    console.log("adding a new note");
    const note = {
      _id: "62f5332832cf6dfasfds7425685edcd34",
      user: "62efd4292e4f3e09f88b7152",
      title: title,
      description: description,
      tag: tag,
      date: "2022-08-11T16:49:44.725Z",
      __v: 0,
    };

    setNotes(notes.concat(note));
  };

  //delete notes

  const deleteNote =async (id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJlZmQ0MjkyZTRmM2UwOWY4OGI3MTUyIn0sImlhdCI6MTY2MDAyODYzMH0.ivislnGWTEmyFS_Np7jzhFnjRjHEw6TIuvyCIhWlmbI",
      },
    });
    const json= response.json();
    console.log(json)
    console.log("deleting note with id" + id);

    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  //edit notes

  const editNote = async (id, title, description, tag) => {
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJlZmQ0MjkyZTRmM2UwOWY4OGI3MTUyIn0sImlhdCI6MTY2MDAyODYzMH0.ivislnGWTEmyFS_Np7jzhFnjRjHEw6TIuvyCIhWlmbI",
      },
      body: JSON.stringify({title,description,tag}),
    });
    const json= response.json();

    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
  };

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes}}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
