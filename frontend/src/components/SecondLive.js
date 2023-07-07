import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/noteContext";
import { useNavigate, Link } from "react-router-dom";

import Sample from '../images/WomanHockey.mp4';
import ImageLive from "../images/live-logo.png"
import FemaleHockey from "../images/Thumbnail.jpg"
import Thumbnail from '../images/Thumbnail.jpg';
import "../styles/live.scss";
import "../styles/all-live.scss";

const SecondLive = () => {


    //Submit Button Logic
    const [buttonText, setButtonText] = useState("Submit");
    const updateButton = () => {
      setButtonText("Thanks");
      setTimeout(() => {
        setButtonText("Submit");
      }, 2000);
    };
  
  
    let navigate = useNavigate();
    const context = useContext(noteContext);
    const { notes, getAllNotes, editNote, addNote, deleteNote } = context;
  
  
  
    useEffect(() => {
      if (localStorage.getItem('token')) {
        getAllNotes();
      }
      else {
        navigate('/loginrequest')
      }
      // eslint-disable-next-line
    }, []);
  
  
    // useEffect(() => {
    //   getAllNotes();
    //   //eslint-disable-next-line
    // }, []);
  
  
    //Editing Note
    const ref = useRef(null);
    const refClose = useRef(null);
  
    const [upNote, setupNote] = useState({
      id: "",
      ecomment: ""
    });
  
    const updateNote = (currentNote) => {
      ref.current.click();
      setupNote({
        id: currentNote._id,
        ecomment: currentNote.comment,
      });
    };
  
    const handleClick = (e) => {
      editNote(upNote.id, upNote.ecomment);
      refClose.current.click();
      // props.showAlert("Note Updated Successfully", "success");
    };
  
    const onChangee = (e) => {
      setupNote({ ...upNote, [e.target.name]: e.target.value });
    };
  
  
  
  
    //Adding Note
    const [note, setNote] = useState({ comment: "" })
  
    const handleSubmitClick = async () => {
      await addNote(note.comment);
      setNote({ comment: "" })
      window.location.reload(false);
  
      alert("Comment Added Successfully", "success");
  
    }
  
    const handleSubmitButtonClick = async (e) => {
      e.preventDefault();
      await handleSubmitClick();
      updateButton();
    };
  
    const onChange = (e) => {
      setNote({ ...note, [e.target.name]: e.target.value })
    }
  
  
  
  
    return (
      <>
  
        {/* Live Video Work done here */}
        <div className="  m-3 p-3">
          <h1 className='text-center  fw-bold'>Live Game</h1>
          <section>
            <div className='video-section'>
              <div className="sample-video d-flex justify-content-start">
                <div className="video-content">
                  <video src={Sample} id='playingvideo' autoPlay controls controlsList="nodownload noplaybackrate">
                  </video>
                  <img src={ImageLive} className="live-logo" alt="" />
                </div>
                <div className="mx-3 about-video">
                  <h4>🔴 Netherlands 🇳🇱 vs Argentina 🇦🇷 | Women's Hockey 🏑 🥇 Gold Medal Matc</h4>
                  <p>The Netherlands with their fourth Olympic women's hockey  yet to beat Argentina in the final at the  FunOlympic Games 2023. The Dutch affirmed themselves as hockey powerhouses, winning a record fourth Olympic title. 

                  </p>
                </div>
              </div>
            </div>
  
  
  
            {/* Modal for updating/editing the comment done here */}
  
            <button
              type="button"
              ref={ref}
              className="btn btn-primary d-none"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              Launch demo modal
            </button>
  
            <div
              className="modal fade"
              id="exampleModal"
              tabIndex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">
                      Edit Comment
                    </h1>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <div className="mb-3">
                      <label htmlFor="comment" className="form-label">
                        Comment
                      </label>
                      <input type="text" className="form-control" id="ecomment" name="ecomment" onChange={onChangee} minLength={1} required value={upNote.ecomment}
                      />
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      ref={refClose}
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                    <button
                      onClick={handleClick}
                      type="button"
                      className="btn btn-primary"
                      disabled={upNote.ecomment.length < 1}
  
                    >
                      Update Note
                    </button>
                  </div>
                </div>
              </div>
            </div>
  
  
  
            {/* Comment Section Work Done Here, getallcmt, delete and addcmmt */}
            <div className=' comment-section'>
              <div className="">
                <h3>Live Comment</h3>
                <textarea name="comment" id="comment" cols="50" rows="4" onChange={onChange} minLength={5} value={note.comment}></textarea>
              </div>
              <button id='submit' type='submit' disabled={note.comment.length < 1} onClick={handleSubmitButtonClick} >{buttonText}</button>
              <h4><br /><b>Comments</b></h4>
  
              <div className="comment-body">
  
  
                {notes.map((note) => {
  
                  return (
  
                    <div className="card mt-3 pt-3" key={note._id} note={note}>
                      <div className="card-body">
                        <div className='d-flex justify-content-between'>
                          <h5 className="card-title" >{note.user.username}</h5>
                          <div>
                            <i className="fa-sharp fa-solid fa-trash m-1 px-2" onClick={() => { deleteNote(note._id) }}></i>
                            <i className="fa-solid fa-file-pen m-1" onClick={() => { updateNote(note) }}></i>
                          </div>
                        </div>
                        <div className="description">
                          {note.comment}
                        </div>
                      </div>
                    </div>
  
                  );
                })}
              </div>
  
            </div >
          </section >
  
         
  
        </div >
      </>
    )
  }

export default SecondLive
