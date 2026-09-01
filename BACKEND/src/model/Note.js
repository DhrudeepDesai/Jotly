import mongoose from "mongoose";

// phle apan schema banayenge
// then model based off on that schema

const noteSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            require: true,
        },
        content: {
            type: String,
            require: true,
        },
    },
    {timestamps: true}, // created and updated at ke liye
)

const Note = new mongoose.model("Note", noteSchema);

export default Note;