const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');

// get all notes using: GET "/api/auth/getuser". Login required
router.get('/fetchallnotes', fetchuser , async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// add a new note using: POST "/api/auth/addnote". Login required

router.post('/addnote',[

    body('title', 'enter a valid title').isLength({ min: 3 }),
    body('description', ' description must be atleast five characters').isLength({min: 5}),

], fetchuser , async (req, res) => {

    try {
        const {title,description, tag} = req.body;

        const error = validationResult(req);
        if(!error.isEmpty){
            return res.status(400).json({error: error.array() });
        }
    
        const note = new Note({
            title, description, tag, user: req.user.id
        })
       
        const savedNote =await note.save();
    
        res.json(savedNote)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }

})


//update an existing Note using: POST "api/auth/updatenote". log in required
router.put('/updatenote/:id', fetchuser, async (req,res)=>{
    const {title,description, tag} = req.body;

    try {
        
        //create new note object
        const newNote = {};
        if(title){newNote.title = title};
        if(description){newNote.description= description};
        if(tag){newNote.tag = tag};


        //find the note to be updated and update it
        let note = await Note.findById(req.params.id);
        if(!note) {return res.status(404).send("not found")}

        if(note.user.toString()!=req.user.id){
            return res.status(401).send("Not Allowed")
        }

        note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true})
        res.json({note})
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
   

})

//delete an existing Note using: POST "api/auth/deletenote". log in required
router.delete('/deletenote/:id', fetchuser, async (req,res)=>{
    const {title,description, tag} = req.body;

    try {
        
        //find the note to be deleted
        let note = await Note.findById(req.params.id);
        //if note not found return not found
        if(!note) {return res.status(404).send("not found")}

        //allow deletion only if note is own by that id
        if(note.user.toString()!=req.user.id){
            return res.status(401).send("Not Allowed")
        }

        note = await Note.findByIdAndDelete(req.params.id)
        res.json({"Success": "note has been deleted"})

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
    
})


module.exports = router
