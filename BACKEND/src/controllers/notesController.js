import Note from "../model/Note.js";

const protectedNoteIds = [
    "6a9653c700466f9abd2a30b2",
    "6a96d48e73c0b980c2525e14",
    "6a96d31648b3a7c73645b7f5",
];
const isProtectedNote = (id) => protectedNoteIds.includes(id.toString());

//get
export async function getAllNotes(_, res){
    // res.status(200).send("You just fetched your notes");
    try {
        const notes = await Note.find().sort({createdAt: -1});// sort by who created latest
        res.status(200).json(notes);
    } catch (error) {
        console.error("Error in getAllNotes controller", error);
        res.status(500).json({message: "Internal Server Error"});
    }
};

//get by id
export async function getNoteById(req, res){
    try {
        const note = await Note.findById(req.params.id);
        if(!note) return res.status(404).json({message: "Note not found"});
        res.status(200).json(note);
    } catch (error) {
        console.error("Error in getNotebyId controller", error);
        res.status(500).json({message: "Internal Server Error"});
    }
};


//post
export async function createNote(req, res){
    // res.status(201).send("Note created successfully");
    try {
        const {title, content} = req.body;
        const note = new Note({title, content});

        const savedNote = await note.save();
        res.status(201).json(savedNote);
    } catch (error) {
        console.error("Error in createNote controller", error);
        res.status(500).json({message: "Internal Server Error"});
    }
};

//put
export async function updateNote(req, res){
    // res.status(200).send("Note updated successfully");

    try {

        // Not to delete welcome notes
        if (isProtectedNote(req.params.id)) {
          console.log("This note can only be updated by admin:", req.params.id);
          return res.status(403).json({
            message: "This note cannot be updated."
          });
        }

        const {title, content} = req.body;
        const updatedNote = await Note.findByIdAndUpdate(req.params.id, {title, content}, {new: true});

        //galat id se request aayi then
        if(!updatedNote) return res.status(404).json({message: "Note not found"});

        res.status(200).json(updatedNote);
    } catch (error) {
        console.error("Error in updateNote controller", error);
        res.status(500).json({message: "Internal Server Error"});
    }
};

//delete
export async function deleteNote(req, res){
   //res.status(200).send("Note deleted successfully");
   try {

        // Not to delete welcome notes
        if (isProtectedNote(req.params.id)) {
          console.log("This note can only be deleted by admin:", req.params.id);
          return res.status(403).json({
            message: "This note cannot be deleted."
          });
        }

        const deletedNote = await Note.findByIdAndDelete(req.params.id);

        //galat id se request aayi then
        if(!deletedNote) return res.status(404).json({message: "Note not found"});

        res.status(200).json({message: "Note deleted successfully"});
    } catch (error) {
        console.error("Error in deleteNote controller", error);
        res.status(500).json({message: "Internal Server Error"});
    }
};