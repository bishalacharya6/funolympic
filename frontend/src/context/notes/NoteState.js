import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];

  const [notes, setNotes] = useState(notesInitial);

  //Fetching all Notes
  const getAllNotes = async () => {
    const response = await fetch(`${host}/api/comment/fetchallcomment`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    const json = await response.json();
    setNotes(json);
  };

  //Adding a note comment section add a cpmmet secgtion in the commnent sectin f the cty pf the yplyom 

  const addNote = async (comment) => {

    //API caling for Add note
    const response = await fetch(`${host}/api/comment/addcomment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ comment }),
    });

    const note = await response.json();
    setNotes(notes.concat(note));
  };



  //Delete a Note

  //Logic to Delete
  const deleteNote = async (id) => {

          //API calling for note
  const response = await fetch(`${host}/api/comment/deletecomment/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "auth-token": localStorage.getItem('token')
    },
  });


  const json = await response.json();
    console.log(json);

    //API Calling remaining
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };



  //Editing the  note
  const editNote = async (id, comment) => {
    //API calling is done here
    const response = await fetch(`${host}/api/comment/updatecomment/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ comment }),
    });

    const json = await response.json();
    console.log(json);

    //Logic to edit
    let newNotes = JSON.parse(JSON.stringify(notes))
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].comment = comment;
        break;
      }
      setNotes(newNotes)
    }
  };

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getAllNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
