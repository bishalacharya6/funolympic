const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Note = require("../models/comment");
const { body, validationResult } = require("express-validator");
const User = require("../models/users");

//Route 1 -Fetch all notes - retriving the notes of the users.

// router.get("/fetchallcomment", fetchuser, async (req, res) => {
//   try {
//     const notes = await Note.find({ user: req.user.id });
//     res.json(notes);
//   } catch (error) {
//     //catching the unexpected error
//     console.error(error);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// });

router.get("/fetchallcomment", async (req, res) => {
  try {
    const notes = await Note.find().populate('user', 'username');
    res.json(notes);
  } catch (error) {
    //catching the unexpected error
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

//Route 2 -Adding the new notes using post - adding the notes of the users.

router.post(
  "/addcomment",
  fetchuser,
  [
    body("comment", "Enter a valid comment").isLength({ min: 1 }),
  ],
  async (req, res) => {
    try {
      const {  comment  } = req.body;

      const error = validationResult(req); // if the validation is not done then return error
      if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
      }

      const note = new Note({
        comment,
        user: req.user.id,
      });
      const savedNote = await note.save();

      res.json(savedNote);
    } catch (error) {
      //catching the unexpected erro
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
);

// Updating the note
router.put("/updatecomment/:id", fetchuser, async (req, res) => {
  try {
    const {  comment } = req.body;

    //Create the new note or updated note
    const newNote = {};

    if (comment) {
      newNote.comment = comment;
    }

    //find the note that will be updated, and then update it
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(404).send("Not Allowed");
    }

    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ note });
    
  } catch (error) {
    //catching the unexpected erro
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// deleating the note
router.delete("/deletecomment/:id", fetchuser, async (req, res) => {
  try {
    //find the note that will be deleted, and then delete it
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(404).send("Not Allowed");
    }

    note = await Note.findByIdAndDelete(req.params.id);
    res.json({ Sucess: "Comment has been deleted", note: note });

  } catch (error) {
    //catching the unexpected erro
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
